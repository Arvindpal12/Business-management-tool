import mongoose from "mongoose";

// Customer schema customer ki details define karta hai.
const customerSchema = new mongoose.Schema(
  {
    // Customer kis user ke business se belong karta hai.
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Customer ka naam required hai.
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },

    // Phone number String rakha hai, taaki starting mein 0 save rahe.
    phone: {
      type: String,
      trim: true,
      default: "",
    },

    // Email optional hai.
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    // Customer ka address optional hai.
    address: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    // Customer create aur update hone ka time automatically save hoga.
    timestamps: true,
  }
);

// Next.js development mein existing model reuse karte hain.
const Customer =
  mongoose.models.Customer ||
  mongoose.model("Customer", customerSchema);

export default Customer;