
import mongoose from "mongoose";

// User schema batata hai ki har account ka data MongoDB mein
// kis structure mein save hoga.
const userSchema = new mongoose.Schema(
  {
    // User ka display name
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    // Email ko unique rakhenge taaki duplicate account na bane.
    // lowercase se email comparison consistent rahega.
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },

    // Yahan password ka hashed version save hoga,
    // original password kabhi save nahi karenge.
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
  },
  {
    // Account create aur update hone ka time automatically save hoga.
    timestamps: true,
  }
);

// Next.js development mein model dobara compile hone se bachane ke liye
// pehle se registered model ko reuse karenge.
const User =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;
