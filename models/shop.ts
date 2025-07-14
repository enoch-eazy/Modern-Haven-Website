import mongoose, { Schema } from "mongoose";

const ShopSchema = new Schema(
    {
        title: String, 
        description: String,
        price: String,
    },
    {
        timestamps: true,
    }
);

const Shop = mongoose.models.Shop || mongoose.model("Shop", ShopSchema);
export default Shop;