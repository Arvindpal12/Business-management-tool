// Relative path use kar rahe hain, taaki @ alias ki dependency na rahe.
import connectDB from "../../../lib/mongodb.js";

// GET request par database connection test hoga.
export async function GET() {
  try {
    await connectDB();

    // Successful connection ka response browser mein dikhega.
    return Response.json({
      success: true,
      message: "MongoDB connected successfully!",
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.message);

    return Response.json(
      {
        success: false,
        message: "MongoDB connection failed",
      },
      { status: 500 }
    );
  }
}
