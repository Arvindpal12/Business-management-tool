
// import mongoose from "mongoose";

// // Development mein Next.js baar-baar reload ho sakta hai.
// // Isliye connection ko cache karte hain, taaki har request par
// // naya MongoDB connection create na ho.
// const cached = global.mongoose || (global.mongoose = {
//   conn: null,
//   promise: null,
// });

// // Ye function MongoDB se connection establish karta hai.
// async function connectDB() {
//   // Agar connection pehle se active hai, use hi reuse karo.
//   if (cached.conn) {
//     return cached.conn;
//   }

//   // Environment variable se secure connection string read karo.
//   if (!process.env.MONGODB_URI) {
//     throw new Error("MONGODB_URI .env.local mein set nahi hai");
//   }

//   // Connection promise ko cache karte hain, taaki ek saath
//   // aane wali requests multiple connections na banayein.
//   if (!cached.promise) {
//     cached.promise = mongoose.connect(process.env.MONGODB_URI, {
//       bufferCommands: false,
//     });
//   }

//   try {
//     cached.conn = await cached.promise;
//   } catch (error) {
//     // Failure par promise clear karo, taaki dobara try kar sakein.
//     cached.promise = null;
//     throw error;
//   }

//   return cached.conn;
// }

// export default connectDB;
import mongoose from "mongoose";

// Development mein Next.js reload hone par connection ko reuse karte hain.
// Isse baar-baar naya MongoDB connection create nahi hota.
const cached =
  global.mongoose ||
  (global.mongoose = {
    conn: null,
    promise: null,
  });

// MongoDB se connection establish karne wala function.
async function connectDB() {
  // Agar connection already active hai, to wahi reuse karo.
  if (cached.conn) {
    return cached.conn;
  }

  // Vercel ya .env.local se MongoDB connection string read karo.
  let uri = process.env.MONGODB_URI || "";

  // Extra spaces aur surrounding quotes remove karo.
  uri = uri.trim().replace(/^["']|["']$/g, "");

  // Agar galti se value mein MONGODB_URI= bhi paste ho gaya ho,
  // to use remove karo.
  uri = uri.replace(/^MONGODB_URI\s*=\s*/i, "");

  // Connection string ka format validate karo.
  if (
    !uri.startsWith("mongodb://") &&
    !uri.startsWith("mongodb+srv://")
  ) {
    throw new Error(
      "MONGODB_URI invalid hai. Connection string mongodb:// ya mongodb+srv:// se start honi chahiye."
    );
  }

  // Connection promise ko cache karo, taaki multiple requests
  // ek saath aane par multiple connections na banayein.
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
    });
  }

  try {
    // Connection successful hone par cache mein store karo.
    cached.conn = await cached.promise;
  } catch (error) {
    // Connection fail hone par promise clear karo,
    // taaki next request dobara connection try kar sake.
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;