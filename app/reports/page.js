
"use client";

import { useEffect, useMemo, useState } from "react";

// Indian Rupee format mein amount dikhane ke liye
const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount || 0));

// Date ko readable format mein dikhana
const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// CSV ke andar commas aur quotes ko safely handle karna
const escapeCSV = (value) => {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
};

export default function ReportsPage() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Default report period: current month
 // Server prerender ke time current date read nahi karni.
// Isliye initial values blank rakhi hain.
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");

  // API se selected date range ka report load karna
const loadReport = async () => {
  try {
    setLoading(true);
    setError("");

    const params = new URLSearchParams();

    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);

    const response = await fetch(`/api/reports?${params.toString()}`);

    // API response ko pehle text mein read karo,
    // taaki JSON parse fail hone par bhi actual response mil sake.
    const responseText = await response.text();

    console.log("Reports API status:", response.status);
    console.log("Reports API response:", responseText);

    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      throw new Error(
        `API ne valid JSON nahi diya. Status: ${response.status}`
      );
    }

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || `Report load nahi ho saka. Status: ${response.status}`
      );
    }

    setReport(data);
  } catch (err) {
    console.error("Report load error:", err);
    setError(err.message || "Report load karte waqt error aaya.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadReport();
  }, []);

  // CSV download: selected date range ka report
  const downloadCSV = () => {
    if (!report) return;

    const rows = [
      ["BizPilot Report"],
      ["Start Date", startDate],
      ["End Date", endDate],
      [],
      ["Summary"],
      ["Metric", "Amount"],
      ["Total Sales", report.summary.totalSales],
      ["Total Purchases", report.summary.totalPurchases],
      ["Total Expenses", report.summary.totalExpenses],
      ["Net Balance", report.summary.netBalance],
      [],
      ["Sales"],
      ["Product", "Quantity", "Amount", "Date"],
      ...report.sales.map((sale) => [
        sale.productName,
        sale.quantity,
        sale.totalAmount,
        formatDate(sale.createdAt),
      ]),
      [],
      ["Purchases"],
      ["Product", "Quantity", "Supplier", "Amount", "Date"],
      ...report.purchases.map((purchase) => [
        purchase.productName,
        purchase.quantity,
        purchase.supplier,
        purchase.totalAmount,
        formatDate(purchase.createdAt),
      ]),
      [],
      ["Expenses"],
      ["Title", "Category", "Amount", "Date"],
      ...report.expenses.map((expense) => [
        expense.title,
        expense.category,
        expense.amount,
        formatDate(expense.date),
      ]),
    ];

    const csv = rows
      .map((row) => row.map(escapeCSV).join(","))
      .join("\r\n");

    // Excel mein UTF-8 characters sahi dikhane ke liye BOM add karna
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `bizpilot-report-${startDate}-to-${endDate}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  // Browser print dialog se PDF save kar sakte hain
  const downloadPDF = () => {
    window.print();
  };

  const summary = report?.summary;

  const cards = [
    {
      title: "Total Sales",
      value: summary?.totalSales,
      icon: "↗",
      color: "blue",
      description: `${summary?.salesCount || 0} sales records`,
    },
    {
      title: "Total Purchases",
      value: summary?.totalPurchases,
      icon: "↓",
      color: "violet",
      description: `${summary?.purchasesCount || 0} purchase records`,
    },
    {
      title: "Total Expenses",
      value: summary?.totalExpenses,
      icon: "−",
      color: "rose",
      description: `${summary?.expensesCount || 0} expense records`,
    },
    {
      title: "Net Balance",
      value: summary?.netBalance,
      icon: "=",
      color: "emerald",
      description: "Sales − Purchases − Expenses",
    },
  ];

  // Tables ke totals ko safe numeric values mein calculate karna
  const salesTotal = useMemo(
    () =>
      (report?.sales || []).reduce(
        (sum, item) => sum + Number(item.totalAmount || 0),
        0
      ),
    [report]
  );

  const purchasesTotal = useMemo(
    () =>
      (report?.purchases || []).reduce(
        (sum, item) => sum + Number(item.totalAmount || 0),
        0
      ),
    [report]
  );

  const expensesTotal = useMemo(
    () =>
      (report?.expenses || []).reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0
      ),
    [report]
  );

  return (
<main className="reports-print-root min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-7">
        {/* Reports heading aur download actions */}
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Business intelligence
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Reports & Analytics
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
              Apne business ki sales, purchases aur expenses ko ek jagah
              track karo.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={downloadCSV}
              disabled={!report || loading}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ↓ Download CSV
            </button>

            <button
              onClick={downloadPDF}
              disabled={!report || loading}
              className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ↓ Save PDF
            </button>
          </div>
        </header>

        {/* Date filter panel */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="font-semibold">Report period</h2>
              <p className="mt-1 text-sm text-slate-500">
                Report ke liye date range select karo.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex">
              <label className="text-sm">
                <span className="mb-1 block font-medium text-slate-600">
                  Start date
                </span>
                <input
                  type="date"
                  value={startDate}
                  max={endDate || undefined}
                  onChange={(event) => setStartDate(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="text-sm">
                <span className="mb-1 block font-medium text-slate-600">
                  End date
                </span>
                <input
                  type="date"
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(event) => setEndDate(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <button
                onClick={loadReport}
                disabled={loading || !startDate || !endDate || startDate > endDate}
                className="self-end rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Loading..." : "Apply Filter"}
              </button>
            </div>
          </div>
        </section>

        {/* Error message */}
        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {error}
          </div>
        )}

        {/* Summary cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-xl font-bold text-slate-700">
                  {card.icon}
                </span>
              </div>

              <p className="mt-4 break-words text-2xl font-bold tracking-tight sm:text-3xl">
                {loading ? "..." : formatCurrency(card.value)}
              </p>

              <p className="mt-2 text-xs text-slate-500">
                {card.description}
              </p>
            </article>
          ))}
        </section>

        {/* Sales table */}
        <ReportTable
          title="Sales Report"
          description="Recent sales within the selected period."
          headers={["Product", "Quantity", "Date", "Amount"]}
          rows={(report?.sales || []).map((sale) => [
            sale.productName,
            sale.quantity,
            formatDate(sale.createdAt),
            formatCurrency(sale.totalAmount),
          ])}
          total={salesTotal}
          loading={loading}
        />

        {/* Purchases table */}
        <ReportTable
          title="Purchase Report"
          description="Inventory purchases and supplier details."
          headers={["Product", "Quantity", "Supplier", "Date", "Amount"]}
          rows={(report?.purchases || []).map((purchase) => [
            purchase.productName,
            purchase.quantity,
            purchase.supplier || "—",
            formatDate(purchase.createdAt),
            formatCurrency(purchase.totalAmount),
          ])}
          total={purchasesTotal}
          loading={loading}
        />

        {/* Expenses table */}
        <ReportTable
          title="Expense Report"
          description="Business expenses recorded in the selected period."
          headers={["Expense", "Category", "Date", "Amount"]}
          rows={(report?.expenses || []).map((expense) => [
            expense.title,
            expense.category,
            formatDate(expense.date),
            formatCurrency(expense.amount),
          ])}
          total={expensesTotal}
          loading={loading}
        />

        {/* Report calculation note */}
        <p className="text-xs leading-5 text-slate-500">
          Net Balance is calculated as Sales − Purchases − Expenses. It is a
          basic business balance, not a complete accounting profit calculation.
        </p>
      </div>

     
    </main>
  );
}

// Reusable table component: Sales, Purchases aur Expenses mein use hota hai
function ReportTable({ title, description, headers, rows, total, loading }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>

        <div className="rounded-xl bg-slate-50 px-4 py-2">
          <p className="text-xs text-slate-500">Report total</p>
          <p className="font-bold text-slate-900">
            {formatCurrency(total)}
          </p>
        </div>
      </div>

      {loading ? (
        <p className="p-6 text-sm text-slate-500">Loading report...</p>
      ) : rows.length === 0 ? (
        <p className="p-6 text-sm text-slate-500">
          Is date range mein koi record nahi mila.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                {headers.map((header) => (
                  <th key={header} className="px-5 py-3 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className="border-t border-slate-100 transition hover:bg-slate-50"
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="whitespace-nowrap px-5 py-4 text-slate-700"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
