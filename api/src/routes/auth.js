import { Router } from "express";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import { z } from "zod";
import { isTest } from "../config/env.js";
import { requireAuth, signToken } from "../middleware/auth.js";
import { User } from "../models/User.js";
import { sendOtpEmail } from "../services/mailer.js";
import { OTP_LENGTH, consumeCode, discardCode, issueCode } from "../services/otp.js";
import { HttpError, badRequest, conflict, forbidden, unauthorized } from "../utils/httpError.js";
import { parse } from "../utils/validate.js";

const router = Router();

const limiterDefaults = {
  windowMs: 15 * 60 * 1000,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  skip: () => isTest,
  message: { error: "Too many attempts, please try again in a few minutes" },
};

// Endpoints that send email: limited per client IP.
const emailLimiter = rateLimit({ ...limiterDefaults, limit: 10 });

// Endpoints where a password or code can be guessed: limited per account (and IP). Logins arrive
// via the storefront's server, so an IP-only limit would throttle every customer at once.
const guessLimiter = rateLimit({
  ...limiterDefaults,
  limit: 10,
  keyGenerator: (req) => `${String(req.body?.email ?? "").trim().toLowerCase()}|${ipKeyGenerator(req.ip ?? "")}`,
});

const email = z.string().trim().toLowerCase().email("Enter a valid email address");
const password = z.string().min(8, "Password must be at least 8 characters").max(128);
const code = z
  .string()
  .trim()
  .regex(new RegExp(`^\\d{${OTP_LENGTH}}$`), `Enter the ${OTP_LENGTH}-digit code`);

const registerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(60),
  lastName: z.string().trim().min(1, "Last name is required").max(60),
  email,
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\+?[0-9]{7,15}$/, "Enter a valid phone number")
    .optional(),
  password,
});
const loginSchema = z.object({ email, password: z.string().min(1, "Password is required") });
const emailSchema = z.object({ email });
const verifySchema = z.object({ email, code });
const resetSchema = z.object({ email, code, password });

/** Issues a code and emails it. If the email can't be sent the code is discarded. */
async function sendCode(user, purpose) {
  const otp = await issueCode(user, purpose);
  try {
    await sendOtpEmail(user, purpose, otp);
  } catch (error) {
    await discardCode(user, purpose);
    throw error;
  }
}

const isCooldown = (error) => error instanceof HttpError && error.code === "OTP_COOLDOWN";

router.post("/register", emailLimiter, async (req, res) => {
  const data = parse(registerSchema, req.body);
  let user = await User.findOne({ email: data.email });
  if (user?.emailVerified) throw conflict("An account with that email already exists");

  // An unverified account can be registered again, e.g. if the first attempt used a typo'd
  // password or the email never arrived. It still can't be used until the code is entered.
  user ??= new User({ email: data.email });
  user.set({
    firstName: data.firstName,
    lastName: data.lastName,
    phoneNumber: data.phoneNumber,
    emailVerified: false, // `role` is never taken from the request: admins use `npm run create-admin`.
  });
  await user.setPassword(data.password);
  await user.save();

  try {
    await sendCode(user, "verify-email");
  } catch (error) {
    // A code was sent moments ago and is still valid, so there's nothing more to do.
    if (!isCooldown(error)) throw error;
  }
  res.status(201).json({ email: user.email, verificationRequired: true });
});

router.post("/verify-email", guessLimiter, async (req, res) => {
  const data = parse(verifySchema, req.body);
  const user = await User.findOne({ email: data.email });
  if (user?.emailVerified) {
    throw badRequest("This email is already verified. Please log in.", undefined, "ALREADY_VERIFIED");
  }
  await consumeCode(user, "verify-email", data.code);
  user.emailVerified = true;
  await user.save();
  res.json({ user, token: signToken(user) });
});

router.post("/resend-verification", emailLimiter, async (req, res) => {
  const data = parse(emailSchema, req.body);
  const user = await User.findOne({ email: data.email });
  if (user && !user.emailVerified) await sendCode(user, "verify-email");
  res.json({ message: "If that account still needs verifying, we've sent a new code." });
});

router.post("/login", guessLimiter, async (req, res) => {
  const data = parse(loginSchema, req.body);
  const user = await User.findOne({ email: data.email }).select("+passwordHash");
  if (!user || !(await user.checkPassword(data.password))) {
    throw unauthorized("Incorrect email or password");
  }
  // Checked after the password so this can't be used to probe which emails are unverified.
  if (!user.emailVerified) {
    throw forbidden("Please verify your email address before logging in.", "EMAIL_NOT_VERIFIED");
  }
  res.json({ user, token: signToken(user) });
});

router.post("/forgot-password", emailLimiter, async (req, res) => {
  const data = parse(emailSchema, req.body);
  const user = await User.findOne({ email: data.email });
  if (user) {
    try {
      await sendCode(user, "reset-password");
    } catch (error) {
      if (!isCooldown(error)) throw error;
    }
  }
  // Same answer whether or not the account exists.
  res.json({ message: "If an account exists for that email, we've sent a reset code." });
});

router.post("/reset-password", guessLimiter, async (req, res) => {
  const data = parse(resetSchema, req.body);
  const user = await User.findOne({ email: data.email });
  await consumeCode(user, "reset-password", data.code);

  await user.setPassword(data.password);
  user.passwordChangedAt = new Date();
  // Receiving the code proves they own the inbox.
  user.emailVerified = true;
  await user.save();
  res.json({ message: "Your password has been reset. You can now log in." });
});

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

export default router;
