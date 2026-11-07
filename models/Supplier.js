import mongoose from "mongoose";

// Supplier ka schema define kar rahe hain.
const supplierSchema = new mongoose.Schema(
  {
    // Supplier kis user ke business se belong karta hai.
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Supplier ya company ka naam
    name: {
      type: String,
      required: [true, "Supplier name is required"],
      trim: true,
    },

    // Supplier code, jaise SUP001
    supplierCode: {
      type: String,
      required: [true, "Supplier code is required"],
      trim: true,
    },

    // Supplier ka phone number
    phone: {
      type: String,
      trim: true,
      default: "",
    },

    // Supplier ka email
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    // Supplier ka business address
    address: {
      type: String,
      trim: true,
      default: "",
    },

    // Supplier active hai ya nahi
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

// Har user ke andar supplierCode unique rahega.
supplierSchema.index(
  { userId: 1, supplierCode: 1 },
  { unique: true }
);

// Next.js hot reload mein existing model reuse karte hain.
const Supplier =
  mongoose.models.Supplier ||
  mongoose.model("Supplier", supplierSchema);

export default Supplier;  