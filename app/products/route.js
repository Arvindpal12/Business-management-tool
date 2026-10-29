
import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb.js";
import Product from "../../../models/Product.js";

// GET: MongoDB mein save sabhi products fetch karna.
export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Products fetch error:", error.message);

    return NextResponse.json(
      { success: false, message: "Products fetch nahi ho sake" },
      { status: 500 }
    );
  }
}

// POST: Naya product MongoDB mein save karna.
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, sku, category, price, stock } = body;

    // Basic validation: name, SKU aur valid price zaroori hain.
    if (
      !name?.trim() ||
      !sku?.trim() ||
      price === undefined ||
      price === null ||
      price === "" ||
      !Number.isFinite(Number(price)) ||
      Number(price) < 0
    ) {
      return NextResponse.json(
        { success: false, message: "Valid name, SKU aur price zaroori hain" },
        { status: 400 }
      );
    }

    // Stock ko non-negative whole number hona chahiye.
    const parsedStock = stock === undefined || stock === "" ? 0 : Number(stock);

    if (!Number.isInteger(parsedStock) || parsedStock < 0) {
      return NextResponse.json(
        { success: false, message: "Stock non-negative whole number hona chahiye" },
        { status: 400 }
      );
    }

    const product = await Product.create({
      name: name.trim(),
      sku: sku.trim(),
      category: category?.trim() || "Uncategorized",
      price: Number(price),
      stock: parsedStock,
    });

    return NextResponse.json(
      { success: true, product },
      { status: 201 }
    );
  } catch (error) {
    // Duplicate SKU ke liye user-friendly response.
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Ye SKU pehle se maujood hai" },
        { status: 409 }
      );
    }

    console.error("Product create error:", error.message);

    return NextResponse.json(
      { success: false, message: "Product save nahi ho saka" },
      { status: 500 }
    );
  }
}
