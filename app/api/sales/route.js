
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

import connectDB from "../../../lib/mongodb.js";
import Product from "../../../models/Product.js";
import Sale from "../../../models/Sale.js";

// JWT secret se token verify hoga.
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// Logged-in user ki ID token se nikalne ke liye helper function.
async function getLoggedInUserId() {
  try {
    const cookieStore = await cookies();

    // Login API mein cookie ka naam bizpilot_token hai.
    const token = cookieStore.get("bizpilot_token")?.value;

    if (!token) return null;

    const { payload } = await jwtVerify(token, secret);

    return payload.userId || null;
  } catch (error) {
    return null;
  }
}

// GET: Sirf logged-in user ki sales history laata hai.
export async function GET() {
  try {
    await connectDB();

    const userId = await getLoggedInUserId();

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return Response.json(
        { success: false, message: "Please login first." },
        { status: 401 }
      );
    }

    // Sirf isi user ki sales database se fetch hongi.
    const sales = await Sale.find({ userId })
      .populate("product", "name sku")
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({ success: true, sales });
  } catch (error) {
    console.error("Sales GET error:", error.message);

    return Response.json(
      { success: false, message: "Sales history load nahi hui." },
      { status: 500 }
    );
  }
}

// POST: Sale save karta hai aur sirf current user ka stock kam karta hai.
export async function POST(request) {
  let session;

  try {
    await connectDB();

    const userId = await getLoggedInUserId();

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return Response.json(
        { success: false, message: "Please login first." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const productId = body.productId;
    const quantity = Number(body.quantity);
    const sellingPrice = Number(body.sellingPrice);

    // Invalid input ko database tak jaane se roko.
    if (
      !mongoose.isValidObjectId(productId) ||
      !Number.isSafeInteger(quantity) ||
      quantity < 1 ||
      !Number.isFinite(sellingPrice) ||
      sellingPrice < 0
    ) {
      return Response.json(
        { success: false, message: "Product, quantity ya price invalid hai." },
        { status: 400 }
      );
    }

    session = await mongoose.startSession();

    let savedSale;

    // Transaction se sale save aur stock update ek saath hote hain.
    await session.withTransaction(async () => {

      // IMPORTANT: userId bhi check hoga.
      // Isse doosre user ka product update nahi ho sakta.
      const product = await Product.findOneAndUpdate(
        {
          _id: productId,
          userId: userId,
          stock: { $gte: quantity },
        },
        {
          $inc: { stock: -quantity },
        },
        {
          new: true,
          session,
        }
      );

      if (!product) {
        throw new Error("PRODUCT_NOT_AVAILABLE");
      }

      // Sale ke saath logged-in user ki ID bhi save hogi.
      const created = await Sale.create(
        [
          {
            userId: userId,
            product: product._id,
            productName: product.name,
            quantity,
            sellingPrice,
            totalAmount: quantity * sellingPrice,
          },
        ],
        { session }
      );

      savedSale = created[0];
    });

    return Response.json(
      {
        success: true,
        message: "Sale save ho gayi aur stock update ho gaya.",
        sale: savedSale,
      },
      { status: 201 }
    );

  } catch (error) {
    if (error.message === "PRODUCT_NOT_AVAILABLE") {
      return Response.json(
        {
          success: false,
          message: "Product nahi mila ya available stock kam hai.",
        },
        { status: 400 }
      );
    }

    console.error("Sales POST error:", error.message);

    return Response.json(
      {
        success: false,
        message: "Sale save nahi hui. Server terminal ka error check karo.",
      },
      { status: 500 }
    );

  } finally {
    if (session) {
      await session.endSession();
    }
  }
}
