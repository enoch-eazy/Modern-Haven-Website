import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true },
    phoneNumber: { type: String, trim: true, maxlength: 20 },
    subject: { type: String, trim: true, maxlength: 200 },
    message: { type: String, required: true, maxlength: 4000 },
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

export const ContactMessage =
  mongoose.models.ContactMessage ?? mongoose.model("ContactMessage", contactMessageSchema);
