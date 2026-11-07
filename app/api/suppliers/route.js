
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

import connectDB from "../../../lib/mongodb.js";
import Supplier from "../../../models/Supplier.js";

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
    console.error("Supplier auth error:", error);
    return null;
  }
}

// GET: Sirf logged-in user ke suppliers fetch honge.
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

    const suppliers = await Supplier.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      suppliers,
    });
  } catch (error) {
    console.error("GET suppliers error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Suppliers fetch karne mein error aaya",
      },
      { status: 500 }
    );
  }
}

// POST: Naya supplier current user ke account mein save hoga.
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

    const name =
      typeof body.name === "string" ? body.name.trim() : "";

    const supplierCode =
      typeof body.supplierCode === "string"
        ? body.supplierCode.trim()
        : "";

    const phone = body.phone || "";
    const email = body.email || "";
    const address = body.address || "";
    const status = body.status;

    // Required fields validate karna.
    if (!name || !supplierCode) {
      return NextResponse.json(
        {
          success: false,
          message: "Supplier name aur supplier code required hain",
        },
        { status: 400 }
      );
    }

    // Duplicate supplier code sirf isi user ke account mein check hoga.
    const existingSupplier = await Supplier.findOne({
      userId,
      supplierCode,
    });

    if (existingSupplier) {
      return NextResponse.json(
        {
          success: false,
          message: "Ye supplier code pehle se exist karta hai",
        },
        { status: 409 }
      );
    }

    // Supplier ke saath current user ki ID bhi save hogi.
    const supplier = await Supplier.create({
      userId,
      name,
      supplierCode,
      phone,
      email,
      address,
      status,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Supplier successfully add ho gaya",
        supplier,
      },
      { status: 201 }
    );
  } catch (error) {
    // Compound unique index duplicate code ko bhi rokega.
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "Ye supplier code pehle se exist karta hai",
        },
        { status: 409 }
      );
    }

    console.error("POST suppliers error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Supplier save karne mein error aaya",
      },
      { status: 500 }
    );
  }
}
