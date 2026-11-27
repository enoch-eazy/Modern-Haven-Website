import crypto from "node:crypto";
import { env } from "../config/env.js";
import { OneTimeCode } from "../models/OneTimeCode.js";
import { badRequest, tooManyRequests } from "../utils/httpError.js";

export const OTP_LENGTH = 6;
export const OTP_TTL_MINUTES = 10;
export const OTP_MAX_ATTEMPTS = 5;
export const OTP_RESEND_COOLDOWN_SECONDS = 60;

function hashCode(userId, purpose, code) {
  return crypto.createHmac("sha256", env.jwtSecret).update(`${userId}:${purpose}:${code}`).digest("hex");
}

/**
 * Creates (or replaces) the user's code for `purpose` and returns the plain code so it can be emailed.
 * Throws 429 if a code was sent less than OTP_RESEND_COOLDOWN_SECONDS ago.
 */
export async function issueCode(user, purpose) {
  const existing = await OneTimeCode.findOne({ user: user._id, purpose });
  if (existing) {
    const waitMs = existing.issuedAt.getTime() + OTP_RESEND_COOLDOWN_SECONDS * 1000 - Date.now();
    if (waitMs > 0) {
      const seconds = Math.ceil(waitMs / 1000);
      throw tooManyRequests(`Please wait ${seconds}s before requesting another code`, "OTP_COOLDOWN");
    }
  }

  const code = crypto.randomInt(0, 10 ** OTP_LENGTH).toString().padStart(OTP_LENGTH, "0");
  const now = new Date();
  await OneTimeCode.findOneAndUpdate(
    { user: user._id, purpose },
    {
      codeHash: hashCode(user.id, purpose, code),
      attempts: 0,
      issuedAt: now,
      expiresAt: new Date(now.getTime() + OTP_TTL_MINUTES * 60 * 1000),
    },
    { upsert: true, setDefaultsOnInsert: true },
  );
  return code;
}

/** Removes a code, e.g. when sending the email for it failed. */
export function discardCode(user, purpose) {
  return OneTimeCode.deleteOne({ user: user._id, purpose });
}

const invalidCode = () =>
  badRequest("That code is incorrect", { code: ["That code is incorrect"] }, "OTP_INVALID");

/**
 * Checks `code` and deletes it on success. Every guess counts towards OTP_MAX_ATTEMPTS, and the
 * attempt counter is bumped atomically so parallel guesses can't exceed the limit.
 * Pass `user = null` (unknown email) to get the same error a wrong code would give.
 */
export async function consumeCode(user, purpose, code) {
  if (!user) throw invalidCode();

  const record = await OneTimeCode.findOneAndUpdate(
    { user: user._id, purpose, attempts: { $lt: OTP_MAX_ATTEMPTS }, expiresAt: { $gt: new Date() } },
    { $inc: { attempts: 1 } },
    { new: true },
  );
  if (!record) {
    const stale = await OneTimeCode.exists({ user: user._id, purpose });
    if (stale) await discardCode(user, purpose);
    throw badRequest(
      stale ? "Too many attempts or the code has expired. Request a new code." : "That code has expired. Request a new code.",
      { code: ["Request a new code"] },
      "OTP_EXPIRED",
    );
  }

  const expected = Buffer.from(record.codeHash, "hex");
  const actual = Buffer.from(hashCode(user.id, purpose, code), "hex");
  if (!crypto.timingSafeEqual(expected, actual)) throw invalidCode();

  await OneTimeCode.deleteOne({ _id: record._id });
}
