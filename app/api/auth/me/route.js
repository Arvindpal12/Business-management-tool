
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import connectDB from "../../../../lib/mongodb.js";
import User from "../../../../models/User.js";

// Logged-in user ki identity verify karne ke liye API
export async function GET() {
  try {
    // Browser se authentication cookie read karte hain
    const cookieStore = await cookies();
    const token = cookieStore.get("bizpilot_token")?.value;

    // Cookie nahi hai to user login nahi hai
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // JWT token verify karte hain
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET
    );

    const { payload } = await jwtVerify(token, secret);

    // Verified token se user ID lekar MongoDB mein user find karte hain
    await connectDB();

    const user = await User.findById(payload.userId).select(
      "_id name email"
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 401 }
      );
    }

    // Sirf logged-in user ki basic details return karte hain
    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Auth verification error:", error);

    return NextResponse.json(
      { success: false, message: "Invalid or expired session" },
      { status: 401 }
    );
  }
}
