
// import connectDB from "../../../lib/mongodb.js";
// import Product from "../../../models/Product.js";

// // GET: MongoDB se saare products fetch karne ke liye.
// export async function GET() {
//   try {
//     await connectDB();

//     const products = await Product.find({}).sort({ createdAt: -1 });

//     // Frontend ko products JSON format mein return honge.
//     return Response.json({
//       success: true,
//       products: products.map((product) => ({
//         ...product.toObject(),
//         id: product._id.toString(),
//       })),
//     });
//   } catch (error) {
//     console.error("Products GET error:", error);

//     return Response.json(
//       { success: false, message: "Products load nahi ho paaye." },
//       { status: 500 }
//     );
//   }
// }

// // POST: Naya product MongoDB mein save karne ke liye.
// export async function POST(request) {
//   try {
//     await connectDB();

//     const body = await request.json();

//     // Frontend se aane wale fields ko validate karne ki
//     // zimmedari schema bhi handle karega.
//     const product = await Product.create({
//       name: body.name,
//       sku: body.sku,
//       category: body.category || "Uncategorized",
//       price: Number(body.price),
//       stock: Number(body.stock ?? 0),
//     });

//     return Response.json(
//       {
//         success: true,
//         product: {
//           ...product.toObject(),
//           id: product._id.toString(),
//         },
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Products POST error:", error);

//     // Duplicate SKU ya schema validation error ke liye.
//     if (error.code === 11000) {
//       return Response.json(
//         { success: false, message: "Ye SKU pehle se exist karta hai." },
//         { status: 409 }
//       );
//     }

//     if (error.name === "ValidationError" || error.name === "CastError") {
//       return Response.json(
//         { success: false, message: error.message },
//         { status: 400 }
//       );
//     }

//     return Response.json(
//       { success: false, message: "Product save nahi ho paaya." },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

import connectDB from "../../../lib/mongodb.js";
import Product from "../../../models/Product.js";

// Login API wale JWT secret se token verify karenge.
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// Current logged-in user ki ID nikalne ka function.
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

// GET: Sirf current user ke products fetch honge.
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

    const products = await Product.find({ userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      products: products.map((product) => ({
        ...product.toObject(),
        id: product._id.toString(),
      })),
    });
  } catch (error) {
    console.error("Products GET error:", error);

    return NextResponse.json(
      { success: false, message: "Products load nahi ho paaye." },
      { status: 500 }
    );
  }
}

// POST: Product current logged-in user ke account mein save hoga.
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

    // User ID browser se nahi, verified login token se aayegi.
    const product = await Product.create({
      userId,
      name: name.trim(),
      sku: sku.trim(),
      category: category?.trim() || "Uncategorized",
      price: Number(price),
      stock: parsedStock,
    });

    return NextResponse.json(
      {
        success: true,
        product: {
          ...product.toObject(),
          id: product._id.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Products POST error:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Ye SKU pehle se maujood hai" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Product save nahi ho paaya.",
      },
      { status: 500 }
    );
  }
}