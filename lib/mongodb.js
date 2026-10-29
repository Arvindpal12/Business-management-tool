
import mongoose from "mongoose";

// Development mein Next.js baar-baar reload ho sakta hai.
// Isliye connection ko cache karte hain, taaki har request par
// naya MongoDB connection create na ho.
const cached = global.mongoose || (global.mongoose = {
  conn: null,
  promise: null,
});

// Ye function MongoDB se connection establish karta hai.
async function connectDB() {
  // Agar connection pehle se active hai, use hi reuse karo.
  if (cached.conn) {
    return cached.conn;
  }

  // Environment variable se secure connection string read karo.
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI .env.local mein set nahi hai");
  }

  // Connection promise ko cache karte hain, taaki ek saath
  // aane wali requests multiple connections na banayein.
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // Failure par promise clear karo, taaki dobara try kar sakein.
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
