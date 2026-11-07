
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

import connectDB from "../../../lib/mongodb.js";
import Sale from "../../../models/Sale.js";
import Purchase from "../../../models/Purchase.js";
import Expense from "../../../models/Expense.js";

// Login cookie se verified user ki ID nikalne ke liye
async function getLoggedInUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("bizpilot_token")?.value;

  if (!token) {
    return null;
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const { payload } = await jwtVerify(token, secret);

  return payload.userId;
}

// Reports API: sirf logged-in user ka report data return karegi
export async function GET(request) {
  try {
    await connectDB();

    // JWT verify karke logged-in user ki ID nikalo
    const userId = await getLoggedInUserId();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Please login first." },
        { status: 401 }
      );
    }

    // URL se optional date filters read karo
    const { searchParams } = new URL(request.url);

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    // IMPORTANT: Har collection mein userId filter mandatory hai
    const salesFilter = { userId };
    const purchasesFilter = { userId };
    const expensesFilter = { userId };

    let start = null;
    let end = null;

    // Start date validate karo
    if (startDate) {
      start = new Date(`${startDate}T00:00:00.000Z`);

      if (Number.isNaN(start.getTime())) {
        return NextResponse.json(
          { success: false, message: "Invalid start date." },
          { status: 400 }
        );
      }
    }

    // End date validate karo
    if (endDate) {
      end = new Date(`${endDate}T00:00:00.000Z`);

      if (Number.isNaN(end.getTime())) {
        return NextResponse.json(
          { success: false, message: "Invalid end date." },
          { status: 400 }
        );
      }

      // End date ko exclusive rakho
      end.setUTCDate(end.getUTCDate() + 1);
    }

    // Date range valid hai ya nahi
    if (start && end && start >= end) {
      return NextResponse.json(
        { success: false, message: "End date must be after start date." },
        { status: 400 }
      );
    }

    // Sales aur Purchases createdAt ke basis par filter hongi
    if (start || end) {
      const createdAtFilter = {};

      if (start) createdAtFilter.$gte = start;
      if (end) createdAtFilter.$lt = end;

      salesFilter.createdAt = createdAtFilter;
      purchasesFilter.createdAt = createdAtFilter;
    }

    // Expenses apne date field ke basis par filter honge
    if (start || end) {
      const expenseDateFilter = {};

      if (start) expenseDateFilter.$gte = start;
      if (end) expenseDateFilter.$lt = end;

      expensesFilter.date = expenseDateFilter;
    }

    // Sirf logged-in user ka data fetch karo
    const [sales, purchases, expenses] = await Promise.all([
      Sale.find(salesFilter).sort({ createdAt: -1 }).lean(),
      Purchase.find(purchasesFilter).sort({ createdAt: -1 }).lean(),
      Expense.find(expensesFilter).sort({ date: -1 }).lean(),
    ]);

    // Total Sales calculate karo
    const totalSales = sales.reduce(
      (total, sale) => total + Number(sale.totalAmount || 0),
      0
    );

    // Total Purchases calculate karo
    const totalPurchases = purchases.reduce(
      (total, purchase) => total + Number(purchase.totalAmount || 0),
      0
    );

    // Total Expenses calculate karo
    const totalExpenses = expenses.reduce(
      (total, expense) => total + Number(expense.amount || 0),
      0
    );

    // Net Balance calculate karo
    const netBalance = totalSales - totalPurchases - totalExpenses;

    return NextResponse.json({
      success: true,

      summary: {
        totalSales,
        totalPurchases,
        totalExpenses,
        netBalance,
        salesCount: sales.length,
        purchasesCount: purchases.length,
        expensesCount: expenses.length,
      },

      sales,
      purchases,
      expenses,
    });

  } catch (error) {
    console.error("REPORTS API ACTUAL ERROR:", error);

    // Invalid ya expired token
    if (
      error.code === "ERR_JWT_EXPIRED" ||
      error.code === "ERR_JWS_INVALID" ||
      error.code === "ERR_JWT_INVALID"
    ) {
      return NextResponse.json(
        { success: false, message: "Session expired. Please login again." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Reports data fetch nahi ho saka.",
      },
      { status: 500 }
    );
  }
}
