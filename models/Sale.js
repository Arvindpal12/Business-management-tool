
import mongoose from "mongoose";

// Har sale mein product, quantity aur selling price save honge.
const saleSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    // Sale kab record hui, uska timestamp automatically save hoga.
    timestamps: true,
  }
);

// Next.js reload mein model dobara register hone se bachao.
const Sale =
  mongoose.models.Sale || mongoose.model("Sale", saleSchema);

export default Sale;
