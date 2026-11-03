// import { NextResponse } from "next/server";
// import connectDB from "../../../lib/mongodb.js";
// import Expense from "../../../models/Expense.js";

// // GET: MongoDB se saare expenses load karna
// export async function GET() {
//   try {
//     await connectDB();

//     const expenses = await Expense.find().sort({ date: -1 });

//     return NextResponse.json({
//       success: true,
//       expenses,
//     });
//   } catch (error) {
//     console.error("Expenses GET error:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Expenses load nahi ho paye.",
//       },
//       { status: 500 }
//     );
//   }
// }

// // POST: Naya expense MongoDB mein save karna
// export async function POST(request) {
//   try {
//     await connectDB();

//     const body = await request.json();

//     const expense = await Expense.create({
//       title: body.title,
//       category: body.category,
//       amount: body.amount,
//       date: body.date || new Date(),
//       description: body.description || "",
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Expense successfully added!",
//         expense,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Expenses POST error:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: error.message || "Expense save nahi hua.",
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb.js";
import Expense from "../../../models/Expense.js";

// GET: MongoDB se saare expenses load karna
export async function GET() {
  try {
    await connectDB();

    const expenses = await Expense.find().sort({ date: -1 });

    return NextResponse.json({
      success: true,
      expenses,
    });
  } catch (error) {
    console.error("Expenses GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Expenses load nahi ho paye.",
      },
      { status: 500 }
    );
  }
}

// POST: Naya expense MongoDB mein save karna
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const expense = await Expense.create({
      title: body.title,
      category: body.category,
      amount: body.amount,
      date: body.date || new Date(),
      description: body.description || "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Expense successfully added!",
        expense,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Expenses POST error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Expense save nahi hua.",
      },
      { status: 500 }
    );
  }
}