import mongoose from "mongoose";

// Report ka data MongoDB mein kis format mein save hoga
// Abhi report API existing Sales, Purchases aur Expenses se report banayegi.
// Ye model future mein generated reports ko save karne ke kaam aa sakta hai.
const reportSchema = new mongoose.Schema(
  {
    // Report ka naam, jaise Monthly Sales Report
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Report kis type ki hai
    type: {
      type: String,
      required: true,
      enum: ["Sales", "Purchases", "Expenses", "Summary"],
      default: "Summary",
    },

    // Report ki starting date
    startDate: {
      type: Date,
      required: true,
    },

    // Report ki ending date
    endDate: {
      type: Date,
      required: true,
    },

    // Report generate karne wale user ka ID
    // Authentication add hone par yahan user ID store kar sakte hain
    createdBy: {
      type: String,
      default: "",
    },
  },
  {
    // Created aur updated time automatically save hoga
    timestamps: true,
  }
);

// Existing model ko reuse karna, taaki duplicate model error na aaye
const Report =
  mongoose.models.Report ||
  mongoose.model("Report", reportSchema);

export default Report;