import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

import connectDB from "../../../lib/mongodb.js";
import Product from "../../../models/Product.js";

// JWT secret login API wale secret se match hona chahiye.
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// Logged-in user ki ID verify karne ka function.
async function getLoggedInUserId() {
  try {
    const cookieStore = await cookies();

    // Login API mein cookie ka naam bizpilot_token hai.
    const token = cookieStore.get("bizpilot_token")?.value;

    if (!token) return null;

    // JWT verify hoga. Invalid ya expired token reject hoga.
    const { payload } = await jwtVerify(token, secret);

    return payload.userId || null;
  } catch (error) {
    return null;
  }
}

// GET: Sirf logged-in user ke products fetch honge.
export async function GET() {
  try {
    await connectDB();

    const userId = await getLoggedInUserId();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Please login first" },
        { status: 401 }
      );
    }

    // Sirf isi user ke products database se milenge.
    const products = await Product.find({ userId }).sort({
      createdAt: -1,
    });

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

// POST: Product logged-in user ke account mein save hoga.
export async function POST(request) {
  try {
    await connectDB();

    const userId = await getLoggedInUserId();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Please login first" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, sku, category, price, stock } = body;

    // Basic validation.
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
        {
          success: false,
          message: "Valid name, SKU aur price zaroori hain",
        },
        { status: 400 }
      );
    }

    // Stock non-negative whole number hona chahiye.
    const parsedStock =
      stock === undefined || stock === "" ? 0 : Number(stock);

    if (!Number.isInteger(parsedStock) || parsedStock < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Stock non-negative whole number hona chahiye",
        },
        { status: 400 }
      );
    }

    // userId token se aa raha hai, request body se nahi.
    const product = await Product.create({
      userId,
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