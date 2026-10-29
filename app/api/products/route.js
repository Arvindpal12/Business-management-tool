
import connectDB from "../../../lib/mongodb.js";
import Product from "../../../models/Product.js";

// GET: MongoDB se saare products fetch karne ke liye.
export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({}).sort({ createdAt: -1 });

    // Frontend ko products JSON format mein return honge.
    return Response.json({
      success: true,
      products: products.map((product) => ({
        ...product.toObject(),
        id: product._id.toString(),
      })),
    });
  } catch (error) {
    console.error("Products GET error:", error);

    return Response.json(
      { success: false, message: "Products load nahi ho paaye." },
      { status: 500 }
    );
  }
}

// POST: Naya product MongoDB mein save karne ke liye.
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    // Frontend se aane wale fields ko validate karne ki
    // zimmedari schema bhi handle karega.
    const product = await Product.create({
      name: body.name,
      sku: body.sku,
      category: body.category || "Uncategorized",
      price: Number(body.price),
      stock: Number(body.stock ?? 0),
    });

    return Response.json(
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

    // Duplicate SKU ya schema validation error ke liye.
    if (error.code === 11000) {
      return Response.json(
        { success: false, message: "Ye SKU pehle se exist karta hai." },
        { status: 409 }
      );
    }

    if (error.name === "ValidationError" || error.name === "CastError") {
      return Response.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return Response.json(
      { success: false, message: "Product save nahi ho paaya." },
      { status: 500 }
    );
  }
}
