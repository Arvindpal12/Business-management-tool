
import mongoose from "mongoose";
import connectDB from "../../../../lib/mongodb.js";
import Product from "../../../../models/Product.js";

// URL se product ki ID nikaal kar validate karte hain.
async function getValidId(params) {
  const { id } = await params;

  if (!mongoose.isValidObjectId(id)) {
    return null;
  }

  return id;
}

// PUT: Existing product ko MongoDB mein update karna.
export async function PUT(request, { params }) {
  try {
    const id = await getValidId(params);

    if (!id) {
      return Response.json(
        { success: false, message: "Invalid product ID." },
        { status: 400 }
      );
    }

    await connectDB();
    const body = await request.json();

    // Sirf allowed fields update honge.
    const updates = {};

    if (body.name !== undefined) updates.name = body.name;
    if (body.sku !== undefined) updates.sku = body.sku;
    if (body.category !== undefined) updates.category = body.category;
    if (body.price !== undefined) updates.price = Number(body.price);
    if (body.stock !== undefined) updates.stock = Number(body.stock);

    const product = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return Response.json(
        { success: false, message: "Product nahi mila." },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      product: {
        ...product.toObject(),
        id: product._id.toString(),
      },
    });
  } catch (error) {
    console.error("Product PUT error:", error);

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
      { success: false, message: "Product update nahi ho paaya." },
      { status: 500 }
    );
  }
}

// DELETE: Product ko MongoDB se delete karna.
export async function DELETE(request, { params }) {
  try {
    const id = await getValidId(params);

    if (!id) {
      return Response.json(
        { success: false, message: "Invalid product ID." },
        { status: 400 }
      );
    }

    await connectDB();

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return Response.json(
        { success: false, message: "Product nahi mila." },
        { status: 404 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Product DELETE error:", error);

    return Response.json(
      { success: false, message: "Product delete nahi ho paaya." },
      { status: 500 }
    );
  }
}
