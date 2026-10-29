
import mongoose from "mongoose";
import connectDB from "../../../lib/mongodb.js";
import Product from "../../../models/Product.js";
import Sale from "../../../models/Sale.js";

// GET: MongoDB se sales history laata hai.
export async function GET() {
  try {
    await connectDB();

    const sales = await Sale.find()
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

// POST: Nayi sale save karta hai aur product ka stock kam karta hai.
export async function POST(request) {
  let session;

  try {
    await connectDB();

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
      // Sirf tab stock ghatao jab available stock kaafi ho.
      const product = await Product.findOneAndUpdate(
        {
          _id: productId,
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

      const created = await Sale.create(
        [
          {
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
