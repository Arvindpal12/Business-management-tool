
import mongoose from "mongoose";

// Supplier ka schema define kar rahe hain.
// Isse MongoDB mein har supplier ka data ek fixed format mein save hoga.
const supplierSchema = new mongoose.Schema(
  {
    // Supplier ya company ka naam
    name: {
      type: String,
      required: [true, "Supplier name is required"],
      trim: true,
    },

    // Supplier ka unique code, jaise SUP001
    supplierCode: {
      type: String,
      required: [true, "Supplier code is required"],
      unique: true,
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

    // Supplier ke saath business active hai ya nahi
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    // Record create aur update hone ka time automatically save hoga
    timestamps: true,
  }
);

// Next.js hot reload ke waqt model dobara register hone se bachate hain.
const Supplier =
  mongoose.models.Supplier ||
  mongoose.model("Supplier", supplierSchema);

export default Supplier;
