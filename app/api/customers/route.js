
import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb.js";
import Customer from "../../../models/Customer.js";

// GET: MongoDB se sabhi customers fetch karne ke liye.
export async function GET() {
  try {
    await connectDB();

    const customers = await Customer.find().sort({ createdAt: -1 }).lean();

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

// POST: Naya customer MongoDB mein save karne ke liye.
export async function POST(request) {
  try {
    await connectDB();

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

    const customer = await Customer.create({
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
