
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "../../../../lib/mongodb.js";
import User from "../../../../models/User.js";

// Signup API: naye user ka account create karne ke liye
export async function POST(request) {
  try {
    // MongoDB se connection establish karte hain
    await connectDB();

    // Frontend se aane wala form data
    const { name, email, password } = await request.json();

    // Basic validation: koi field empty nahi honi chahiye
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Password ki minimum length check
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Email ko lowercase karke duplicate account check karte hain
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 409 }
      );
    }

    // Original password ko hash karte hain; database mein plain password save nahi hoga
    const hashedPassword = await bcrypt.hash(password, 12);

    // Naya user MongoDB mein save karte hain
    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong during signup" },
      { status: 500 }
    );
  }
}
