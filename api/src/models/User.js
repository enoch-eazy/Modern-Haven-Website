import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const ROLES = ["customer", "admin"];

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 60 },
    lastName: { type: String, required: true, trim: true, maxlength: 60 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phoneNumber: { type: String, trim: true, maxlength: 20 },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ROLES, default: "customer" },
    // Defaults to true so accounts created before email verification existed (and admins made
    // with `npm run create-admin`) keep working. Self-service sign-ups set it to false explicitly.
    emailVerified: { type: Boolean, default: true },
    // Tokens issued before this moment are rejected, so a password reset signs out other devices.
    passwordChangedAt: { type: Date, select: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        delete ret._id;
        delete ret.__v;
        delete ret.passwordHash;
        delete ret.passwordChangedAt;
        return ret;
      },
    },
  },
);

userSchema.methods.setPassword = async function setPassword(password) {
  this.passwordHash = await bcrypt.hash(password, 10);
};

userSchema.methods.checkPassword = function checkPassword(password) {
  return bcrypt.compare(password, this.passwordHash);
};

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);
