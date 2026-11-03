
import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb.js";
import Supplier from "../../../models/Supplier.js";

// GET: MongoDB se saare suppliers fetch karna
export async function GET() {
  try {
    await connectDB();

    const suppliers = await Supplier.find().sort({ createdAt: -1 });

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

// POST: Naya supplier MongoDB mein save karna
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const { name, supplierCode, phone, email, address, status } = body;

    // Required fields check karna
    if (!name || !supplierCode) {
      return NextResponse.json(
        {
          success: false,
          message: "Supplier name aur supplier code required hain",
        },
        { status: 400 }
      );
    }

    // Same supplier code dobara save nahi hone dena
    const existingSupplier = await Supplier.findOne({ supplierCode });

    if (existingSupplier) {
      return NextResponse.json(
        {
          success: false,
          message: "Ye supplier code pehle se exist karta hai",
        },
        { status: 409 }
      );
    }

    // Supplier ka naya record create karna
    const supplier = await Supplier.create({
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
