import mongoose from "mongoose";

export const CATEGORIES = ["gadgets", "clothing"];
export const AUDIENCES = ["men", "women", "kids", "unisex"];

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: "", maxlength: 4000 },
    // Prices are whole Naira.
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    category: { type: String, required: true, enum: CATEGORIES },
    audience: { type: String, enum: AUDIENCES, default: "unisex" },
    subcategory: { type: String, trim: true, lowercase: true, maxlength: 60 },
    images: { type: [String], default: [] },
    stock: { type: Number, default: 0, min: 0 },
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    tags: { type: [String], default: [] },
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

productSchema.index({ name: "text", description: "text", tags: "text" });
productSchema.index({ category: 1, audience: 1, isActive: 1 });

export const Product = mongoose.models.Product ?? mongoose.model("Product", productSchema);
