
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

import connectdb from "../../../lib/mongodb.js";
import Product from "../../../models/Product.js";
import Purchase from "../../../models/Purchase.js";

// JWT secret se login token verify hoga.
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// Current logged-in user ki ID nikalne ke liye helper.
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

// GET: Sirf current user ki purchase history laata hai.
export async function GET() {
  try {
    await connectdb();

    const userId = await getLoggedInUserId();

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json(
        { success: false, message: "Please login first." },
        { status: 401 }
      );
    }

    // Database se sirf logged-in user ki purchases fetch hongi.
    const purchases = await Purchase.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, purchases });

  } catch (error) {
    console.error("Purchase GET error:", error);

    return NextResponse.json(
      { success: false, message: "Purchase history load nahi hui." },
      { status: 500 }
    );
  }
}

// POST: Purchase save karta hai aur current user ka stock badhata hai.
export async function POST(request) {
  let session;

  try {
    await connectdb();

    const userId = await getLoggedInUserId();

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json(
        { success: false, message: "Please login first." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const { productId, quantity, purchasePrice, supplier, notes } = body;

    // Input validation.
    if (
      !mongoose.isValidObjectId(productId) ||
      !Number.isSafeInteger(Number(quantity)) ||
      Number(quantity) < 1 ||
      purchasePrice === undefined ||
      purchasePrice === null ||
      !Number.isFinite(Number(purchasePrice)) ||
      Number(purchasePrice) < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Product, valid quantity aur purchase price zaroori hain."
        },
        { status: 400 }
      );
    }

    const qty = Number(quantity);
    const price = Number(purchasePrice);
    const totalAmount = qty * price;

    if (!Number.isFinite(totalAmount)) {
      return NextResponse.json(
        { success: false, message: "Purchase amount invalid hai." },
        { status: 400 }
      );
    }

    session = await mongoose.startSession();

    let savedPurchase;
    let updatedProduct;

    // Purchase aur stock update ek transaction mein honge.
    await session.withTransaction(async () => {

      // Product ID ke saath userId bhi verify hoga.
      // Isse doosre user ka stock update nahi ho sakta.
      updatedProduct = await Product.findOneAndUpdate(
        {
          _id: productId,
          userId: userId,
        },
        {
          $inc: { stock: qty },
        },
        {
          new: true,
          session,
        }
      );

      if (!updatedProduct) {
        throw new Error("PRODUCT_NOT_FOUND");
      }

      // Purchase ke saath logged-in user ki ID bhi save hogi.
      const created = await Purchase.create(
        [
          {
            userId: userId,
            productId: updatedProduct._id,
            productName: updatedProduct.name,
            quantity: qty,
            purchasePrice: price,
            totalAmount,
            supplier: supplier || "",
            notes: notes || "",
          },
        ],
        { session }
      );

      savedPurchase = created[0];
    });

    return NextResponse.json(
      {
        success: true,
        message: "Purchase save ho gayi aur stock badh gaya.",
        purchase: savedPurchase,
        product: updatedProduct,
      },
      { status: 201 }
    );

  } catch (error) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      return NextResponse.json(
        { success: false, message: "Product nahi mila." },
        { status: 404 }
      );
    }

    console.error("Purchase POST error:", error);

    return NextResponse.json(
      { success: false, message: "Purchase save nahi ho saki." },
      { status: 500 }
    );

  } finally {
    if (session) {
      await session.endSession();
    }
  }
}
