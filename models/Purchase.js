import mongoose from "mongoose";

// Purchase schema batata hai ki har purchase ki entry mein
// kaun-kaun si details MongoDB mein save hongi.
const purchaseSchema = new mongoose.Schema(
  {
    // Purchase kis user ne create ki hai, uski ID save hogi.
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Kis product ka stock khareeda gaya, uski ID.
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    // Product ka naam purchase history mein save hoga.
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    // Kitni quantity purchase hui.
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    // Ek unit khareedne ki cost.
    purchasePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // Total purchase cost = quantity × purchasePrice.
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    // Supplier ka naam optional rakha hai.
    supplier: {
      type: String,
      default: "",
      trim: true,
    },

    // Purchase ke baare mein extra details optional hain.
    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    // Har purchase ke saath createdAt aur updatedAt save honge.
    timestamps: true,
  }
);

// Next.js reload mein pehle se bana model reuse karte hain.
const Purchase =
  mongoose.models.Purchase ||
  mongoose.model("Purchase", purchaseSchema);

export default Purchase;