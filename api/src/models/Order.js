import mongoose from "mongoose";

export const ORDER_STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
export const PAYMENT_STATUSES = ["unpaid", "paid", "refunded"];

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    // Name, price and image are copied at order time so history survives product edits.
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    items: { type: [orderItemSchema], validate: (items) => items.length > 0 },
    delivery: {
      address: { type: String, required: true, trim: true },
      landmark: { type: String, required: true, trim: true },
      phoneNumber: { type: String, required: true, trim: true },
      fee: { type: Number, required: true, min: 0 },
    },
    subtotal: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ORDER_STATUSES, default: "pending", index: true },
    paymentStatus: { type: String, enum: PAYMENT_STATUSES, default: "unpaid" },
    notes: { type: String, maxlength: 500 },
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

export const Order = mongoose.models.Order ?? mongoose.model("Order", orderSchema);
