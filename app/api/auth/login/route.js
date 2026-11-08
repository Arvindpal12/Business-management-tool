
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { SignJWT } from "jose";
// import connectDB from "../../../../lib/mongodb.js";
// import User from "../../../../models/User.js";

// // JWT secret ko secure token banane ke liye use karenge
// const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// export async function POST(request) {
//   try {
//     await connectDB();

//     const { email, password } = await request.json();

//     // Email aur password required hain
//     if (!email || !password) {
//       return NextResponse.json(
//         { success: false, message: "Email and password are required" },
//         { status: 400 }
//       );
//     }

//     const normalizedEmail = email.trim().toLowerCase();

//     // Password select:false hai, isliye explicitly select karna zaroori hai
//     const user = await User.findOne({
//       email: normalizedEmail,
//     }).select("+password");

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "Invalid email or password" },
//         { status: 401 }
//       );
//     }

//     // Enter kiya password aur database hash compare karte hain
//     const isPasswordValid = await bcrypt.compare(
//       password,
//       user.password
//     );

//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { success: false, message: "Invalid email or password" },
//         { status: 401 }
//       );
//     }

//     // User ki identity ke saath JWT token create karte hain
//     const token = await new SignJWT({
//       userId: user._id.toString(),
//     })
//       .setProtectedHeader({ alg: "HS256" })
//       .setIssuedAt()
//       .setExpirationTime("7d")
//       .sign(secret);

//     const response = NextResponse.json({
//       success: true,
//       message: "Login successful",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });

//     // HttpOnly cookie browser mein securely save hogi
//     response.cookies.set("bizpilot_token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//       maxAge: 60 * 60 * 24 * 7,
//     });

//     return response;

//   } catch (error) {
//     console.error("Login Error:", error);

//     return NextResponse.json(
//       { success: false, message: "Login failed. Please try again." },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import connectDB from "../../../../lib/mongodb.js";
import User from "../../../../models/User.js";

// JWT secret ko environment variable se read karte hain
const jwtSecret = process.env.JWT_SECRET;

// Empty ya missing secret ke saath application ko token generate nahi karne denge
if (!jwtSecret || !jwtSecret.trim()) {
  throw new Error("JWT_SECRET is missing. Please configure it in environment variables.");
}

// Secret ko bytes mein convert karte hain
const secret = new TextEncoder().encode(jwtSecret);

// Login API
export async function POST(request) {
  try {
    // MongoDB connection establish karte hain
    await connectDB();

    // Frontend se email aur password receive karte hain
    const { email, password } = await request.json();

    // Required fields validate karte hain
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    // Email normalize karte hain
    const normalizedEmail = email.trim().toLowerCase();

    // Database se user find karte hain
    // Password select:false hone par bhi explicitly fetch hoga
    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    // User nahi mila toh login reject karenge
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // Enter kiye password ko database hash se compare karte hain
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // Successful login ke baad JWT token generate karte hain
    const token = await new SignJWT({
      userId: user._id.toString(),
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    // Successful response create karte hain
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });

    // Token ko secure HttpOnly cookie mein save karte hain
    response.cookies.set("bizpilot_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;

  } catch (error) {
    // Server logs mein actual error show hoga
    console.error("Login Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Login failed. Please try again.",
      },
      { status: 500 }
    );
  }
}

