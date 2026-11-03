
// import { NextResponse } from "next/server";

// // MongoDB connection aur existing models import kar rahe hain
// import connectDB from "../../../lib/mongodb.js";
// import Sale from "../../../models/Sale.js";
// import Purchase from "../../../models/Purchase.js";
// import Expense from "../../../models/Expense.js";

// // Reports API: Sales, Purchases aur Expenses ka data return karegi
// export async function GET(request) {
//   try {
//     // MongoDB se connection establish karo
//     await connectDB();

//     // URL se optional date filters read karo
//     const { searchParams } = new URL(request.url);

//     const startDate = searchParams.get("startDate");
//     const endDate = searchParams.get("endDate");

//     // Date filter objects alag-alag rakhenge:
//     // Sales/Purchases createdAt par filter hongi.
//     // Expenses apne date field par filter honge.
//     const salesFilter = {};
//     const purchasesFilter = {};
//     const expensesFilter = {};

//     // Start aur end ko common scope mein declare karo,
//     // taaki teeno filters mein use kar sakein.
//     let start = null;
//     let end = null;

//     // Start date validate aur prepare karo
//     if (startDate) {
//       start = new Date(`${startDate}T00:00:00.000Z`);

//       if (Number.isNaN(start.getTime())) {
//         return NextResponse.json(
//           { success: false, message: "Invalid start date." },
//           { status: 400 }
//         );
//       }
//     }

//     // End date validate aur prepare karo.
//     // End date ko exclusive rakhenge: next day ke start tak.
//     if (endDate) {
//       end = new Date(`${endDate}T00:00:00.000Z`);

//       if (Number.isNaN(end.getTime())) {
//         return NextResponse.json(
//           { success: false, message: "Invalid end date." },
//           { status: 400 }
//         );
//       }

//       end.setUTCDate(end.getUTCDate() + 1);
//     }

//     // Sales aur Purchases createdAt ke basis par filter hongi
//     if (start || end) {
//       const createdAtFilter = {};

//       if (start) {
//         createdAtFilter.$gte = start;
//       }

//       if (end) {
//         createdAtFilter.$lt = end;
//       }

//       salesFilter.createdAt = createdAtFilter;
//       purchasesFilter.createdAt = createdAtFilter;
//     }

//     // Expenses apne date field ke basis par filter honge
//     if (start || end) {
//       const expenseDateFilter = {};

//       if (start) {
//         expenseDateFilter.$gte = start;
//       }

//       if (end) {
//         expenseDateFilter.$lt = end;
//       }

//       expensesFilter.date = expenseDateFilter;
//     }

//     // Teeno collections se matching records fetch karo
//     const [sales, purchases, expenses] = await Promise.all([
//       Sale.find(salesFilter).sort({ createdAt: -1 }).lean(),
//       Purchase.find(purchasesFilter).sort({ createdAt: -1 }).lean(),
//       Expense.find(expensesFilter).sort({ date: -1 }).lean(),
//     ]);

//     // Sales ka total amount calculate karo
//     const totalSales = sales.reduce(
//       (total, sale) => total + Number(sale.totalAmount || 0),
//       0
//     );

//     // Purchases ka total amount calculate karo
//     const totalPurchases = purchases.reduce(
//       (total, purchase) => total + Number(purchase.totalAmount || 0),
//       0
//     );

//     // Expenses ka total amount calculate karo
//     const totalExpenses = expenses.reduce(
//       (total, expense) => total + Number(expense.amount || 0),
//       0
//     );

//     // Basic business balance:
//     // Sales - Purchases - Expenses
//     const netBalance = totalSales - totalPurchases - totalExpenses;

//     // Dashboard ko report data return karo
//     return NextResponse.json({
//       success: true,

//       summary: {
//         totalSales,
//         totalPurchases,
//         totalExpenses,
//         netBalance,
//         salesCount: sales.length,
//         purchasesCount: purchases.length,
//         expensesCount: expenses.length,
//       },

//       sales,
//       purchases,
//       expenses,
//     });
//   } catch (error) {
//     // Actual server error terminal mein show hoga
//     console.error("REPORTS API ACTUAL ERROR:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: error.message || "Reports data fetch nahi ho saka.",
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";

// MongoDB connection aur existing models import kar rahe hain
import connectDB from "../../../lib/mongodb.js";
import Sale from "../../../models/Sale.js";
import Purchase from "../../../models/Purchase.js";
import Expense from "../../../models/Expense.js";

// Reports API: Sales, Purchases aur Expenses ka data return karegi
export async function GET(request) {
  try {
    // MongoDB se connection establish karo
    await connectDB();

    // URL se optional date filters read karo
    const { searchParams } = new URL(request.url);

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    // Date filter objects alag-alag rakhenge:
    // Sales/Purchases createdAt par filter hongi.
    // Expenses apne date field par filter honge.
    const salesFilter = {};
    const purchasesFilter = {};
    const expensesFilter = {};

    // Start aur end ko common scope mein declare karo,
    // taaki teeno filters mein use kar sakein.
    let start = null;
    let end = null;

    // Start date validate aur prepare karo
    if (startDate) {
      start = new Date(`${startDate}T00:00:00.000Z`);

      if (Number.isNaN(start.getTime())) {
        return NextResponse.json(
          { success: false, message: "Invalid start date." },
          { status: 400 }
        );
      }
    }

    // End date validate aur prepare karo.
    // End date ko exclusive rakhenge: next day ke start tak.
    if (endDate) {
      end = new Date(`${endDate}T00:00:00.000Z`);

      if (Number.isNaN(end.getTime())) {
        return NextResponse.json(
          { success: false, message: "Invalid end date." },
          { status: 400 }
        );
      }

      end.setUTCDate(end.getUTCDate() + 1);
    }

    // Sales aur Purchases createdAt ke basis par filter hongi
    if (start || end) {
      const createdAtFilter = {};

      if (start) {
        createdAtFilter.$gte = start;
      }

      if (end) {
        createdAtFilter.$lt = end;
      }

      salesFilter.createdAt = createdAtFilter;
      purchasesFilter.createdAt = createdAtFilter;
    }

    // Expenses apne date field ke basis par filter honge
    if (start || end) {
      const expenseDateFilter = {};

      if (start) {
        expenseDateFilter.$gte = start;
      }

      if (end) {
        expenseDateFilter.$lt = end;
      }

      expensesFilter.date = expenseDateFilter;
    }

    // Teeno collections se matching records fetch karo
    const [sales, purchases, expenses] = await Promise.all([
      Sale.find(salesFilter).sort({ createdAt: -1 }).lean(),
      Purchase.find(purchasesFilter).sort({ createdAt: -1 }).lean(),
      Expense.find(expensesFilter).sort({ date: -1 }).lean(),
    ]);

    // Sales ka total amount calculate karo
    const totalSales = sales.reduce(
      (total, sale) => total + Number(sale.totalAmount || 0),
      0
    );

    // Purchases ka total amount calculate karo
    const totalPurchases = purchases.reduce(
      (total, purchase) => total + Number(purchase.totalAmount || 0),
      0
    );

    // Expenses ka total amount calculate karo
    const totalExpenses = expenses.reduce(
      (total, expense) => total + Number(expense.amount || 0),
      0
    );

    // Basic business balance:
    // Sales - Purchases - Expenses
    const netBalance = totalSales - totalPurchases - totalExpenses;

    // Dashboard ko report data return karo
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
    // Actual server error terminal mein show hoga
    console.error("REPORTS API ACTUAL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Reports data fetch nahi ho saka.",
      },
      { status: 500 }
    );
  }
}

