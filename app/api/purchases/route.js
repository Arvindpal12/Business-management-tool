
// import { NextResponse } from "next/server";
// import Connectdb from "@/lib/mongodb";
// import Product from "@/models/Product";
// import Purchase from "@/models/Purchase";
import { NextResponse } from "next/server";
import connectdb from "../../../lib/mongodb";
import Product from "../../../models/Product";
import Purchase from "../../../models/Purchase";

// GET: Purchase history MongoDB se laane ke liye.
export async function GET() {
  try {
    await connectdb();

    const purchases = await Purchase.find({})
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

// POST: Nayi purchase save karne aur product stock badhane ke liye.
export async function POST(request) {
  try {
    await connectdb();

    const body = await request.json();
    const { productId, quantity, purchasePrice, supplier, notes } = body;

    // Input validation: galat quantity ya price accept nahi karenge.
    if (
      !productId ||
      !Number.isInteger(Number(quantity)) ||
      Number(quantity) < 1 ||
      purchasePrice === undefined ||
      purchasePrice === null ||
      !Number.isFinite(Number(purchasePrice)) ||
      Number(purchasePrice) < 0
    ) {
      return NextResponse.json(
        { success: false, message: "Product, valid quantity aur purchase price zaroori hain." },
        { status: 400 }
      );
    }

    // Product ko database mein check karo.
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product nahi mila." },
        { status: 404 }
      );
    }

    const qty = Number(quantity);
    const price = Number(purchasePrice);

    // Purchase ka total amount calculate karo.
    const totalAmount = qty * price;

    // Purchase history save karo.
    const purchase = await Purchase.create({
      productId: product._id,
      productName: product.name,
      quantity: qty,
      purchasePrice: price,
      totalAmount,
      supplier: supplier || "",
      notes: notes || "",
    });

    try {
      // Product ka stock khareedi gayi quantity se badhao.
      product.stock = Number(product.stock || 0) + qty;
      await product.save();
    } catch (stockError) {
      // Stock update fail ho to purchase ki incomplete entry hata do.
      await Purchase.findByIdAndDelete(purchase._id);
      throw stockError;
    }

    return NextResponse.json(
      {
        success: true,
        message: "Purchase save ho gayi aur stock badh gaya.",
        purchase,
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Purchase POST error:", error);

    return NextResponse.json(
      { success: false, message: "Purchase save nahi ho saki." },
      { status: 500 }
    );
  }
}
