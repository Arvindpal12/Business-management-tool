import mongoose from "mongoose";

// Expense ka data MongoDB mein kis format mein save hoga.
const expenseSchema = new mongoose.Schema(
  {
    // Expense kis user ke business se belong karta hai.
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Expense ka title, jaise Office Rent ya Electricity Bill.
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Expense ki category.
    category: {
      type: String,
      required: true,
      trim: true,
    },

    // Kharch ki gayi amount.
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    // Expense ki date.
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    // Optional description.
    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    // Created aur updated time automatically save hoga.
    timestamps: true,
  }
);

// Existing model ko reuse karna.
const Expense =
  mongoose.models.Expense ||
  mongoose.model("Expense", expenseSchema);

export default Expense;