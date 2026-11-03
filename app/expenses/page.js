"use client";

import { useEffect, useState } from "react";

export default function ExpensesPage() {
  const [form, setForm] = useState({
    title: "",
    category: "General",
    amount: "",
    date: "",
    description: "",
  });

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  // Component load hone par MongoDB se expenses fetch honge.
  useEffect(() => {
    fetchExpenses();
  }, []);

  // API se expenses ki list mangwane ka function.
  async function fetchExpenses() {
    try {
      const response = await fetch("/api/expenses");
      const data = await response.json();

      if (data.success) {
        setExpenses(data.expenses || []);
      }
    } catch (error) {
      console.error("Expenses fetch error:", error);
    }
  }

  // Form ke input fields ki values update karne ka function.
  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Expense ko MongoDB mein save karne ka function.
  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Expense add nahi hua.");
      }

      setMessage("Expense successfully add ho gaya!");

      // Expense save hone ke baad form reset hoga.
      setForm({
        title: "",
        category: "General",
        amount: "",
        date: "",
        description: "",
      });

      // Latest expenses list dobara load hogi.
      await fetchExpenses();
    } catch (error) {
      setMessage(error.message || "Server se connect nahi ho paya.");
    } finally {
      setLoading(false);
    }
  }

  // Search ke according expenses filter honge.
  const filteredExpenses = expenses.filter((expense) => {
    const text = search.toLowerCase();

    return (
      expense.title?.toLowerCase().includes(text) ||
      expense.category?.toLowerCase().includes(text) ||
      expense.description?.toLowerCase().includes(text)
    );
  });

  // Saare expenses ka total amount calculate hoga.
  const totalExpense = expenses.reduce(
    (total, expense) => total + Number(expense.amount || 0),
    0
  );

  // Date ko safe format mein dikhane ke liye function.
  // Invalid date hone par page crash nahi hoga.
  function formatDate(dateValue) {
    if (!dateValue) return "-";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleDateString("en-IN");
  }

  return (
    <main className="mx-auto w-full max-w-[1400px] box-border p-4 text-slate-800 sm:p-6">
      {/* Page heading */}
      <div className="mb-7">
        <h1 className="mb-1 text-2xl font-bold sm:text-3xl">
          Expenses
        </h1>

        <p className="text-sm text-slate-500 sm:text-base">
          Apne business ke expenses manage karo.
        </p>
      </div>

      {/* Total expenses card */}
      <section className="mb-7 w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-sm font-medium text-slate-500">
          Total Expenses
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">
          ₹{totalExpense.toLocaleString("en-IN")}
        </h2>
      </section>

      {/* Add expense form */}
      <section className="mb-7 w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-6 text-xl font-bold sm:text-2xl">
          Add New Expense
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Expense title */}
            <div className="flex min-w-0 flex-col gap-2">
              <label
                htmlFor="expense-title"
                className="text-sm font-medium text-slate-700"
              >
                Expense Title *
              </label>

              <input
                id="expense-title"
                name="title"
                type="text"
                placeholder="Enter expense title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full min-w-0 rounded-lg border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Expense category */}
            <div className="flex min-w-0 flex-col gap-2">
              <label
                htmlFor="expense-category"
                className="text-sm font-medium text-slate-700"
              >
                Category *
              </label>

              <select
                id="expense-category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full min-w-0 rounded-lg border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option>General</option>
                <option>Rent</option>
                <option>Salary</option>
                <option>Electricity</option>
                <option>Transport</option>
                <option>Marketing</option>
                <option>Office Supplies</option>
                <option>Other</option>
              </select>
            </div>

            {/* Expense amount */}
            <div className="flex min-w-0 flex-col gap-2">
              <label
                htmlFor="expense-amount"
                className="text-sm font-medium text-slate-700"
              >
                Amount (₹) *
              </label>

              <input
                id="expense-amount"
                name="amount"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Enter amount"
                value={form.amount}
                onChange={handleChange}
                required
                className="w-full min-w-0 rounded-lg border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Expense date */}
            <div className="flex min-w-0 flex-col gap-2">
              <label
                htmlFor="expense-date"
                className="text-sm font-medium text-slate-700"
              >
                Date *
              </label>

              <input
                id="expense-date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full min-w-0 rounded-lg border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Expense description */}
            <div className="flex min-w-0 flex-col gap-2 md:col-span-2">
              <label
                htmlFor="expense-description"
                className="text-sm font-medium text-slate-700"
              >
                Description
              </label>

              <textarea
                id="expense-description"
                name="description"
                placeholder="Enter description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                className="w-full min-w-0 resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {loading ? "Saving..." : "Add Expense"}
          </button>
        </form>

        {/* Success ya error message */}
        {message && (
          <p className="mt-4 text-sm font-medium text-slate-700">
            {message}
          </p>
        )}
      </section>

      {/* Expense list */}
      <section className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-5 text-xl font-bold sm:text-2xl">
          Expense List
        </h2>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search by title, category or description..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="mb-5 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />

        {/* Empty state ya expenses table */}
        {filteredExpenses.length === 0 ? (
          <p className="py-4 text-sm text-slate-500">
            {search
              ? "Koi matching expense nahi mila."
              : "Abhi koi expense add nahi hua."}
          </p>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="whitespace-nowrap border-b border-slate-300 p-3 text-sm font-semibold">
                    Title
                  </th>

                  <th className="whitespace-nowrap border-b border-slate-300 p-3 text-sm font-semibold">
                    Category
                  </th>

                  <th className="whitespace-nowrap border-b border-slate-300 p-3 text-sm font-semibold">
                    Date
                  </th>

                  <th className="border-b border-slate-300 p-3 text-sm font-semibold">
                    Description
                  </th>

                  <th className="whitespace-nowrap border-b border-slate-300 p-3 text-sm font-semibold">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredExpenses.map((expense) => (
                  <tr
                    key={expense._id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="border-b border-slate-200 p-3 text-sm">
                      {expense.title}
                    </td>

                    <td className="border-b border-slate-200 p-3 text-sm">
                      {expense.category}
                    </td>

                    <td className="whitespace-nowrap border-b border-slate-200 p-3 text-sm">
                      {formatDate(expense.date)}
                    </td>

                    <td className="border-b border-slate-200 p-3 text-sm">
                      {expense.description || "-"}
                    </td>

                    <td className="whitespace-nowrap border-b border-slate-200 p-3 text-sm font-medium">
                      ₹{Number(expense.amount || 0).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}