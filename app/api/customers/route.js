
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

import connectDB from "../../../lib/mongodb.js";
import Customer from "../../../models/Customer.js";

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

// GET: Sirf current user ke customers fetch honge.
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

    const customers = await Customer.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      customers: customers.map((customer) => ({
        ...customer,
        id: String(customer._id),
        _id: String(customer._id),
      })),
    });

  } catch (error) {
    console.error("Customers GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Customers load nahi ho sake.",
      },
      { status: 500 }
    );
  }
}

// POST: Naya customer current user ke account mein save hoga.
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

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const address =
      typeof body.address === "string" ? body.address.trim() : "";

    // Customer ka naam dena zaroori hai.
    if (!name) {
      return NextResponse.json(
        { success: false, message: "Customer name required hai." },
        { status: 400 }
      );
    }

    // Customer ke saath current user ki ID bhi save hogi.
    const customer = await Customer.create({
      userId,
      name,
      phone,
      email,
      address,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Customer successfully add ho gaya.",
        customer: {
          ...customer.toObject(),
          id: String(customer._id),
          _id: String(customer._id),
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Customers POST error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Customer save nahi ho saka.",
      },
      { status: 500 }
    );
  }
}
