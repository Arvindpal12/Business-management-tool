
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "../../../../lib/mongodb.js";
import Customer from "../../../../models/Customer.js";

// Customer ID ko validate karte hain, taaki galat ID par database query na chale.
function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// PUT: Existing customer ki details update karne ke liye.
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!isValidId(id)) {
      return NextResponse.json(
        { success: false, message: "Customer ID valid nahi hai." },
        { status: 400 }
      );
    }

    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Customer name required hai." },
        { status: 400 }
      );
    }

    const customer = await Customer.findByIdAndUpdate(
      id,
      {
        name,
        phone: typeof body.phone === "string" ? body.phone.trim() : "",
        email:
          typeof body.email === "string"
            ? body.email.trim().toLowerCase()
            : "",
        address:
          typeof body.address === "string" ? body.address.trim() : "",
      },
      { new: true, runValidators: true }
    );

    if (!customer) {
      return NextResponse.json(
        { success: false, message: "Customer nahi mila." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Customer successfully update ho gaya.",
      customer: {
        ...customer.toObject(),
        id: String(customer._id),
        _id: String(customer._id),
      },
    });
  } catch (error) {
    console.error("Customer PUT error:", error);

    return NextResponse.json(
      { success: false, message: "Customer update nahi ho saka." },
      { status: 500 }
    );
  }
}

// DELETE: Customer ko database se delete karne ke liye.
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!isValidId(id)) {
      return NextResponse.json(
        { success: false, message: "Customer ID valid nahi hai." },
        { status: 400 }
      );
    }

    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      return NextResponse.json(
        { success: false, message: "Customer nahi mila." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Customer successfully delete ho gaya.",
    });
  } catch (error) {
    console.error("Customer DELETE error:", error);

    return NextResponse.json(
      { success: false, message: "Customer delete nahi ho saka." },
      { status: 500 }
    );
  }
}
