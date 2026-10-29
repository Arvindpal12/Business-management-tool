
import mongoose from "mongoose";

// Customer schema customer ki details define karta hai.
// Isse MongoDB mein sabhi customers ka data ek consistent format mein save hoga.
const customerSchema = new mongoose.Schema(
  {
    // Customer ka naam required hai.
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },

    // Phone number ko String rakha hai, taaki starting mein 0 ho to bhi save rahe.
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
    // Har customer ke saath createdAt aur updatedAt automatically save honge.
    timestamps: true,
  }
);

// Next.js development mein model dobara compile hone se bachane ke liye
// existing model ko reuse karte hain.
const Customer =
  mongoose.models.Customer ||
  mongoose.model("Customer", customerSchema);

export default Customer;
