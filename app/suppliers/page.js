
"use client";

import { useEffect, useState } from "react";

export default function SuppliersPage() {
  // Supplier form ke fields ka data
  const [form, setForm] = useState({
    name: "",
    supplierCode: "",
    phone: "",
    email: "",
    address: "",
    status: "Active",
  });

  // MongoDB se aane wali suppliers list
  const [suppliers, setSuppliers] = useState([]);

  // Loading aur message handle karne ke liye
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Page load hote hi suppliers fetch karna
  useEffect(() => {
    fetchSuppliers();
  }, []);

  async function fetchSuppliers() {
    try {
      const response = await fetch("/api/suppliers");
      const data = await response.json();

      if (data.success) {
        setSuppliers(data.suppliers);
      }
    } catch (error) {
      console.error("Suppliers fetch error:", error);
    }
  }

  // Input field change hone par state update karna
  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // Form submit karke supplier MongoDB mein save karna
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/suppliers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Supplier successfully add ho gaya!");

        // Form clear karna
        setForm({
          name: "",
          supplierCode: "",
          phone: "",
          email: "",
          address: "",
          status: "Active",
        });

        // Updated suppliers list load karna
        fetchSuppliers();
      } else {
        setMessage(data.message || "Supplier add nahi hua");
      }
    } catch (error) {
      setMessage("Server se connect nahi ho paya");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "24px", maxWidth: "1000px", margin: "auto" }}>
      <h1>Suppliers Management</h1>
      <p>Add aur manage your business suppliers.</p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "12px",
          maxWidth: "600px",
          marginTop: "24px",
        }}
      >
        <input
          name="name"
          placeholder="Supplier / Company Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="supplierCode"
          placeholder="Supplier Code (e.g. SUP001)"
          value={form.supplierCode}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Supplier Address"
          value={form.address}
          onChange={handleChange}
          rows={3}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Supplier"}
        </button>
      </form>

      {message && <p>{message}</p>}

      <h2 style={{ marginTop: "32px" }}>Supplier List</h2>

      {suppliers.length === 0 ? (
        <p>No suppliers added yet.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            border="1"
            cellPadding="10"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier._id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.supplierCode}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
