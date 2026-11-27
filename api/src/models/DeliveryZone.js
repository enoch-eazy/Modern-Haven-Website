import mongoose from "mongoose";

const deliveryZoneSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true, maxlength: 80 },
    // Delivery fee in whole Naira.
    fee: { type: Number, required: true, min: 0 },
    isActive: { type: Boolean, default: true },
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

export const DeliveryZone =
  mongoose.models.DeliveryZone ?? mongoose.model("DeliveryZone", deliveryZoneSchema);
