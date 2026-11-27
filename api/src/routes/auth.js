import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { isTest } from "../config/env.js";
import { requireAuth, signToken } from "../middleware/auth.js";
import { User } from "../models/User.js";
import { conflict, unauthorized } from "../utils/httpError.js";
import { parse } from "../utils/validate.js";

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  skip: () => isTest,
  message: { error: "Too many attempts, please try again in a few minutes" },
});

const registerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(60),
  lastName: z.string().trim().min(1, "Last name is required").max(60),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\+?[0-9]{7,15}$/, "Enter a valid phone number")
    .optional(),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
});

router.post("/register", authLimiter, async (req, res) => {
  const data = parse(registerSchema, req.body);
  if (await User.exists({ email: data.email })) {
    throw conflict("An account with that email already exists");
  }
  // `role` is never taken from the request: admins are created with `npm run create-admin`.
  const user = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phoneNumber: data.phoneNumber,
  });
  await user.setPassword(data.password);
  await user.save();
  res.status(201).json({ user, token: signToken(user) });
});

router.post("/login", authLimiter, async (req, res) => {
  const { email, password } = parse(loginSchema, req.body);
  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user || !(await user.checkPassword(password))) {
    throw unauthorized("Incorrect email or password");
  }
  res.json({ user, token: signToken(user) });
});

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

export default router;
