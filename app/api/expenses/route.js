
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

import connectDB from "../../../lib/mongodb.js";
import Expense from "../../../models/Expense.js";

// JWT secret se login token verify hoga.
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// Logged-in user ki ID nikalne ke liye helper function.
async function getLoggedInUserId() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("bizpilot_token")?.value;

    if (!token) return null;

    const { payload } = await jwtVerify(token, secret);

    return payload.userId || null;
  } catch (error) {
    return null;
  }
}

// GET: Sirf current user ke expenses load honge.
export async function GET() {
  try {
    await connectDB();

    const userId = await getLoggedInUserId();

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json(
        { success: false, message: "Please login first." },
        { status: 401 }
      );
    }

    // Database se sirf logged-in user ke expenses fetch honge.
    const expenses = await Expense.find({ userId })
      .sort({ date: -1 })
      .lean();

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

// POST: Naya expense current user ke account mein save hoga.
export async function POST(request) {
  try {
    await connectDB();

    const userId = await getLoggedInUserId();

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json(
        { success: false, message: "Please login first." },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Expense ke saath current user ki ID bhi save hogi.
    const expense = await Expense.create({
      userId,
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
