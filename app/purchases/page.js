
// "use client";

// import { useEffect, useState } from "react";
// import styles from "./purchases.module.css";

// export default function PurchasesPage() {
//   // Purchase history, loading aur error ko manage karte hain.
//   const [purchases, setPurchases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Page open hone par API se purchase history load hogi.
//   useEffect(() => {
//     async function loadPurchases() {
//       try {
//         const response = await fetch("/api/purchases");
//         const data = await response.json();

//         if (!response.ok || !data.success) {
//           throw new Error(
//             data.message || "Purchase history load nahi hui."
//           );
//         }

//         setPurchases(data.purchases || []);
//       } catch (err) {
//         setError(err.message || "Kuch galat ho gaya.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadPurchases();
//   }, []);

//   return (
//     // IMPORTANT: CSS Module classes styles.className format mein hain.
//     <main className={styles.purchasePage}>
//       <header className={styles.purchaseHeader}>
//         <div>
//           <h1>Purchases</h1>
//           <p>
//             Manage purchases and track stock coming into your business.
//           </p>
//         </div>

//         <button
//           className={styles.purchaseButton}
//           onClick={() =>
//             alert("Next step mein purchase form banayenge.")
//           }
//         >
//           + Add Purchase
//         </button>
//       </header>

//       <section className={styles.purchaseCard}>
//         <h2>Purchase History</h2>

//         {loading ? (
//           <p>Loading purchases...</p>
//         ) : error ? (
//           <p className={styles.purchaseError}>{error}</p>
//         ) : purchases.length === 0 ? (
//           <div className={styles.purchaseEmpty}>
//             <h3>No purchases yet</h3>
//             <p>Your saved purchases will appear here.</p>
//           </div>
//         ) : (
//           <div className={styles.purchaseTableWrap}>
//             <table className={styles.purchaseTable}>
//               <thead>
//                 <tr>
//                   <th>Product</th>
//                   <th>Quantity</th>
//                   <th>Purchase Price</th>
//                   <th>Total</th>
//                   <th>Supplier</th>
//                   <th>Date</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {purchases.map((purchase) => (
//                   <tr key={purchase._id}>
//                     <td>{purchase.productName || "—"}</td>
//                     <td>{purchase.quantity}</td>
//                     <td>₹{purchase.purchasePrice}</td>
//                     <td>₹{purchase.totalAmount}</td>
//                     <td>{purchase.supplier || "—"}</td>
//                     <td>
//                       {purchase.createdAt
//                         ? new Date(
//                             purchase.createdAt
//                           ).toLocaleDateString("en-IN")
//                         : "—"}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </section>
//     </main>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import styles from "./purchases.module.css";

const initialForm = {
  productId: "",
  quantity: "1",
  purchasePrice: "",
  supplier: "",
  notes: "",
};

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Products aur purchase history ko API se load karna.
  async function loadData() {
    const [purchaseResponse, productResponse] = await Promise.all([
      fetch("/api/purchases"),
      fetch("/api/products"),
    ]);

    const purchaseData = await purchaseResponse.json();
    const productData = await productResponse.json();

    if (!purchaseResponse.ok || !purchaseData.success) {
      throw new Error(purchaseData.message || "Purchases load nahi hui.");
    }

    if (!productResponse.ok || !productData.success) {
      throw new Error(productData.message || "Products load nahi hue.");
    }

    setPurchases(purchaseData.purchases || []);
    setProducts(productData.products || []);
  }

  useEffect(() => {
    loadData()
      .catch((err) => setError(err.message || "Data load nahi hua."))
      .finally(() => setLoading(false));
  }, []);

  // Selected product ki price ko default purchase price banana.
  function handleProductChange(productId) {
    const selected = products.find((item) => item._id === productId);

    setForm((old) => ({
      ...old,
      productId,
      purchasePrice:
        selected && selected.price !== undefined
          ? String(selected.price)
          : "",
    }));
  }

  // Form submit hone par purchase API ko bhejna.
  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    const quantity = Number(form.quantity);
    const price = Number(form.purchasePrice);

    if (!form.productId) {
      setError("Pehle product select karo.");
      return;
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      setError("Quantity 1 ya usse zyada whole number honi chahiye.");
      return;
    }

    if (!Number.isFinite(price) || price < 0) {
      setError("Valid purchase price enter karo.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          quantity,
          purchasePrice: price,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Purchase save nahi hui.");
      }

      // Save ke baad history aur updated stock reload karna.
      await loadData();
      setForm(initialForm);
      setShowForm(false);
      setMessage("Purchase save ho gayi aur product stock update ho gaya.");
    } catch (err) {
      setError(err.message || "Purchase save nahi ho saki.");
    } finally {
      setSaving(false);
    }
  }

  const total =
    Math.max(0, Number(form.quantity) || 0) *
    Math.max(0, Number(form.purchasePrice) || 0);

  return (
    <main className={styles.purchasePage}>
      <header className={styles.purchaseHeader}>
        <div>
          <p className={styles.eyebrow}>INVENTORY MANAGEMENT</p>
          <h1>Purchases</h1>
          <p>Manage purchases and track stock coming into your business.</p>
        </div>

        <button
          type="button"
          className={styles.purchaseButton}
          onClick={() => {
            setError("");
            setMessage("");
            setShowForm((old) => !old);
          }}
        >
          {showForm ? "Cancel" : "+ Add Purchase"}
        </button>
      </header>

      {error && <div className={styles.purchaseError}>{error}</div>}
      {message && <div className={styles.purchaseSuccess}>{message}</div>}

      {showForm && (
        <section className={styles.purchaseCard}>
          <h2>Add New Purchase</h2>
          <p className={styles.formDescription}>
            Purchase details bharo. Save karne par product ka stock badhega.
          </p>

          <form onSubmit={handleSubmit} className={styles.purchaseForm}>
            <div className={styles.formField}>
              <label htmlFor="productId">Product *</label>
              <select
                id="productId"
                value={form.productId}
                onChange={(e) => handleProductChange(e.target.value)}
                required
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name} ({product.sku}) — Stock: {product.stock}
                  </option>
                ))}
              </select>
              {products.length === 0 && (
                <small>Pehle Products page par product add karo.</small>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="quantity">Quantity *</label>
              <input
                id="quantity"
                type="number"
                min="1"
                step="1"
                value={form.quantity}
                onChange={(e) =>
                  setForm({ ...form, quantity: e.target.value })
                }
                required
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="purchasePrice">Purchase Price per Unit (₹) *</label>
              <input
                id="purchasePrice"
                type="number"
                min="0"
                step="0.01"
                value={form.purchasePrice}
                onChange={(e) =>
                  setForm({ ...form, purchasePrice: e.target.value })
                }
                required
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="supplier">Supplier</label>
              <input
                id="supplier"
                type="text"
                placeholder="Supplier name (optional)"
                value={form.supplier}
                onChange={(e) =>
                  setForm({ ...form, supplier: e.target.value })
                }
              />
            </div>

            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                rows="3"
                placeholder="Additional details (optional)"
                value={form.notes}
                onChange={(e) =>
                  setForm({ ...form, notes: e.target.value })
                }
              />
            </div>

            <div className={`${styles.totalPreview} ${styles.fullWidth}`}>
              <span>Total Purchase Amount</span>
              <strong>
                {total.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 2,
                })}
              </strong>
            </div>

            <div className={`${styles.formActions} ${styles.fullWidth}`}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setShowForm(false)}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.purchaseButton}
                disabled={saving || products.length === 0}
              >
                {saving ? "Saving..." : "Save Purchase"}
              </button>
            </div>
          </form>
        </section>
      )}

      <section className={styles.purchaseCard}>
        <div className={styles.historyHeader}>
          <div>
            <h2>Purchase History</h2>
            <p>Saved purchase records</p>
          </div>
          <span className={styles.countBadge}>{purchases.length} records</span>
        </div>

        {loading ? (
          <p className={styles.statusText}>Loading purchases...</p>
        ) : purchases.length === 0 ? (
          <div className={styles.purchaseEmpty}>
            <h3>No purchases yet</h3>
            <p>Your saved purchases will appear here.</p>
            <button
              type="button"
              className={styles.purchaseButton}
              onClick={() => setShowForm(true)}
            >
              + Add First Purchase
            </button>
          </div>
        ) : (
          <div className={styles.purchaseTableWrap}>
            <table className={styles.purchaseTable}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                  <th>Supplier</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase) => (
                  <tr key={purchase._id}>
                    <td className={styles.productCell}>
                      {purchase.productName || "—"}
                    </td>
                    <td>{purchase.quantity}</td>
                    <td>₹{Number(purchase.purchasePrice || 0).toLocaleString("en-IN")}</td>
                    <td className={styles.amountCell}>
                      ₹{Number(purchase.totalAmount || 0).toLocaleString("en-IN")}
                    </td>
                    <td>{purchase.supplier || "—"}</td>
                    <td>
                      {purchase.createdAt
                        ? new Date(purchase.createdAt).toLocaleDateString("en-IN")
                        : "—"}
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
  