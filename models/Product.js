
import mongoose from "mongoose";

// Product ka schema define karta hai ki MongoDB mein
// har product ke andar kaun-kaun se fields honge.
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name zaroori hai"],
      trim: true,
    },
    sku: {
      type: String,
      required: [true, "SKU zaroori hai"],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      default: "Uncategorized",
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    // Product kab create aur update hua, uska time save hoga.
    timestamps: true,
  }
);

// Next.js development reload mein model dobara register
// hone se bachane ke liye existing model reuse karte hain.
const Product =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);

export default Product;
