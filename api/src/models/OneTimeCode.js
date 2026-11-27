import mongoose from "mongoose";

export const OTP_PURPOSES = ["verify-email", "reset-password"];

/** A short-lived 6-digit code emailed to a user. Only a hash of the code is stored. */
const oneTimeCodeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    purpose: { type: String, enum: OTP_PURPOSES, required: true },
    codeHash: { type: String, required: true },
    attempts: { type: Number, default: 0 },
    // When the code was last (re)sent; drives the resend cooldown.
    issuedAt: { type: Date, required: true },
    // MongoDB deletes the document shortly after this time.
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
);

// At most one live code per user and purpose.
oneTimeCodeSchema.index({ user: 1, purpose: 1 }, { unique: true });

export const OneTimeCode =
  mongoose.models.OneTimeCode ?? mongoose.model("OneTimeCode", oneTimeCodeSchema);
