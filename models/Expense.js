// import mongoose from "mongoose";

// // Expense ka structure define kar rahe hain
// const expenseSchema = new mongoose.Schema(
//   {
//     // Expense kis cheez ke liye hua
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     // Expense ki category
//     category: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     // Kitna paisa kharch hua
//     amount: {
//       type: Number,
//       required: true,
//       min: 0,
//     },

//     // Expense ki date
//     date: {
//       type: Date,
//       required: true,
//       default: Date.now,
//     },

//     // Extra details, agar user dena chahe
//     description: {
//       type: String,
//       default: "",
//       trim: true,
//     },
//   },
//   {
//     // Record create aur update hone ka time automatically save hoga
//     timestamps: true,
//   }
// );

// // Model pehle se bana ho to usi ko reuse karo
// const Expense =
//   mongoose.models.Expense ||
//   mongoose.model("Expense", expenseSchema);

// export default Expense;

import mongoose from "mongoose";

// Expense ka data MongoDB mein kis format mein save hoga
const expenseSchema = new mongoose.Schema(
  {
    // Expense ka title, jaise Office Rent ya Electricity Bill
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Expense ki category
    category: {
      type: String,
      required: true,
      trim: true,
    },

    // Kharch ki gayi amount
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    // Expense ki date
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    // Optional description
    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    // Created aur updated time automatically save hoga
    timestamps: true,
  }
);

// Existing model ko reuse karna, taaki duplicate model error na aaye
const Expense =
  mongoose.models.Expense ||
  mongoose.model("Expense", expenseSchema);

export default Expense;