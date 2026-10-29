
// "use client";

// import { useState } from "react";

// const menuItems = [
//   { name: "Dashboard", icon: "◫" },
//   { name: "Products", icon: "▦" },
//   { name: "Sales", icon: "↗" },
//   { name: "Purchases", icon: "↙" },
//   { name: "Customers", icon: "♙" },
//   { name: "Suppliers", icon: "♧" },
//   { name: "Expenses", icon: "₹" },
//   { name: "Reports", icon: "▤" },
// ];

// const transactions = [
//   { id: "INV-1001", customer: "Rahul Sharma", date: "18 Oct 2026", amount: "₹12,500", status: "Paid" },
//   { id: "INV-1002", customer: "Priya Singh", date: "17 Oct 2026", amount: "₹8,200", status: "Pending" },
//   { id: "INV-1003", customer: "Aman Verma", date: "17 Oct 2026", amount: "₹5,600", status: "Paid" },
//   { id: "INV-1004", customer: "Neha Gupta", date: "16 Oct 2026", amount: "₹3,900", status: "Paid" },
// ];

// export default function Home() {
//   const [active, setActive] = useState("Dashboard");
//     // 📌 PRODUCTS KA DATA
//   // Abhi products React state mein rahenge.
//   // Product add ya delete karne par screen turant update hogi.
//   // Page refresh karne par ye demo data reset ho jayega.
//   const [products, setProducts] = useState([
//     {
//       id: 1,
//       name: "Wireless Mouse",
//       sku: "WM-001",
//       category: "Accessories",
//       price: 599,
//       stock: 3,
//     },
//     {
//       id: 2,
//       name: "USB Keyboard",
//       sku: "KB-002",
//       category: "Accessories",
//       price: 899,
//       stock: 15,
//     },
//   ]);

//   // 📌 FORM KE INPUTS KI VALUES
//   // In states mein user ke dwara bhari gayi product details rahengi.
//   const [productName, setProductName] = useState("");
//   const [productSku, setProductSku] = useState("");
//   const [productCategory, setProductCategory] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const [productStock, setProductStock] = useState("");

//   // 📌 FORM SUBMIT KARNE PAR PRODUCT ADD HOGA
//   function handleAddProduct(event) {
//     // Form submit hone par browser refresh hone se rokta hai.
//     event.preventDefault();

//     // Khali naam ya SKU ke saath product add nahi hone denge.
//     if (!productName.trim() || !productSku.trim()) {
//       alert("Product name aur SKU bharna zaroori hai.");
//       return;
//     }

//     // Naye product ka object bana rahe hain.
//     const newProduct = {
//       id: Date.now(), // Demo ke liye unique ID.
//       name: productName.trim(),
//       sku: productSku.trim(),
//       category: productCategory.trim() || "Uncategorized",
//       price: Number(productPrice) || 0,
//       stock: Number(productStock) || 0,
//     };

//     // Purani list mein naya product add karte hain.
//     setProducts((currentProducts) => [
//       ...currentProducts,
//       newProduct,
//     ]);

//     // Product add hone ke baad form khaali kar dete hain.
//     setProductName("");
//     setProductSku("");
//     setProductCategory("");
//     setProductPrice("");
//     setProductStock("");
//   }

//   // 📌 PRODUCT DELETE KARNE KA FUNCTION
//   function handleDeleteProduct(id) {
//     // Jis product ki ID match hogi, use list se hata denge.
//     setProducts((currentProducts) =>
//       currentProducts.filter((product) => product.id !== id)
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-800">
//       <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-slate-200 bg-white p-5 md:flex">
//         <div className="mb-10 flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">B</div>
//           <div>
//             <h1 className="text-xl font-bold">BizPilot</h1>
//             <p className="text-xs text-slate-500">Business management</p>
//           </div>
//         </div>

//         <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Workspace</p>
//         <nav className="space-y-1">
//           {menuItems.map((item) => (
//             <button
//               key={item.name}
//               onClick={() => setActive(item.name)}
//               className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
//                 active === item.name
//                   ? "bg-blue-600 text-white shadow-md shadow-blue-100"
//                   : "text-slate-600 hover:bg-slate-100"
//               }`}
//             >
//               <span className="w-5 text-lg">{item.icon}</span>
//               {item.name}
//             </button>
//           ))}
//         </nav>

//         <div className="mt-auto rounded-2xl bg-blue-50 p-4">
//           <p className="font-semibold text-blue-900">Need help?</p>
//           <p className="mt-1 text-xs leading-5 text-blue-700">Manage your business from one simple workspace.</p>
//         </div>
//       </aside>

//       <main className="min-h-screen md:ml-64">
//         <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur md:px-8">
//           <div>
//             <p className="text-sm text-slate-500">Workspace / {active}</p>
//             <h2 className="mt-1 text-xl font-bold md:text-2xl">{active}</h2>
//           </div>
//           <div className="flex items-center gap-3">
//             <button aria-label="Notifications" className="rounded-xl border border-slate-200 px-3 py-2">♧</button>
//             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">A</div>
//           </div>
//         </header>

//         <div className="p-5 md:p-8">
//           {active === "Dashboard" ? (
//             <>
//               <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
//                 <div>
//                   <h3 className="text-lg font-bold">Business overview</h3>
//                   <p className="mt-1 text-sm text-slate-500">Here is what is happening with your business.</p>
//                 </div>
//                 <button onClick={() => window.print()} className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
//                   Export / Print
//                 </button>
//               </div>

//               <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//                 {[
//                   { label: "Total Sales", value: "₹1,24,500", change: "+12.5%", icon: "↗" },
//                   { label: "Total Products", value: "248", change: "Across inventory", icon: "▦" },
//                   { label: "Customers", value: "186", change: "+8 this month", icon: "♙" },
//                   { label: "Low Stock Items", value: "7", change: "Needs attention", icon: "!" },
//                 ].map((card) => (
//                   <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm text-slate-500">{card.label}</p>
//                       <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-600">{card.icon}</span>
//                     </div>
//                     <p className="mt-4 text-2xl font-bold tracking-tight">{card.value}</p>
//                     <p className="mt-2 text-xs font-medium text-emerald-600">{card.change}</p>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-7 grid gap-6 xl:grid-cols-3">
//                 <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="font-bold">Sales overview</h3>
//                       <p className="mt-1 text-sm text-slate-500">Sample weekly sales data</p>
//                     </div>
//                     <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium">This week</span>
//                   </div>
//                   <div className="mt-8 flex h-48 items-end justify-between gap-3">
//                     {[
//                       { day: "Mon", height: "45%" },
//                       { day: "Tue", height: "70%" },
//                       { day: "Wed", height: "55%" },
//                       { day: "Thu", height: "85%" },
//                       { day: "Fri", height: "62%" },
//                       { day: "Sat", height: "100%" },
//                       { day: "Sun", height: "76%" },
//                     ].map((bar) => (
//                       <div key={bar.day} className="flex h-full flex-1 flex-col items-center justify-end gap-3">
//                         <div className="flex h-full w-full items-end">
//                           <div title={bar.day} style={{ height: bar.height }} className="w-full rounded-t-lg bg-blue-500 transition hover:bg-blue-700" />
//                         </div>
//                         <span className="text-xs text-slate-500">{bar.day}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </section>

//                 <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//                   <h3 className="font-bold">Inventory alerts</h3>
//                   <p className="mt-1 text-sm text-slate-500">Items running low</p>
//                   <div className="mt-5 space-y-4">
//                     {[
//                       { name: "Wireless Mouse", stock: "3 left" },
//                       { name: "USB Keyboard", stock: "5 left" },
//                       { name: "USB-C Cable", stock: "2 left" },
//                     ].map((item) => (
//                       <div key={item.name} className="flex items-center justify-between gap-2">
//                         <div className="flex items-center gap-3">
//                           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">▦</div>
//                           <span className="text-sm font-medium">{item.name}</span>
//                         </div>
//                         <span className="whitespace-nowrap rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">{item.stock}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </section>
//               </div>

//               <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//                 <div className="flex items-center justify-between p-5">
//                   <div>
//                     <h3 className="font-bold">Recent transactions</h3>
//                     <p className="mt-1 text-sm text-slate-500">Latest sample invoices</p>
//                   </div>
//                   <button onClick={() => setActive("Sales")} className="text-sm font-semibold text-blue-600 hover:text-blue-800">View sales →</button>
//                 </div>
//                 <div className="overflow-x-auto">
//                   <table className="w-full min-w-[600px] text-left text-sm">
//                     <thead className="bg-slate-50 text-xs uppercase text-slate-500">
//                       <tr>
//                         <th className="px-5 py-3 font-semibold">Invoice</th>
//                         <th className="px-5 py-3 font-semibold">Customer</th>
//                         <th className="px-5 py-3 font-semibold">Date</th>
//                         <th className="px-5 py-3 font-semibold">Amount</th>
//                         <th className="px-5 py-3 font-semibold">Status</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-slate-100">
//                       {transactions.map((row) => (
//                         <tr key={row.id} className="hover:bg-slate-50">
//                           <td className="px-5 py-4 font-semibold">{row.id}</td>
//                           <td className="px-5 py-4">{row.customer}</td>
//                           <td className="px-5 py-4 text-slate-500">{row.date}</td>
//                           <td className="px-5 py-4 font-semibold">{row.amount}</td>
//                           <td className="px-5 py-4">
//                             <span className={`rounded-full px-3 py-1 text-xs font-semibold ${row.status === "Paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
//                               {row.status}
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </section>
//               <p className="mt-5 text-center text-xs text-slate-400">BizPilot · Demo dashboard — figures shown are sample data.</p>
//             </>
//           ) : (
//             <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
//               <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
//                 {menuItems.find((item) => item.name === active)?.icon}
//               </div>
//               <h3 className="text-xl font-bold">{active}</h3>
//               <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
//                 The {active.toLowerCase()} module is ready for the next development step. We will add working forms and data storage next.
//               </p>
//               <button onClick={() => setActive("Dashboard")} className="mt-6 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
//                 Back to Dashboard
//               </button>
//             </section>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }


// "use client";

// // BizPilot - Business Management Dashboard
// // Ye demo app Products ko browser ke localStorage mein save karti hai.

// import { useEffect, useState } from "react";

// const menuItems = [
//   { name: "Dashboard", icon: "◫" },
//   { name: "Products", icon: "▦" },
//   { name: "Sales", icon: "↗" },
//   { name: "Purchases", icon: "↙" },
//   { name: "Customers", icon: "♙" },
//   { name: "Suppliers", icon: "♧" },
//   { name: "Expenses", icon: "₹" },
//   { name: "Reports", icon: "▤" },
// ];

// const transactions = [
//   { id: "INV-1001", customer: "Rahul Sharma", date: "18 Oct 2026", amount: 12500, status: "Paid" },
//   { id: "INV-1002", customer: "Priya Singh", date: "17 Oct 2026", amount: 8200, status: "Pending" },
//   { id: "INV-1003", customer: "Aman Verma", date: "17 Oct 2026", amount: 5600, status: "Paid" },
//   { id: "INV-1004", customer: "Neha Gupta", date: "16 Oct 2026", amount: 3900, status: "Paid" },
// ];

// const emptyForm = {
//   name: "",
//   sku: "",
//   category: "",
//   price: "",
//   stock: "",
// };

// // Indian Rupees format karne ke liye helper function.
// function formatCurrency(amount) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 2,
//   }).format(Number(amount) || 0);
// }

// export default function Home() {
//   const [active, setActive] = useState("Dashboard");

//   const [products, setProducts] = useState([
//     {
//       id: 1,
//       name: "Wireless Mouse",
//       sku: "WM-001",
//       category: "Accessories",
//       price: 599,
//       stock: 3,
//     },
//     {
//       id: 2,
//       name: "USB Keyboard",
//       sku: "KB-002",
//       category: "Accessories",
//       price: 899,
//       stock: 15,
//     },
//   ]);

//   const [form, setForm] = useState(emptyForm);
//   const [editingId, setEditingId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("success");
//   const [storageReady, setStorageReady] = useState(false);

//   // Browser se saved products load karte hain.
//   useEffect(() => {
//     try {
//       const saved = localStorage.getItem("bizpilot-products-v1");

//       if (saved) {
//         const parsed = JSON.parse(saved);

//         if (Array.isArray(parsed)) {
//           setProducts(parsed);
//         }
//       }
//     } catch {
//       setMessage("Saved products load nahi ho sake.");
//       setMessageType("error");
//     } finally {
//       setStorageReady(true);
//     }
//   }, []);

//   // Products change hone par localStorage mein save karte hain.
//   useEffect(() => {
//     if (!storageReady) return;

//     try {
//       localStorage.setItem(
//         "bizpilot-products-v1",
//         JSON.stringify(products)
//       );
//     } catch {
//       setMessage("Data browser mein save nahi ho saka.");
//       setMessageType("error");
//     }
//   }, [products, storageReady]);

//   // Form ke input ki value update karte hain.
//   function handleChange(event) {
//     const { name, value } = event.target;

//     setForm((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//   }

//   // Product add ya update karne ka function.
//   function handleSubmit(event) {
//     event.preventDefault();
//     setMessage("");

//     const name = form.name.trim();
//     const sku = form.sku.trim();
//     const price = Number(form.price || 0);
//     const stock = Number(form.stock || 0);

//     if (!name || !sku) {
//       setMessage("Product name aur SKU zaroori hain.");
//       setMessageType("error");
//       return;
//     }

//     if (!Number.isFinite(price) || price < 0) {
//       setMessage("Price zero ya usse zyada hona chahiye.");
//       setMessageType("error");
//       return;
//     }

//     if (!Number.isInteger(stock) || stock < 0) {
//       setMessage("Stock zero ya positive whole number hona chahiye.");
//       setMessageType("error");
//       return;
//     }

//     const duplicate = products.some(
//       (product) =>
//         product.sku.toLowerCase() === sku.toLowerCase() &&
//         product.id !== editingId
//     );

//     if (duplicate) {
//       setMessage("Ye SKU pehle se use ho raha hai.");
//       setMessageType("error");
//       return;
//     }

//     const productData = {
//       name,
//       sku,
//       category: form.category.trim() || "Uncategorized",
//       price,
//       stock,
//     };

//     if (editingId !== null) {
//       setProducts((previous) =>
//         previous.map((product) =>
//           product.id === editingId
//             ? { ...product, ...productData }
//             : product
//         )
//       );

//       setMessage("Product update ho gaya.");
//     } else {
//       setProducts((previous) => [
//         ...previous,
//         { id: Date.now(), ...productData },
//       ]);

//       setMessage("Product add ho gaya.");
//     }

//     setMessageType("success");
//     setForm(emptyForm);
//     setEditingId(null);
//   }

//   // Selected product ko edit karne ke liye form mein load karte hain.
//   function handleEdit(product) {
//     setEditingId(product.id);

//     setForm({
//       name: product.name,
//       sku: product.sku,
//       category: product.category,
//       price: String(product.price),
//       stock: String(product.stock),
//     });

//     setMessage("");
//     setActive("Products");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }

//   // Delete karne se pehle confirmation lete hain.
//   function handleDelete(product) {
//     if (!window.confirm(`"${product.name}" ko delete karna hai?`)) {
//       return;
//     }

//     setProducts((previous) =>
//       previous.filter((item) => item.id !== product.id)
//     );

//     if (editingId === product.id) {
//       setEditingId(null);
//       setForm(emptyForm);
//     }

//     setMessage("Product delete ho gaya.");
//     setMessageType("success");
//   }

//   function cancelEdit() {
//     setEditingId(null);
//     setForm(emptyForm);
//     setMessage("");
//   }

//   // Name, SKU aur category ke basis par product search hota hai.
//   const filteredProducts = products.filter((product) => {
//     const query = searchTerm.trim().toLowerCase();

//     return (
//       product.name.toLowerCase().includes(query) ||
//       product.sku.toLowerCase().includes(query) ||
//       product.category.toLowerCase().includes(query)
//     );
//   });

//   const lowStockCount = products.filter(
//     (product) => product.stock <= 5
//   ).length;

//   const inventoryValue = products.reduce(
//     (total, product) => total + product.price * product.stock,
//     0
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-800">
//       {/* Desktop sidebar */}
//       <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-slate-200 bg-white p-5 md:flex">
//         <div className="mb-10 flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
//             B
//           </div>

//           <div>
//             <h1 className="text-xl font-bold">BizPilot</h1>
//             <p className="text-xs text-slate-500">
//               Business management
//             </p>
//           </div>
//         </div>

//         <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
//           Workspace
//         </p>

//         <nav className="space-y-1" aria-label="Main navigation">
//           {menuItems.map((item) => (
//             <button
//               key={item.name}
//               type="button"
//               onClick={() => setActive(item.name)}
//               className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
//                 active === item.name
//                   ? "bg-blue-600 text-white shadow-md"
//                   : "text-slate-600 hover:bg-slate-100"
//               }`}
//             >
//               <span className="text-lg">{item.icon}</span>
//               {item.name}
//             </button>
//           ))}
//         </nav>

//         <div className="mt-auto rounded-2xl bg-blue-50 p-4">
//           <p className="font-semibold text-blue-900">
//             BizPilot Starter
//           </p>
//           <p className="mt-1 text-xs leading-5 text-blue-700">
//             Apne business ko ek jagah manage karein.
//           </p>
//         </div>
//       </aside>

//       {/* Main content */}
//       <main className="min-h-screen md:ml-64">
//         {/* Top header */}
//         <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
//           <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//             <div>
//               <p className="text-sm text-slate-500">
//                 Workspace / {active}
//               </p>
//               <h2 className="mt-1 text-2xl font-bold">
//                 {active === "Dashboard" ? "Dashboard" : active}
//               </h2>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="hidden text-right sm:block">
//                 <p className="text-sm font-semibold">Admin User</p>
//                 <p className="text-xs text-slate-500">
//                   Business owner
//                 </p>
//               </div>

//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
//                 A
//               </div>
//             </div>
//           </div>

//           {/* Mobile navigation */}
//           <nav
//             className="mt-4 flex gap-2 overflow-x-auto pb-1 md:hidden"
//             aria-label="Mobile navigation"
//           >
//             {menuItems.map((item) => (
//               <button
//                 key={item.name}
//                 type="button"
//                 onClick={() => setActive(item.name)}
//                 className={`shrink-0 rounded-xl px-3 py-2 text-sm font-medium ${
//                   active === item.name
//                     ? "bg-blue-600 text-white"
//                     : "bg-slate-100 text-slate-600"
//                 }`}
//               >
//                 {item.name}
//               </button>
//             ))}
//           </nav>
//         </header>

//         <div className="p-4 sm:p-6 lg:p-8">
//           {active === "Products" ? (
//             <>
//               {/* Products form */}
//               <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
//                 <div className="mb-5">
//                   <h3 className="text-lg font-bold">
//                     {editingId !== null
//                       ? "Edit Product"
//                       : "Add New Product"}
//                   </h3>

//                   <p className="mt-1 text-sm text-slate-500">
//                     Product details aur inventory quantity manage karein.
//                   </p>
//                 </div>

//                 {message && (
//                   <div
//                     role="status"
//                     className={`mb-4 rounded-xl p-3 text-sm ${
//                       messageType === "error"
//                         ? "bg-red-50 text-red-700"
//                         : "bg-emerald-50 text-emerald-700"
//                     }`}
//                   >
//                     {message}
//                   </div>
//                 )}

//                 <form onSubmit={handleSubmit}>
//                   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
//                     <div>
//                       <label
//                         htmlFor="product-name"
//                         className="mb-2 block text-sm font-medium"
//                       >
//                         Product Name *
//                       </label>

//                       <input
//                         id="product-name"
//                         name="name"
//                         value={form.name}
//                         onChange={handleChange}
//                         placeholder="Wireless Mouse"
//                         required
//                         className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                       />
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="product-sku"
//                         className="mb-2 block text-sm font-medium"
//                       >
//                         SKU *
//                       </label>

//                       <input
//                         id="product-sku"
//                         name="sku"
//                         value={form.sku}
//                         onChange={handleChange}
//                         placeholder="WM-001"
//                         required
//                         className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                       />
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="product-category"
//                         className="mb-2 block text-sm font-medium"
//                       >
//                         Category
//                       </label>

//                       <input
//                         id="product-category"
//                         name="category"
//                         value={form.category}
//                         onChange={handleChange}
//                         placeholder="Accessories"
//                         className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                       />
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="product-price"
//                         className="mb-2 block text-sm font-medium"
//                       >
//                         Selling Price (₹)
//                       </label>

//                       <input
//                         id="product-price"
//                         name="price"
//                         type="number"
//                         min="0"
//                         step="0.01"
//                         value={form.price}
//                         onChange={handleChange}
//                         placeholder="599"
//                         className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                       />
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="product-stock"
//                         className="mb-2 block text-sm font-medium"
//                       >
//                         Stock Quantity
//                       </label>

//                       <input
//                         id="product-stock"
//                         name="stock"
//                         type="number"
//                         min="0"
//                         step="1"
//                         value={form.stock}
//                         onChange={handleChange}
//                         placeholder="10"
//                         className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                       />
//                     </div>
//                   </div>

//                   <div className="mt-5 flex flex-wrap gap-3">
//                     <button
//                       type="submit"
//                       className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
//                     >
//                       {editingId !== null
//                         ? "Update Product"
//                         : "Add Product"}
//                     </button>

//                     {editingId !== null && (
//                       <button
//                         type="button"
//                         onClick={cancelEdit}
//                         className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold hover:bg-slate-50"
//                       >
//                         Cancel
//                       </button>
//                     )}
//                   </div>
//                 </form>
//               </section>

//               {/* Inventory summary cards */}
//               <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
//                 <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//                   <p className="text-sm text-slate-500">
//                     Total Products
//                   </p>
//                   <p className="mt-2 text-3xl font-bold">
//                     {products.length}
//                   </p>
//                 </div>

//                 <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//                   <p className="text-sm text-slate-500">
//                     Inventory Value
//                   </p>
//                   <p className="mt-2 break-words text-2xl font-bold">
//                     {formatCurrency(inventoryValue)}
//                   </p>
//                 </div>

//                 <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//                   <p className="text-sm text-slate-500">
//                     Low Stock Items
//                   </p>
//                   <p className="mt-2 text-3xl font-bold text-amber-600">
//                     {lowStockCount}
//                   </p>
//                 </div>
//               </section>

//               {/* Product table */}
//               <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//                 <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
//                   <div>
//                     <h3 className="text-lg font-bold">
//                       Inventory List
//                     </h3>
//                     <p className="mt-1 text-sm text-slate-500">
//                       Apne products ko search aur manage karein.
//                     </p>
//                   </div>

//                   <input
//                     type="search"
//                     value={searchTerm}
//                     onChange={(event) =>
//                       setSearchTerm(event.target.value)
//                     }
//                     placeholder="Search products..."
//                     aria-label="Search products"
//                     className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 sm:max-w-xs"
//                   />
//                 </div>

//                 <div className="overflow-x-auto">
//                   <table className="w-full min-w-[760px] text-left text-sm">
//                     <thead className="bg-slate-50 text-xs uppercase text-slate-500">
//                       <tr>
//                         <th className="px-5 py-4 font-semibold">
//                           Product
//                         </th>
//                         <th className="px-5 py-4 font-semibold">SKU</th>
//                         <th className="px-5 py-4 font-semibold">
//                           Category
//                         </th>
//                         <th className="px-5 py-4 font-semibold">Price</th>
//                         <th className="px-5 py-4 font-semibold">Stock</th>
//                         <th className="px-5 py-4 font-semibold">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>

//                     <tbody className="divide-y divide-slate-100">
//                       {filteredProducts.map((product) => (
//                         <tr
//                           key={product.id}
//                           className="transition hover:bg-slate-50"
//                         >
//                           <td className="px-5 py-4 font-semibold">
//                             {product.name}
//                           </td>

//                           <td className="px-5 py-4 text-slate-500">
//                             {product.sku}
//                           </td>

//                           <td className="px-5 py-4">
//                             {product.category}
//                           </td>

//                           <td className="px-5 py-4 font-medium">
//                             {formatCurrency(product.price)}
//                           </td>

//                           <td className="px-5 py-4">
//                             <span
//                               className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
//                                 product.stock <= 5
//                                   ? "bg-red-50 text-red-700"
//                                   : "bg-emerald-50 text-emerald-700"
//                               }`}
//                             >
//                               {product.stock} units
//                             </span>
//                           </td>

//                           <td className="px-5 py-4">
//                             <div className="flex gap-2">
//                               <button
//                                 type="button"
//                                 onClick={() => handleEdit(product)}
//                                 className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100"
//                               >
//                                 Edit
//                               </button>

//                               <button
//                                 type="button"
//                                 onClick={() => handleDelete(product)}
//                                 className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
//                               >
//                                 Delete
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}

//                       {filteredProducts.length === 0 && (
//                         <tr>
//                           <td
//                             colSpan={6}
//                             className="px-5 py-12 text-center text-slate-500"
//                           >
//                             Koi product nahi mila.
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="border-t border-slate-100 px-5 py-4 text-sm text-slate-500">
//                   Showing {filteredProducts.length} of {products.length} products
//                 </div>
//               </section>
//             </>
//           ) : active === "Dashboard" ? (
//             <>
//               {/* Dashboard heading */}
//               <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
//                 <div>
//                   <h3 className="text-lg font-bold">
//                     Business overview
//                   </h3>
//                   <p className="mt-1 text-sm text-slate-500">
//                     Here is what is happening with your business.
//                   </p>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => window.print()}
//                   className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
//                 >
//                   Export / Print
//                 </button>
//               </div>

//               {/* Dashboard cards */}
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//                 {[
//                   {
//                     label: "Total Sales",
//                     value: formatCurrency(124500),
//                     detail: "Sample data",
//                     icon: "↗",
//                   },
//                   {
//                     label: "Total Products",
//                     value: String(products.length),
//                     detail: "Current inventory",
//                     icon: "▦",
//                   },
//                   {
//                     label: "Inventory Value",
//                     value: formatCurrency(inventoryValue),
//                     detail: "Price × stock",
//                     icon: "₹",
//                   },
//                   {
//                     label: "Low Stock Items",
//                     value: String(lowStockCount),
//                     detail: "5 units or fewer",
//                     icon: "!",
//                   },
//                 ].map((card) => (
//                   <div
//                     key={card.label}
//                     className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
//                   >
//                     <div className="flex items-center justify-between gap-2">
//                       <p className="text-sm text-slate-500">
//                         {card.label}
//                       </p>
//                       <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-600">
//                         {card.icon}
//                       </span>
//                     </div>

//                     <p className="mt-4 break-words text-2xl font-bold">
//                       {card.value}
//                     </p>

//                     <p className="mt-2 text-xs text-slate-500">
//                       {card.detail}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* Weekly sales chart */}
//               <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-3">
//                 <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
//                   <h3 className="font-bold">Sales overview</h3>
//                   <p className="mt-1 text-sm text-slate-500">
//                     Sample weekly sales data
//                   </p>

//                   <div className="mt-8 flex h-48 items-end justify-between gap-3">
//                     {[
//                       { day: "Mon", height: "45%" },
//                       { day: "Tue", height: "70%" },
//                       { day: "Wed", height: "55%" },
//                       { day: "Thu", height: "85%" },
//                       { day: "Fri", height: "62%" },
//                       { day: "Sat", height: "100%" },
//                       { day: "Sun", height: "76%" },
//                     ].map((bar) => (
//                       <div
//                         key={bar.day}
//                         className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-3"
//                       >
//                         <div className="flex h-full w-full items-end">
//                           <div
//                             title={`${bar.day}: sample`}
//                             style={{ height: bar.height }}
//                             className="w-full rounded-t-lg bg-blue-500 transition hover:bg-blue-700"
//                           />
//                         </div>

//                         <span className="text-xs text-slate-500">
//                           {bar.day}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </section>

//                 {/* Low stock alerts */}
//                 <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//                   <h3 className="font-bold">Inventory alerts</h3>
//                   <p className="mt-1 text-sm text-slate-500">
//                     Items with 5 or fewer units
//                   </p>

//                   <div className="mt-5 space-y-4">
//                     {products.filter((product) => product.stock <= 5)
//                       .length === 0 ? (
//                       <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">
//                         Abhi low-stock product nahi hai.
//                       </p>
//                     ) : (
//                       products
//                         .filter((product) => product.stock <= 5)
//                         .slice(0, 5)
//                         .map((product) => (
//                           <div
//                             key={product.id}
//                             className="flex items-center justify-between gap-3"
//                           >
//                             <div className="flex min-w-0 items-center gap-3">
//                               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
//                                 ▦
//                               </div>

//                               <span className="truncate text-sm font-medium">
//                                 {product.name}
//                               </span>
//                             </div>

//                             <span className="whitespace-nowrap rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
//                               {product.stock} left
//                             </span>
//                           </div>
//                         ))
//                     )}

//                     <button
//                       type="button"
//                       onClick={() => setActive("Products")}
//                       className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold hover:bg-slate-50"
//                     >
//                       Manage inventory
//                     </button>
//                   </div>
//                 </section>
//               </div>

//               {/* Recent transactions */}
//               <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//                 <div className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
//                   <div>
//                     <h3 className="font-bold">Recent transactions</h3>
//                     <p className="mt-1 text-sm text-slate-500">
//                       Sample invoices only
//                     </p>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={() => setActive("Sales")}
//                     className="text-left text-sm font-semibold text-blue-600 hover:text-blue-800"
//                   >
//                     View sales →
//                   </button>
//                 </div>

//                 <div className="overflow-x-auto">
//                   <table className="w-full min-w-[600px] text-left text-sm">
//                     <thead className="bg-slate-50 text-xs uppercase text-slate-500">
//                       <tr>
//                         <th className="px-5 py-3 font-semibold">Invoice</th>
//                         <th className="px-5 py-3 font-semibold">Customer</th>
//                         <th className="px-5 py-3 font-semibold">Date</th>
//                         <th className="px-5 py-3 font-semibold">Amount</th>
//                         <th className="px-5 py-3 font-semibold">Status</th>
//                       </tr>
//                     </thead>

//                     <tbody className="divide-y divide-slate-100">
//                       {transactions.map((row) => (
//                         <tr key={row.id} className="hover:bg-slate-50">
//                           <td className="px-5 py-4 font-semibold">
//                             {row.id}
//                           </td>
//                           <td className="px-5 py-4">{row.customer}</td>
//                           <td className="px-5 py-4 text-slate-500">
//                             {row.date}
//                           </td>
//                           <td className="px-5 py-4 font-semibold">
//                             {formatCurrency(row.amount)}
//                           </td>
//                           <td className="px-5 py-4">
//                             <span
//                               className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
//                                 row.status === "Paid"
//                                   ? "bg-emerald-50 text-emerald-700"
//                                   : "bg-amber-50 text-amber-700"
//                               }`}
//                             >
//                               {row.status}
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </section>

//               <p className="mt-5 text-center text-xs text-slate-400">
//                 BizPilot · Demo dashboard — sales figures are sample data.
//               </p>
//             </>
//           ) : (
//             /* Baaki modules baad mein implement kiye jayenge. */
//             <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
//               <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
//                 {menuItems.find((item) => item.name === active)?.icon}
//               </div>

//               <h3 className="text-xl font-bold">{active}</h3>

//               <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
//                 {active} module abhi placeholder hai. Agle development steps
//                 mein iske working forms aur database add karenge.
//               </p>

//               <button
//                 type="button"
//                 onClick={() => setActive("Dashboard")}
//                 className="mt-6 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
//               >
//                 Back to Dashboard
//               </button>
//             </section>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// "use client";

// // BizPilot - Business Management Dashboard
// // Products MongoDB mein save hote hain; frontend API routes ko call karta hai.

// import { useEffect, useState } from "react";

// const menuItems = [
//   { name: "Dashboard", icon: "◫" },
//   { name: "Products", icon: "▦" },
//   { name: "Sales", icon: "↗" },
//   { name: "Purchases", icon: "↙" },
//   { name: "Customers", icon: "♙" },
//   { name: "Suppliers", icon: "♧" },
//   { name: "Expenses", icon: "₹" },
//   { name: "Reports", icon: "▤" },
// ];

// const transactions = [
//   { id: "INV-1001", customer: "Rahul Sharma", date: "18 Oct 2026", amount: 12500, status: "Paid" },
//   { id: "INV-1002", customer: "Priya Singh", date: "17 Oct 2026", amount: 8200, status: "Pending" },
//   { id: "INV-1003", customer: "Aman Verma", date: "17 Oct 2026", amount: 5600, status: "Paid" },
//   { id: "INV-1004", customer: "Neha Gupta", date: "16 Oct 2026", amount: 3900, status: "Paid" },
// ];

// const emptyForm = {
//   name: "",
//   sku: "",
//   category: "",
//   price: "",
//   stock: "",
// };

// // Indian Rupees format karne ke liye helper function.
// function formatCurrency(amount) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 2,
//   }).format(Number(amount) || 0);
// }

// export default function Home() {
//   const [active, setActive] = useState("Dashboard");

//   // Products MongoDB API se load honge.
//   const [products, setProducts] = useState([]);

//   const [form, setForm] = useState(emptyForm);
//   const [editingId, setEditingId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("success");
  
//   // Sales form aur sales history ko manage karne ke liye states.
//   const [sales, setSales] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [saleQuantity, setSaleQuantity] = useState("1");
//   const [sellingPrice, setSellingPrice] = useState("");
//   const [salesLoading, setSalesLoading] = useState(false);
//   const [saleSaving, setSaleSaving] = useState(false);


//   // Page khulte hi MongoDB se products API ke through load karte hain.
//   useEffect(() => {
//     async function loadProducts() {
//       try {
//         const response = await fetch("/api/products");
//         const data = await response.json();

//         if (!response.ok || !data.success) {
//           throw new Error(data.message || "Products load nahi ho sake.");
//         }

//         // MongoDB ka _id frontend mein id naam se use kar rahe hain.
//         setProducts(
//           (data.products || []).map((product) => ({
//             ...product,
//             id: String(product._id || product.id),
//           }))
//         );
//       } catch (error) {
//         setMessage(
//           error.message || "MongoDB se products load nahi ho sake."
//         );
//         setMessageType("error");
//       }
//     }

//     loadProducts();
//   }, []);

//   // Form ke input ki value update karte hain.
//   function handleChange(event) {
//     const { name, value } = event.target;

//     setForm((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//   }

//   // Product ko MongoDB mein add ya update karne ke liye API call karte hain.
//   async function handleSubmit(event) {
//     event.preventDefault();
//     setMessage("");

//     const name = form.name.trim();
//     const sku = form.sku.trim();
//     const price = Number(form.price || 0);
//     const stock = Number(form.stock || 0);

//     if (!name || !sku) {
//       setMessage("Product name aur SKU zaroori hain.");
//       setMessageType("error");
//       return;
//     }

//     if (!Number.isFinite(price) || price < 0) {
//       setMessage("Price zero ya usse zyada hona chahiye.");
//       setMessageType("error");
//       return;
//     }

//     if (!Number.isInteger(stock) || stock < 0) {
//       setMessage("Stock zero ya positive whole number hona chahiye.");
//       setMessageType("error");
//       return;
//     }

//     // Duplicate SKU ko frontend par check karte hain.
//     const duplicate = products.some(
//       (product) =>
//         product.sku.toLowerCase() === sku.toLowerCase() &&
//         String(product.id) !== String(editingId)
//     );

//     if (duplicate) {
//       setMessage("Ye SKU pehle se use ho raha hai.");
//       setMessageType("error");
//       return;
//     }

//     const productData = {
//       name,
//       sku,
//       category: form.category.trim() || "Uncategorized",
//       price,
//       stock,
//     };

//     try {
//       // Edit ke liye PUT aur naye product ke liye POST request.
//       const response = await fetch(
//         editingId !== null
//           ? `/api/products/${editingId}`
//           : "/api/products",
//         {
//           method: editingId !== null ? "PUT" : "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(productData),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || "Product save nahi ho saka.");
//       }

//       // API se mila product dashboard ki list mein update karte hain.
//       const returnedProduct = data.product || productData;

//       const savedProduct = {
//         ...returnedProduct,
//         ...productData,
//         id: String(
//           returnedProduct._id ||
//           returnedProduct.id ||
//           editingId ||
//           ""
//         ),
//       };

//       if (editingId !== null) {
//         setProducts((previous) =>
//           previous.map((product) =>
//             String(product.id) === String(editingId)
//               ? { ...product, ...savedProduct }
//               : product
//           )
//         );

//         setMessage("Product MongoDB mein update ho gaya.");
//       } else {
//         setProducts((previous) => [...previous, savedProduct]);

//         setMessage("Product MongoDB mein add ho gaya.");
//       }

//       setMessageType("success");
//       setForm(emptyForm);
//       setEditingId(null);
//     } catch (error) {
//       setMessage(error.message || "Product save karte waqt error aaya.");
//       setMessageType("error");
//     }
//   }

//   // Selected product ko edit karne ke liye form mein load karte hain.
//   function handleEdit(product) {
//     setEditingId(product.id);

//     setForm({
//       name: product.name,
//       sku: product.sku,
//       category: product.category,
//       price: String(product.price),
//       stock: String(product.stock),
//     });

//     setMessage("");
//     setActive("Products");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }

//   // Confirmation ke baad product MongoDB se delete karte hain.
//   async function handleDelete(product) {
//     if (!window.confirm(`"${product.name}" ko delete karna hai?`)) {
//       return;
//     }

//     try {
//       const response = await fetch(`/api/products/${product.id}`, {
//         method: "DELETE",
//       });

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || "Product delete nahi ho saka.");
//       }

//       setProducts((previous) =>
//         previous.filter(
//           (item) => String(item.id) !== String(product.id)
//         )
//       );

//       if (String(editingId) === String(product.id)) {
//         setEditingId(null);
//         setForm(emptyForm);
//       }

//       setMessage("Product MongoDB se delete ho gaya.");
//       setMessageType("success");
//     } catch (error) {
//       setMessage(error.message || "Product delete karte waqt error aaya.");
//       setMessageType("error");
//     }
//   }

//   // Edit cancel karke form ko reset karte hain.
//   function cancelEdit() {
//     setEditingId(null);
//     setForm(emptyForm);
//     setMessage("");
//   }

//   // Name, SKU aur category ke basis par product search hota hai.
//   const filteredProducts = products.filter((product) => {
//     const query = searchTerm.trim().toLowerCase();

//     return (
//       product.name.toLowerCase().includes(query) ||
//       product.sku.toLowerCase().includes(query) ||
//       product.category.toLowerCase().includes(query)
//     );
//   });

//   const lowStockCount = products.filter(
//     (product) => product.stock <= 5
//   ).length;

//   const inventoryValue = products.reduce(
//     (total, product) => total + product.price * product.stock,
//     0
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-800">
//       {/* Desktop sidebar */}
//       <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-slate-200 bg-white p-5 md:flex">
//         <div className="mb-10 flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
//             B
//           </div>

//           <div>
//             <h1 className="text-xl font-bold">BizPilot</h1>
//             <p className="text-xs text-slate-500">
//               Business management
//             </p>
//           </div>
//         </div>

//         <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
//           Workspace
//         </p>

//         <nav className="space-y-1" aria-label="Main navigation">
//           {menuItems.map((item) => (
//             <button
//               key={item.name}
//               type="button"
//               onClick={() => setActive(item.name)}
//               className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
//                 active === item.name
//                   ? "bg-blue-600 text-white shadow-md"
//                   : "text-slate-600 hover:bg-slate-100"
//               }`}
//             >
//               <span className="text-lg">{item.icon}</span>
//               {item.name}
//             </button>
//           ))}
//         </nav>

//         <div className="mt-auto rounded-2xl bg-blue-50 p-4">
//           <p className="font-semibold text-blue-900">
//             BizPilot Starter
//           </p>
//           <p className="mt-1 text-xs leading-5 text-blue-700">
//             Apne business ko ek jagah manage karein.
//           </p>
//         </div>
//       </aside>

//       {/* Main content */}
//       <main className="min-h-screen md:ml-64">
//         {/* Top header */}
//         <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
//           <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//             <div>
//               <p className="text-sm text-slate-500">
//                 Workspace / {active}
//               </p>
//               <h2 className="mt-1 text-2xl font-bold">
//                 {active === "Dashboard" ? "Dashboard" : active}
//               </h2>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="hidden text-right sm:block">
//                 <p className="text-sm font-semibold">Admin User</p>
//                 <p className="text-xs text-slate-500">
//                   Business owner
//                 </p>
//               </div>

//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
//                 A
//               </div>
//             </div>
//           </div>

//           {/* Mobile navigation */}
//           <nav
//             className="mt-4 flex gap-2 overflow-x-auto pb-1 md:hidden"
//             aria-label="Mobile navigation"
//           >
//             {menuItems.map((item) => (
//               <button
//                 key={item.name}
//                 type="button"
//                 onClick={() => setActive(item.name)}
//                 className={`shrink-0 rounded-xl px-3 py-2 text-sm font-medium ${
//                   active === item.name
//                     ? "bg-blue-600 text-white"
//                     : "bg-slate-100 text-slate-600"
//                 }`}
//               >
//                 {item.name}
//               </button>
//             ))}
//           </nav>
//         </header>

//         <div className="p-4 sm:p-6 lg:p-8">
//           {active === "Products" ? (
//             <>
//               {/* Products form */}
//               <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
//                 <div className="mb-5">
//                   <h3 className="text-lg font-bold">
//                     {editingId !== null
//                       ? "Edit Product"
//                       : "Add New Product"}
//                   </h3>

//                   <p className="mt-1 text-sm text-slate-500">
//                     Product details aur inventory quantity manage karein.
//                   </p>
//                 </div>

//                 {message && (
//                   <div
//                     role="status"
//                     className={`mb-4 rounded-xl p-3 text-sm ${
//                       messageType === "error"
//                         ? "bg-red-50 text-red-700"
//                         : "bg-emerald-50 text-emerald-700"
//                     }`}
//                   >
//                     {message}
//                   </div>
//                 )}

//                 <form onSubmit={handleSubmit}>
//                   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
//                     <div>
//                       <label
//                         htmlFor="product-name"
//                         className="mb-2 block text-sm font-medium"
//                       >
//                         Product Name *
//                       </label>

//                       <input
//                         id="product-name"
//                         name="name"
//                         value={form.name}
//                         onChange={handleChange}
//                         placeholder="Wireless Mouse"
//                         required
//                         className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                       />
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="product-sku"
//                         className="mb-2 block text-sm font-medium"
//                       >
//                         SKU *
//                       </label>

//                       <input
//                         id="product-sku"
//                         name="sku"
//                         value={form.sku}
//                         onChange={handleChange}
//                         placeholder="WM-001"
//                         required
//                         className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                       />
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="product-category"
//                         className="mb-2 block text-sm font-medium"
//                       >
//                         Category
//                       </label>

//                       <input
//                         id="product-category"
//                         name="category"
//                         value={form.category}
//                         onChange={handleChange}
//                         placeholder="Accessories"
//                         className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                       />
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="product-price"
//                         className="mb-2 block text-sm font-medium"
//                       >
//                         Selling Price (₹)
//                       </label>

//                       <input
//                         id="product-price"
//                         name="price"
//                         type="number"
//                         min="0"
//                         step="0.01"
//                         value={form.price}
//                         onChange={handleChange}
//                         placeholder="599"
//                         className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                       />
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="product-stock"
//                         className="mb-2 block text-sm font-medium"
//                       >
//                         Stock Quantity
//                       </label>

//                       <input
//                         id="product-stock"
//                         name="stock"
//                         type="number"
//                         min="0"
//                         step="1"
//                         value={form.stock}
//                         onChange={handleChange}
//                         placeholder="10"
//                         className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                       />
//                     </div>
//                   </div>

//                   <div className="mt-5 flex flex-wrap gap-3">
//                     <button
//                       type="submit"
//                       className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
//                     >
//                       {editingId !== null ? "Update Product" : "Add Product"}
//                     </button>

//                     {editingId !== null && (
//                       <button
//                         type="button"
//                         onClick={cancelEdit}
//                         className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold hover:bg-slate-50"
//                       >
//                         Cancel
//                       </button>
//                     )}
//                   </div>
//                 </form>
//               </section>

//               {/* Inventory summary cards */}
//               <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
//                 {[
//                   {
//                     label: "Total Products",
//                     value: String(products.length),
//                     detail: "Current inventory",
//                     icon: "▦",
//                   },
//                   {
//                     label: "Inventory Value",
//                     value: formatCurrency(inventoryValue),
//                     detail: "Price × stock",
//                     icon: "₹",
//                   },
//                   {
//                     label: "Low Stock Items",
//                     value: String(lowStockCount),
//                     detail: "5 units or fewer",
//                     icon: "!",
//                   },
//                 ].map((card) => (
//                   <div
//                     key={card.label}
//                     className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
//                   >
//                     <div className="flex items-center justify-between gap-2">
//                       <p className="text-sm text-slate-500">
//                         {card.label}
//                       </p>
//                       <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-600">
//                         {card.icon}
//                       </span>
//                     </div>

//                     <p className="mt-4 break-words text-2xl font-bold">
//                       {card.value}
//                     </p>

//                     <p className="mt-2 text-xs text-slate-500">
//                       {card.detail}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* Product table */}
//               <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//                 <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
//                   <div>
//                     <h3 className="font-bold">Products & Inventory</h3>
//                     <p className="mt-1 text-sm text-slate-500">
//                       MongoDB mein saved products manage karein.
//                     </p>
//                   </div>

//                   <input
//                     type="search"
//                     value={searchTerm}
//                     onChange={(event) => setSearchTerm(event.target.value)}
//                     placeholder="Search products..."
//                     aria-label="Search products"
//                     className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 sm:max-w-xs"
//                   />
//                 </div>

//                 {message && (
//                   <div
//                     role="status"
//                     className={`mx-5 mb-4 rounded-xl p-3 text-sm ${
//                       messageType === "error"
//                         ? "bg-red-50 text-red-700"
//                         : "bg-emerald-50 text-emerald-700"
//                     }`}
//                   >
//                     {message}
//                   </div>
//                 )}

//                 <div className="overflow-x-auto">
//                   <table className="w-full min-w-[750px] text-left text-sm">
//                     <thead className="bg-slate-50 text-xs uppercase text-slate-500">
//                       <tr>
//                         <th className="px-5 py-3 font-semibold">Product</th>
//                         <th className="px-5 py-3 font-semibold">SKU</th>
//                         <th className="px-5 py-3 font-semibold">Category</th>
//                         <th className="px-5 py-3 font-semibold">Price</th>
//                         <th className="px-5 py-3 font-semibold">Stock</th>
//                         <th className="px-5 py-3 font-semibold">Status</th>
//                         <th className="px-5 py-3 font-semibold">Actions</th>
//                       </tr>
//                     </thead>

//                     <tbody className="divide-y divide-slate-100">
//                       {filteredProducts.length === 0 ? (
//                         <tr>
//                           <td
//                             colSpan={7}
//                             className="px-5 py-10 text-center text-slate-500"
//                           >
//                             Koi product nahi mila. Naya product add karein.
//                           </td>
//                         </tr>
//                       ) : (
//                         filteredProducts.map((product) => (
//                           <tr key={product.id} className="hover:bg-slate-50">
//                             <td className="px-5 py-4 font-semibold">
//                               {product.name}
//                             </td>
//                             <td className="px-5 py-4 text-slate-500">
//                               {product.sku}
//                             </td>
//                             <td className="px-5 py-4">
//                               {product.category}
//                             </td>
//                             <td className="px-5 py-4 font-medium">
//                               {formatCurrency(product.price)}
//                             </td>
//                             <td className="px-5 py-4">{product.stock}</td>
//                             <td className="px-5 py-4">
//                               <span
//                                 className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
//                                   product.stock <= 5
//                                     ? "bg-red-50 text-red-700"
//                                     : "bg-emerald-50 text-emerald-700"
//                                 }`}
//                               >
//                                 {product.stock <= 5 ? "Low Stock" : "In Stock"}
//                               </span>
//                             </td>
//                             <td className="px-5 py-4">
//                               <div className="flex gap-2">
//                                 <button
//                                   type="button"
//                                   onClick={() => handleEdit(product)}
//                                   className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-100"
//                                 >
//                                   Edit
//                                 </button>

//                                 <button
//                                   type="button"
//                                   onClick={() => handleDelete(product)}
//                                   className="rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
//                                 >
//                                   Delete
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </section>
//             </>
//           ) : active === "Dashboard" ? (
//             <>
//               {/* Dashboard summary */}
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
//                 {[
//                   {
//                     label: "Total Products",
//                     value: String(products.length),
//                     detail: "Current inventory",
//                     icon: "▦",
//                   },
//                   {
//                     label: "Inventory Value",
//                     value: formatCurrency(inventoryValue),
//                     detail: "Price × stock",
//                     icon: "₹",
//                   },
//                   {
//                     label: "Low Stock Items",
//                     value: String(lowStockCount),
//                     detail: "5 units or fewer",
//                     icon: "!",
//                   },
//                 ].map((card) => (
//                   <div
//                     key={card.label}
//                     className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
//                   >
//                     <div className="flex items-center justify-between gap-2">
//                       <p className="text-sm text-slate-500">{card.label}</p>
//                       <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-600">
//                         {card.icon}
//                       </span>
//                     </div>

//                     <p className="mt-4 break-words text-2xl font-bold">
//                       {card.value}
//                     </p>

//                     <p className="mt-2 text-xs text-slate-500">
//                       {card.detail}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* Weekly sales chart */}
//               <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-3">
//                 <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
//                   <h3 className="font-bold">Sales overview</h3>
//                   <p className="mt-1 text-sm text-slate-500">
//                     Sample weekly sales data
//                   </p>

//                   <div className="mt-8 flex h-48 items-end justify-between gap-3">
//                     {[
//                       { day: "Mon", height: "45%" },
//                       { day: "Tue", height: "70%" },
//                       { day: "Wed", height: "55%" },
//                       { day: "Thu", height: "85%" },
//                       { day: "Fri", height: "62%" },
//                       { day: "Sat", height: "100%" },
//                       { day: "Sun", height: "76%" },
//                     ].map((bar) => (
//                       <div
//                         key={bar.day}
//                         className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-3"
//                       >
//                         <div className="flex h-full w-full items-end">
//                           <div
//                             title={`${bar.day}: sample`}
//                             style={{ height: bar.height }}
//                             className="w-full rounded-t-lg bg-blue-500 transition hover:bg-blue-700"
//                           />
//                         </div>

//                         <span className="text-xs text-slate-500">
//                           {bar.day}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </section>

//                 {/* Low stock alerts */}
//                 <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//                   <h3 className="font-bold">Inventory alerts</h3>
//                   <p className="mt-1 text-sm text-slate-500">
//                     Items with 5 or fewer units
//                   </p>

//                   <div className="mt-5 space-y-4">
//                     {products.filter((product) => product.stock <= 5)
//                       .length === 0 ? (
//                       <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">
//                         Abhi low-stock product nahi hai.
//                       </p>
//                     ) : (
//                       products
//                         .filter((product) => product.stock <= 5)
//                         .slice(0, 5)
//                         .map((product) => (
//                           <div
//                             key={product.id}
//                             className="flex items-center justify-between gap-3"
//                           >
//                             <div className="flex min-w-0 items-center gap-3">
//                               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
//                                 ▦
//                               </div>

//                               <span className="truncate text-sm font-medium">
//                                 {product.name}
//                               </span>
//                             </div>

//                             <span className="whitespace-nowrap rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
//                               {product.stock} left
//                             </span>
//                           </div>
//                         ))
//                     )}

//                     <button
//                       type="button"
//                       onClick={() => setActive("Products")}
//                       className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold hover:bg-slate-50"
//                     >
//                       Manage inventory
//                     </button>
//                   </div>
//                 </section>
//               </div>

//               {/* Recent transactions */}
//               <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//                 <div className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
//                   <div>
//                     <h3 className="font-bold">Recent transactions</h3>
//                     <p className="mt-1 text-sm text-slate-500">
//                       Sample invoices only
//                     </p>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={() => setActive("Sales")}
//                     className="text-left text-sm font-semibold text-blue-600 hover:text-blue-800"
//                   >
//                     View sales →
//                   </button>
//                 </div>

//                 <div className="overflow-x-auto">
//                   <table className="w-full min-w-[600px] text-left text-sm">
//                     <thead className="bg-slate-50 text-xs uppercase text-slate-500">
//                       <tr>
//                         <th className="px-5 py-3 font-semibold">Invoice</th>
//                         <th className="px-5 py-3 font-semibold">Customer</th>
//                         <th className="px-5 py-3 font-semibold">Date</th>
//                         <th className="px-5 py-3 font-semibold">Amount</th>
//                         <th className="px-5 py-3 font-semibold">Status</th>
//                       </tr>
//                     </thead>

//                     <tbody className="divide-y divide-slate-100">
//                       {transactions.map((row) => (
//                         <tr key={row.id} className="hover:bg-slate-50">
//                           <td className="px-5 py-4 font-semibold">
//                             {row.id}
//                           </td>
//                           <td className="px-5 py-4">{row.customer}</td>
//                           <td className="px-5 py-4 text-slate-500">
//                             {row.date}
//                           </td>
//                           <td className="px-5 py-4 font-semibold">
//                             {formatCurrency(row.amount)}
//                           </td>
//                           <td className="px-5 py-4">
//                             <span
//                               className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
//                                 row.status === "Paid"
//                                   ? "bg-emerald-50 text-emerald-700"
//                                   : "bg-amber-50 text-amber-700"
//                               }`}
//                             >
//                               {row.status}
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </section>

//               <p className="mt-5 text-center text-xs text-slate-400">
//                 BizPilot · Demo dashboard — sales figures are sample data.
//               </p>
//             </>
//           ) : (
//             /* Baaki modules baad mein implement kiye jayenge. */
//             <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
//               <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
//                 {menuItems.find((item) => item.name === active)?.icon}
//               </div>

//               <h3 className="text-xl font-bold">{active}</h3>

//               <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
//                 {active} module abhi placeholder hai. Agle development steps
//                 mein iske working forms aur database add karenge.
//               </p>

//               <button
//                 type="button"
//                 onClick={() => setActive("Dashboard")}
//                 className="mt-6 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
//               >
//                 Back to Dashboard
//               </button>
//             </section>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

// BizPilot - Responsive Business Management Dashboard
// Products aur Sales MongoDB API ke through manage hote hain.

import { useEffect, useState } from "react";


const menuItems = [
  { name: "Dashboard", icon: "◫" },
  { name: "Products", icon: "▦" },
  { name: "Sales", icon: "↗" },
  { name: "Purchases", icon: "↙" },
  { name: "Customers", icon: "♙" },
  { name: "Suppliers", icon: "♧" },
  { name: "Expenses", icon: "₹" },
  { name: "Reports", icon: "▤" },
];

const emptyForm = {
  name: "",
  sku: "",
  category: "",
  price: "",
  stock: "",
};

// Amount ko Indian Rupees format mein dikhate hain.
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);
}

export default function Home() {
  const [active, setActive] = useState("Dashboard");

  // Products aur product form ki states.
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Sales module ki states.
  const [sales, setSales] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [saleQuantity, setSaleQuantity] = useState("1");
  const [sellingPrice, setSellingPrice] = useState("");
  const [salesLoading, setSalesLoading] = useState(false);
  const [saleSaving, setSaleSaving] = useState(false);
  // Purchases module ki states.
// In states se purchase form, quantity aur purchase history manage hogi.
const [purchases, setPurchases] = useState([]);
const [purchaseProduct, setPurchaseProduct] = useState("");
const [purchaseQuantity, setPurchaseQuantity] = useState("1");
const [purchasePrice, setPurchasePrice] = useState("");
const [purchasesLoading, setPurchasesLoading] = useState(false);
const [purchaseSaving, setPurchaseSaving] = useState(false);

 // Customers module ki states.
 // Ye form ke inputs aur database se aane wale customers ko manage karti hain.
 const [customers, setCustomers] = useState([]);
 const [customersLoading, setCustomersLoading] = useState(false);
 const [customerSaving, setCustomerSaving] = useState(false);

 // Naye customer ki form values.
 const [customerName, setCustomerName] = useState("");
 const [customerPhone, setCustomerPhone] = useState("");
 const [customerEmail, setCustomerEmail] = useState("");
 const [customerAddress, setCustomerAddress] = useState("");

 // Search input mein likha gaya text.
 const [customerSearch, setCustomerSearch] = useState("");
 // Customer edit karte waqt uski ID aur current form values store karte hain.
const [editingCustomerId, setEditingCustomerId] = useState(null);


  // Common status message.
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [productsLoading, setProductsLoading] = useState(true);
  const [productSaving, setProductSaving] = useState(false);

  // API se products load karte hain.
  async function loadProducts() {
    const response = await fetch("/api/products");
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Products load nahi ho sake.");
    }

    setProducts(
      (data.products || []).map((product) => ({
        ...product,
        id: String(product._id || product.id),
      }))
    );
  }

  // API se saved sales history load karte hain.
  async function loadSales() {
    setSalesLoading(true);

    try {
      const response = await fetch("/api/sales");
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Sales load nahi ho sakin.");
      }

      setSales(data.sales || []);
    } catch (error) {
      setMessage(error.message || "Sales load nahi ho sakin.");
      setMessageType("error");
    } finally {
      setSalesLoading(false);
    }
  }
  // MongoDB API se saved purchase history load karte hain.
async function loadPurchases() {
  setPurchasesLoading(true);

  try {
    const response = await fetch("/api/purchases");
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Purchases load nahi ho sakin.");
    }

    setPurchases(data.purchases || []);
  } catch (error) {
    setMessage(error.message || "Purchases load nahi ho sakin.");
    setMessageType("error");
  } finally {
    setPurchasesLoading(false);
  }
}

 // MongoDB API se customers ki list load karne ka function.
 async function loadCustomers() {
   setCustomersLoading(true);

   try {
     const response = await fetch("/api/customers");
     const data = await response.json();

     if (!response.ok || !data.success) {
       throw new Error(data.message || "Customers load nahi ho sake.");
     }

     setCustomers(data.customers || []);
   } catch (error) {
     setMessage(error.message || "Customers load karne mein error aaya.");
     setMessageType("error");
   } finally {
     setCustomersLoading(false);
   }
 }

  // Page load par database ka data fetch karte hain.
  useEffect(() => {
    async function initialisePage() {
      setProductsLoading(true);

      try {
        await loadProducts();
      } catch (error) {
        setMessage(error.message || "Products load nahi ho sake.");
        setMessageType("error");
      } finally {
        setProductsLoading(false);
      }

      await loadSales();
      await loadPurchases();
      await loadCustomers();
    }

    initialisePage();
  }, []);

  // Selected product ki default price sale form mein set karte hain.
  useEffect(() => {
    const product = products.find(
      (item) => String(item.id) === String(selectedProduct)
    );

    setSellingPrice(product ? String(product.price ?? "") : "");
  }, [selectedProduct, products]);

  // Product form ke fields update karte hain.
  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }
  // Purchase ke liye selected product ki cost price default mein set karte hain.
useEffect(() => {
  const product = products.find(
    (item) => String(item.id) === String(purchaseProduct)
  );

  setPurchasePrice(product ? String(product.price ?? "") : "");
}, [purchaseProduct, products]);

  // Product ko add ya update karte hain.
  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const name = form.name.trim();
    const sku = form.sku.trim();
    const price = Number(form.price);
    const stock = Number(form.stock);

    if (!name || !sku) {
      setMessage("Product name aur SKU zaroori hain.");
      setMessageType("error");
      return;
    }

    if (form.price === "" || !Number.isFinite(price) || price < 0) {
      setMessage("Valid price enter karo.");
      setMessageType("error");
      return;
    }

    if (
      form.stock === "" ||
      !Number.isSafeInteger(stock) ||
      stock < 0
    ) {
      setMessage("Stock zero ya positive whole number hona chahiye.");
      setMessageType("error");
      return;
    }

    const duplicate = products.some(
      (product) =>
        String(product.sku).toLowerCase() === sku.toLowerCase() &&
        String(product.id) !== String(editingId)
    );

    if (duplicate) {
      setMessage("Ye SKU pehle se use ho raha hai.");
      setMessageType("error");
      return;
    }

    const productData = {
      name,
      sku,
      category: form.category.trim() || "Uncategorized",
      price,
      stock,
    };

    setProductSaving(true);

    try {
      const response = await fetch(
        editingId !== null
          ? `/api/products/${editingId}`
          : "/api/products",
        {
          method: editingId !== null ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Product save nahi ho saka.");
      }

      // Database se latest list reload karte hain.
      await loadProducts();

      setForm(emptyForm);
      setEditingId(null);
      setMessage(
        editingId !== null
          ? "Product successfully update ho gaya."
          : "Product successfully add ho gaya."
      );
      setMessageType("success");
    } catch (error) {
      setMessage(error.message || "Product save nahi ho saka.");
      setMessageType("error");
    } finally {
      setProductSaving(false);
    }
  }

  // Product ko edit karne ke liye form mein uski details bharte hain.
  function handleEdit(product) {
    setEditingId(product.id);

    setForm({
      name: product.name || "",
      sku: product.sku || "",
      category: product.category || "",
      price: String(product.price ?? ""),
      stock: String(product.stock ?? ""),
    });

    setMessage("");
    setActive("Products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Product delete karne se pehle confirmation lete hain.
  async function handleDelete(product) {
    if (!window.confirm(`"${product.name}" ko delete karna hai?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Product delete nahi ho saka.");
      }

      await loadProducts();

      if (String(editingId) === String(product.id)) {
        setEditingId(null);
        setForm(emptyForm);
      }

      if (String(selectedProduct) === String(product.id)) {
        setSelectedProduct("");
      }

      setMessage("Product successfully delete ho gaya.");
      setMessageType("success");
    } catch (error) {
      setMessage(error.message || "Product delete nahi ho saka.");
      setMessageType("error");
    }
  }

  // Product editing cancel karke form reset karte hain.
  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
  }

  // Product name, SKU aur category se search karte hain.
  const filteredProducts = products.filter((product) => {
    const query = searchTerm.trim().toLowerCase();

    return (
      String(product.name || "").toLowerCase().includes(query) ||
      String(product.sku || "").toLowerCase().includes(query) ||
      String(product.category || "").toLowerCase().includes(query)
    );
  });

  const lowStockCount = products.filter(
    (product) => Number(product.stock) <= 5
  ).length;

  const inventoryValue = products.reduce(
    (total, product) =>
      total + Number(product.price || 0) * Number(product.stock || 0),
    0
  );

  // Selected product aur sale total calculate karte hain.
  const selectedSaleProduct = products.find(
    (product) => String(product.id) === String(selectedProduct)
  );

  const saleTotal =
    (Number(saleQuantity) || 0) * (Number(sellingPrice) || 0);

  // Sale save karte hain aur stock/history refresh karte hain.
  async function handleSaleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const quantity = Number(saleQuantity);
    const price = Number(sellingPrice);

    if (!selectedSaleProduct) {
      setMessage("Pehle product select karo.");
      setMessageType("error");
      return;
    }

    if (!Number.isSafeInteger(quantity) || quantity < 1) {
      setMessage("Quantity kam se kam 1 honi chahiye.");
      setMessageType("error");
      return;
    }

    if (quantity > Number(selectedSaleProduct.stock)) {
      setMessage(
        `Sirf ${selectedSaleProduct.stock} items stock mein available hain.`
      );
      setMessageType("error");
      return;
    }

    if (sellingPrice === "" || !Number.isFinite(price) || price < 0) {
      setMessage("Valid selling price enter karo.");
      setMessageType("error");
      return;
    }

    setSaleSaving(true);

    try {
      const response = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct,
          quantity,
          sellingPrice: price,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Sale save nahi ho saki.");
      }

      // Sale ke baad stock aur history ko database se refresh karte hain.
      await loadProducts();
      await loadSales();

      setSaleQuantity("1");
      setMessage("Sale successfully save ho gayi!");
      setMessageType("success");
    } catch (error) {
      setMessage(error.message || "Sale save karte waqt error aaya.");
      setMessageType("error");
    } finally {
      setSaleSaving(false);
    }
  }
  // Purchase save karte hain.
// Backend API purchase record save karegi aur product stock badhayegi.
async function handlePurchaseSubmit(event) {
  event.preventDefault();
  setMessage("");

  const quantity = Number(purchaseQuantity);
  const price = Number(purchasePrice);

  const selectedPurchaseProduct = products.find(
    (product) => String(product.id) === String(purchaseProduct)
  );

  if (!selectedPurchaseProduct) {
    setMessage("Pehle purchase ke liye product select karo.");
    setMessageType("error");
    return;
  }

  if (!Number.isSafeInteger(quantity) || quantity < 1) {
    setMessage("Purchase quantity kam se kam 1 honi chahiye.");
    setMessageType("error");
    return;
  }

  if (
    purchasePrice === "" ||
    !Number.isFinite(price) ||
    price < 0
  ) {
    setMessage("Valid purchase price enter karo.");
    setMessageType("error");
    return;
  }

  setPurchaseSaving(true);

  try {
    const response = await fetch("/api/purchases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: purchaseProduct,
        quantity,
        purchasePrice: price,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Purchase save nahi ho saki.");
    }

    // Purchase ke baad updated stock aur purchase history reload karte hain.
    await loadProducts();
    await loadPurchases();

    setPurchaseQuantity("1");

    setMessage("Purchase successfully save ho gayi!");
    setMessageType("success");
  } catch (error) {
    setMessage(error.message || "Purchase save karte waqt error aaya.");
    setMessageType("error");
  } finally {
    setPurchaseSaving(false);
  }
}


 // Form submit hone par customer ko API ke through MongoDB mein save karte hain.
 async function handleCustomerSubmit(event) {
   event.preventDefault();

   setMessage("");

   if (!customerName.trim()) {
     setMessage("Customer ka naam enter karo.");
     setMessageType("error");
     return;
   }

   setCustomerSaving(true);

   try {
    
const response = await fetch(
  editingCustomerId
    ? `/api/customers/${editingCustomerId}`
    : "/api/customers",
  {
    method: editingCustomerId ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: customerName.trim(),
      phone: customerPhone.trim(),
      email: customerEmail.trim(),
      address: customerAddress.trim(),
    }),
  }
);

function handleEditCustomer(customer) {
  setEditingCustomerId(String(customer.id || customer._id));
  setCustomerName(customer.name || "");
  setCustomerPhone(customer.phone || "");
  setCustomerEmail(customer.email || "");
  setCustomerAddress(customer.address || "");
  setMessage("");
}

function handleCancelCustomerEdit() {
  setEditingCustomerId(null);
  setCustomerName("");
  setCustomerPhone("");
  setCustomerEmail("");
  setCustomerAddress("");
  setMessage("");
}


     const data = await response.json();

     if (!response.ok || !data.success) {
       throw new Error(data.message || "Customer save nahi ho saka.");
     }

     // Save hone ke baad latest list reload karte hain.
     await loadCustomers();

     // Form ko agle customer ke liye reset karte hain.
     setCustomerName("");
     setCustomerPhone("");
     setCustomerEmail("");
     setCustomerAddress("");

     setMessage("Customer successfully add ho gaya!");
     setMessageType("success");
   } catch (error) {
     setMessage(error.message || "Customer save karte waqt error aaya.");
     setMessageType("error");
   } finally {
     setCustomerSaving(false);
   }
 }
 
 // Selected customer ki details form mein bharte hain.
 function handleEditCustomer(customer) {
   setEditingCustomerId(String(customer.id || customer._id));
   setCustomerName(customer.name || "");
   setCustomerPhone(customer.phone || "");
   setCustomerEmail(customer.email || "");
   setCustomerAddress(customer.address || "");
   setMessage("");
 }

 // Edit cancel karne par form reset karte hain.
 function handleCancelCustomerEdit() {
   setEditingCustomerId(null);
   setCustomerName("");
   setCustomerPhone("");
   setCustomerEmail("");
   setCustomerAddress("");
   setMessage("");
 }



  // Common message component.
  function StatusMessage() {
    if (!message) return null;

    return (
      <div
        role="status"
        className={`mb-5 break-words rounded-xl border p-3 text-sm ${
          messageType === "error"
            ? "border-red-200 bg-red-50 text-red-700"
            : "border-emerald-200 bg-emerald-50 text-emerald-700"
        }`}
      >
        {message}
      </div>
    );
  }

  // Responsive summary card.
  function SummaryCard({ label, value, detail, icon }) {
    return (
      <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm text-slate-500">{label}</p>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-600">
            {icon}
          </span>
        </div>
        <p className="mt-4 break-words text-2xl font-bold">{value}</p>
        <p className="mt-2 text-xs text-slate-500">{detail}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-800">
      {/* Desktop sidebar: mobile par hidden rahega. */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-slate-200 bg-white p-5 md:flex">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
            B
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold">BizPilot</h1>
            <p className="text-xs text-slate-500">Business management</p>
          </div>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        <nav className="space-y-1" aria-label="Main navigation">
          {menuItems.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => {
                setActive(item.name);
                setMessage("");
              }}
              className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                active === item.name
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl bg-blue-50 p-4">
          <p className="font-semibold text-blue-900">BizPilot Starter</p>
          <p className="mt-1 text-xs leading-5 text-blue-700">
            Apne business ko ek jagah manage karein.
          </p>
        </div>
      </aside>

      {/* Main content area. */}
      <main className="min-h-screen min-w-0 md:ml-64">
        {/* Responsive header. */}
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div className="min-w-0">
              <p className="text-sm text-slate-500">Workspace / {active}</p>
              <h2 className="mt-1 break-words text-2xl font-bold">{active}</h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold">Admin User</p>
                <p className="text-xs text-slate-500">Business owner</p>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                A
              </div>
            </div>
          </div>

          {/* Mobile navigation: horizontally scrollable buttons. */}
          <nav
            className="mt-4 flex gap-2 overflow-x-auto pb-1 md:hidden"
            aria-label="Mobile navigation"
          >
            {menuItems.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => {
                  setActive(item.name);
                  setMessage("");
                }}
                className={`min-h-10 shrink-0 rounded-xl px-3 py-2 text-sm font-medium ${
                  active === item.name
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </header>

        <div className="min-w-0 p-4 sm:p-6 lg:p-8">
          {/* PRODUCTS MODULE */}
          {active === "Products" && (
            <div className="min-w-0 space-y-6">
              <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                <div className="mb-5">
                  <h3 className="text-lg font-bold sm:text-xl">
                    {editingId !== null ? "Edit Product" : "Add New Product"}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Product details aur inventory manage karein.
                  </p>
                </div>

                <StatusMessage />

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                    <div className="min-w-0">
                      <label htmlFor="product-name" className="mb-2 block text-sm font-medium">
                        Product Name *
                      </label>
                      <input
                        id="product-name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Wireless Mouse"
                        required
                        className="min-h-12 w-full min-w-0 rounded-xl border border-slate-200 px-3 py-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="min-w-0">
                      <label htmlFor="product-sku" className="mb-2 block text-sm font-medium">
                        SKU *
                      </label>
                      <input
                        id="product-sku"
                        name="sku"
                        value={form.sku}
                        onChange={handleChange}
                        placeholder="WM-001"
                        required
                        className="min-h-12 w-full min-w-0 rounded-xl border border-slate-200 px-3 py-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="min-w-0">
                      <label htmlFor="product-category" className="mb-2 block text-sm font-medium">
                        Category
                      </label>
                      <input
                        id="product-category"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        placeholder="Accessories"
                        className="min-h-12 w-full min-w-0 rounded-xl border border-slate-200 px-3 py-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="min-w-0">
                      <label htmlFor="product-price" className="mb-2 block text-sm font-medium">
                        Price (₹)
                      </label>
                      <input
                        id="product-price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.price}
                        onChange={handleChange}
                        required
                        placeholder="599"
                        className="min-h-12 w-full min-w-0 rounded-xl border border-slate-200 px-3 py-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="min-w-0">
                      <label htmlFor="product-stock" className="mb-2 block text-sm font-medium">
                        Stock Quantity
                      </label>
                      <input
                        id="product-stock"
                        name="stock"
                        type="number"
                        min="0"
                        step="1"
                        value={form.stock}
                        onChange={handleChange}
                        required
                        placeholder="10"
                        className="min-h-12 w-full min-w-0 rounded-xl border border-slate-200 px-3 py-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="submit"
                      disabled={productSaving}
                      className="min-h-12 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60 sm:w-auto"
                    >
                      {productSaving
                        ? "Saving..."
                        : editingId !== null
                        ? "Update Product"
                        : "Add Product"}
                    </button>

                    {editingId !== null && (
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="min-h-12 w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold hover:bg-slate-50 sm:w-auto"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </section>

              {/* Inventory summary cards. */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <SummaryCard
                  label="Total Products"
                  value={products.length}
                  detail="Current inventory"
                  icon="▦"
                />
                <SummaryCard
                  label="Inventory Value"
                  value={formatCurrency(inventoryValue)}
                  detail="Price × stock"
                  icon="₹"
                />
                <SummaryCard
                  label="Low Stock Items"
                  value={lowStockCount}
                  detail="5 units or fewer"
                  icon="!"
                />
              </div>

              {/* Mobile par cards, large screens par table. */}
              <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-3 p-4 sm:p-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-bold">Products & Inventory</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      MongoDB mein saved products.
                    </p>
                  </div>
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search products..."
                    aria-label="Search products"
                    className="min-h-12 w-full min-w-0 rounded-xl border border-slate-200 px-4 py-3 text-base outline-none focus:border-blue-500 md:max-w-xs"
                  />
                </div>

                {productsLoading ? (
                  <p className="p-8 text-center text-sm text-slate-500">
                    Products load ho rahe hain...
                  </p>
                ) : filteredProducts.length === 0 ? (
                  <p className="p-8 text-center text-sm text-slate-500">
                    Koi product nahi mila. Naya product add karein.
                  </p>
                ) : (
                  <>
                    {/* Phone view: each product gets its own card. */}
                    <div className="space-y-3 p-4 md:hidden">
                      {filteredProducts.map((product) => (
                        <article key={product.id} className="min-w-0 rounded-xl border border-slate-200 p-4">
                          <div className="flex min-w-0 items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h4 className="break-words font-semibold">{product.name}</h4>
                              <p className="mt-1 break-words text-xs text-slate-500">
                                SKU: {product.sku}
                              </p>
                              <p className="mt-1 break-words text-xs text-slate-500">
                                {product.category || "Uncategorized"}
                              </p>
                            </div>
                            <span className={`shrink-0 rounded-full px-2 py-1 text-xs font-semibold ${
                              Number(product.stock) <= 5
                                ? "bg-red-50 text-red-700"
                                : "bg-emerald-50 text-emerald-700"
                            }`}>
                              {Number(product.stock) <= 5 ? "Low Stock" : "In Stock"}
                            </span>
                          </div>

                          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
                            <div>
                              <p className="text-xs text-slate-500">Price</p>
                              <p className="mt-1 break-words font-semibold">
                                {formatCurrency(product.price)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Stock</p>
                              <p className="mt-1 font-semibold">{product.stock}</p>
                            </div>
                          </div>

                          <div className="mt-4 flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleEdit(product)}
                              className="min-h-11 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(product)}
                              className="min-h-11 flex-1 rounded-lg border border-red-100 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>

                    {/* Tablet/desktop view. */}
                    <div className="hidden overflow-x-auto md:block">
                      <table className="w-full min-w-[750px] text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                          <tr>
                            <th className="px-5 py-3 font-semibold">Product</th>
                            <th className="px-5 py-3 font-semibold">SKU</th>
                            <th className="px-5 py-3 font-semibold">Category</th>
                            <th className="px-5 py-3 font-semibold">Price</th>
                            <th className="px-5 py-3 font-semibold">Stock</th>
                            <th className="px-5 py-3 font-semibold">Status</th>
                            <th className="px-5 py-3 font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-slate-50">
                              <td className="px-5 py-4 font-semibold">{product.name}</td>
                              <td className="px-5 py-4 text-slate-500">{product.sku}</td>
                              <td className="px-5 py-4">{product.category}</td>
                              <td className="px-5 py-4">{formatCurrency(product.price)}</td>
                              <td className="px-5 py-4">{product.stock}</td>
                              <td className="px-5 py-4">
                                <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                                  Number(product.stock) <= 5
                                    ? "bg-red-50 text-red-700"
                                    : "bg-emerald-50 text-emerald-700"
                                }`}>
                                  {Number(product.stock) <= 5 ? "Low Stock" : "In Stock"}
                                </span>
                              </td>
                              <td className="px-5 py-4">
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleEdit(product)}
                                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-100"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDelete(product)}
                                    className="rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </section>
            </div>
          )}

          {/* SALES MODULE */}
          {active === "Sales" && (
            <div className="min-w-0 space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SummaryCard
                  label="Recorded Sales"
                  value={sales.length}
                  detail="Saved sale records"
                  icon="↗"
                />
                <SummaryCard
                  label="Total Sales Amount"
                  value={formatCurrency(
                    sales.reduce(
                      (total, sale) => total + Number(sale.totalAmount || 0),
                      0
                    )
                  )}
                  detail="All saved sales"
                  icon="₹"
                />
              </div>

              <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                <h3 className="text-lg font-bold sm:text-xl">Record a Sale</h3>
                <p className="mt-1 mb-5 text-sm text-slate-500">
                  Product choose karo aur sale details enter karo.
                </p>

                <StatusMessage />

                <form onSubmit={handleSaleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="min-w-0">
                      <label htmlFor="saleProduct" className="mb-2 block text-sm font-medium">
                        Select Product
                      </label>
                      <select
                        id="saleProduct"
                        value={selectedProduct}
                        onChange={(event) => setSelectedProduct(event.target.value)}
                        required
                        className="min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-3 py-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="">Choose a product</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id} disabled={Number(product.stock) < 1}>
                            {product.name} — Stock: {product.stock}
                          </option>
                        ))}
                      </select>
                      {products.length === 0 && (
                        <p className="mt-2 text-sm text-amber-700">
                          Pehle Products section mein product add karo.
                        </p>
                      )}
                    </div>

                    <div className="min-w-0">
                      <label htmlFor="saleQuantity" className="mb-2 block text-sm font-medium">
                        Quantity
                      </label>
                      <input
                        id="saleQuantity"
                        type="number"
                        min="1"
                        step="1"
                        max={selectedSaleProduct?.stock ?? undefined}
                        value={saleQuantity}
                        onChange={(event) => setSaleQuantity(event.target.value)}
                        required
                        className="min-h-12 w-full min-w-0 rounded-xl border border-slate-300 px-3 py-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                      {selectedSaleProduct && (
                        <p className="mt-2 text-xs text-slate-500">
                          Available stock: {selectedSaleProduct.stock}
                        </p>
                      )}
                    </div>

                    <div className="min-w-0">
                      <label htmlFor="sellingPrice" className="mb-2 block text-sm font-medium">
                        Selling Price (₹ per item)
                      </label>
                      <input
                        id="sellingPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        value={sellingPrice}
                        onChange={(event) => setSellingPrice(event.target.value)}
                        required
                        className="min-h-12 w-full min-w-0 rounded-xl border border-slate-300 px-3 py-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="min-w-0 rounded-xl bg-blue-50 p-4">
                      <p className="text-sm text-blue-700">Sale Total</p>
                      <p className="mt-1 break-words text-2xl font-bold text-blue-900">
                        {formatCurrency(saleTotal)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={
                      saleSaving ||
                      !selectedSaleProduct ||
                      Number(selectedSaleProduct.stock) < 1
                    }
                    className="min-h-12 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {saleSaving ? "Saving Sale..." : "Save Sale"}
                  </button>
                </form>
              </section>

              <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold sm:text-xl">Sales History</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      MongoDB mein saved sales.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={loadSales}
                    disabled={salesLoading}
                    className="min-h-11 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50 disabled:opacity-60 sm:w-auto"
                  >
                    {salesLoading ? "Loading..." : "Refresh History"}
                  </button>
                </div>

                {salesLoading ? (
                  <p className="py-8 text-center text-sm text-slate-500">
                    Sales history load ho rahi hai...
                  </p>
                ) : sales.length === 0 ? (
                  <div className="rounded-xl bg-slate-50 px-4 py-10 text-center">
                    <p className="font-medium text-slate-700">Abhi koi sale nahi hai.</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Pehli sale save karne par yahan dikhai degi.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Mobile sales cards. */}
                    <div className="space-y-3 md:hidden">
                      {sales.map((sale) => (
                        <article
                          key={sale._id || sale.id}
                          className="min-w-0 rounded-xl border border-slate-200 p-4"
                        >
                          <div className="flex min-w-0 items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="break-words font-semibold">
                                {sale.productName || sale.product?.name || "Product"}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {sale.createdAt
                                  ? new Date(sale.createdAt).toLocaleString("en-IN")
                                  : "Date unavailable"}
                              </p>
                            </div>
                            <p className="shrink-0 break-words text-right font-bold text-blue-700">
                              {formatCurrency(sale.totalAmount)}
                            </p>
                          </div>

                          <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 text-sm">
                            <div>
                              <p className="text-xs text-slate-500">Quantity</p>
                              <p className="mt-1 font-medium">{sale.quantity}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Price per item</p>
                              <p className="mt-1 font-medium">
                                {formatCurrency(sale.sellingPrice)}
                              </p>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>

                    {/* Desktop sales table. */}
                    <div className="hidden overflow-x-auto md:block">
                      <table className="w-full min-w-[600px] text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                          <tr>
                            <th className="px-4 py-3 font-semibold">Product</th>
                            <th className="px-4 py-3 font-semibold">Date</th>
                            <th className="px-4 py-3 font-semibold">Quantity</th>
                            <th className="px-4 py-3 font-semibold">Price</th>
                            <th className="px-4 py-3 text-right font-semibold">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {sales.map((sale) => (
                            <tr key={sale._id || sale.id} className="hover:bg-slate-50">
                              <td className="px-4 py-4 font-medium">
                                {sale.productName || sale.product?.name || "Product"}
                              </td>
                              <td className="px-4 py-4 text-slate-500">
                                {sale.createdAt
                                  ? new Date(sale.createdAt).toLocaleDateString("en-IN")
                                  : "—"}
                              </td>
                              <td className="px-4 py-4">{sale.quantity}</td>
                              <td className="px-4 py-4">
                                {formatCurrency(sale.sellingPrice)}
                              </td>
                              <td className="px-4 py-4 text-right font-semibold">
                                {formatCurrency(sale.totalAmount)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </section>
            </div>
          )}
          {/* PURCHASES MODULE */}
{active === "Purchases" && (
  <div className="min-w-0 space-y-6">
    {/* Purchase summary cards */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <SummaryCard
        label="Total Purchases"
        value={purchases.length}
        detail="Saved purchase records"
        icon="↙"
      />

      <SummaryCard
        label="Total Purchase Amount"
        value={formatCurrency(
          purchases.reduce(
            (total, purchase) =>
              total +
              Number(
                purchase.totalAmount ??
                Number(purchase.quantity || 0) *
                  Number(purchase.purchasePrice || 0)
              ),
            0
          )
        )}
        detail="All saved purchases"
        icon="₹"
      />
    </div>

    {/* Purchase entry form */}
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <h3 className="text-lg font-bold sm:text-xl">Record a Purchase</h3>

      <p className="mb-5 mt-1 text-sm text-slate-500">
        Supplier se kharide gaye products ki details enter karo.
      </p>

      <StatusMessage />

      <form onSubmit={handlePurchaseSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="min-w-0">
            <label
              htmlFor="purchaseProduct"
              className="mb-2 block text-sm font-medium"
            >
              Select Product
            </label>

            <select
              id="purchaseProduct"
              value={purchaseProduct}
              onChange={(event) => setPurchaseProduct(event.target.value)}
              required
              className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-base"
            >
              <option value="">Choose a product</option>

              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} — Current Stock: {product.stock}
                </option>
              ))}
            </select>

            {products.length === 0 && (
              <p className="mt-2 text-sm text-amber-700">
                Purchase se pehle Products section mein product add karo.
              </p>
            )}
          </div>

          <div className="min-w-0">
            <label
              htmlFor="purchaseQuantity"
              className="mb-2 block text-sm font-medium"
            >
              Purchase Quantity
            </label>

            <input
              id="purchaseQuantity"
              type="number"
              min="1"
              step="1"
              value={purchaseQuantity}
              onChange={(event) =>
                setPurchaseQuantity(event.target.value)
              }
              required
              className="min-h-12 w-full rounded-xl border border-slate-300 px-3 py-3 text-base"
            />
          </div>

          <div className="min-w-0">
            <label
              htmlFor="purchasePrice"
              className="mb-2 block text-sm font-medium"
            >
              Purchase Price (₹ per item)
            </label>

            <input
              id="purchasePrice"
              type="number"
              min="0"
              step="0.01"
              value={purchasePrice}
              onChange={(event) => setPurchasePrice(event.target.value)}
              required
              className="min-h-12 w-full rounded-xl border border-slate-300 px-3 py-3 text-base"
            />
          </div>

          <div className="rounded-xl bg-blue-50 p-4">
            <p className="text-sm text-blue-700">Purchase Total</p>

            <p className="mt-1 break-words text-2xl font-bold text-blue-900">
              {formatCurrency(
                (Number(purchaseQuantity) || 0) *
                  (Number(purchasePrice) || 0)
              )}
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={purchaseSaving || products.length === 0}
          className="min-h-12 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {purchaseSaving ? "Saving Purchase..." : "Save Purchase"}
        </button>
      </form>
    </section>

    {/* Purchase history */}
    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-bold sm:text-xl">Purchase History</h3>
          <p className="mt-1 text-sm text-slate-500">
            MongoDB mein saved purchase records.
          </p>
        </div>

        <button
          type="button"
          onClick={loadPurchases}
          disabled={purchasesLoading}
          className="min-h-11 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50 disabled:opacity-60"
        >
          {purchasesLoading ? "Loading..." : "Refresh History"}
        </button>
      </div>

      {purchasesLoading ? (
        <p className="py-8 text-center text-sm text-slate-500">
          Purchase history load ho rahi hai...
        </p>
      ) : purchases.length === 0 ? (
        <p className="rounded-xl bg-slate-50 p-8 text-center text-sm text-slate-500">
          Abhi koi purchase record nahi hai.
        </p>
      ) : (
        <>
          {/* Mobile view: purchase cards */}
          <div className="space-y-3 md:hidden">
            {purchases.map((purchase) => (
              <article
                key={purchase._id || purchase.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="break-words font-semibold">
                      {purchase.productName ||
                        purchase.product?.name ||
                        "Product"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {purchase.createdAt
                        ? new Date(purchase.createdAt).toLocaleString("en-IN")
                        : "Date unavailable"}
                    </p>
                  </div>

                  <p className="shrink-0 font-bold text-blue-700">
                    {formatCurrency(
                      purchase.totalAmount ??
                        Number(purchase.quantity || 0) *
                          Number(purchase.purchasePrice || 0)
                    )}
                  </p>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 text-sm">
                  <div>
                    <p className="text-xs text-slate-500">Quantity</p>
                    <p className="mt-1 font-medium">{purchase.quantity}</p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Price per item</p>
                    <p className="mt-1 font-medium">
                      {formatCurrency(purchase.purchasePrice)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Desktop view: purchase table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Product</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Quantity</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 text-right font-semibold">Total</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {purchases.map((purchase) => (
                  <tr key={purchase._id || purchase.id}>
                    <td className="px-4 py-4 font-medium">
                      {purchase.productName ||
                        purchase.product?.name ||
                        "Product"}
                    </td>

                    <td className="px-4 py-4 text-slate-500">
                      {purchase.createdAt
                        ? new Date(purchase.createdAt).toLocaleDateString("en-IN")
                        : "—"}
                    </td>

                    <td className="px-4 py-4">{purchase.quantity}</td>

                    <td className="px-4 py-4">
                      {formatCurrency(purchase.purchasePrice)}
                    </td>

                    <td className="px-4 py-4 text-right font-semibold">
                      {formatCurrency(
                        purchase.totalAmount ??
                          Number(purchase.quantity || 0) *
                            Number(purchase.purchasePrice || 0)
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  </div>
)}

          {/* DASHBOARD MODULE */}
          
{/* CUSTOMERS MODULE */}
{active === "Customers" && (
  <section className="space-y-6">
    {/* Customers page ka heading */}
    <div>
      <h2 className="text-2xl font-bold">Customers</h2>
      <p className="mt-1 text-sm text-gray-500">
        Apne business ke customers manage karo.
      </p>
    </div>

    {/* Naya customer add karne ka form */}
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Add New Customer</h3>

      <form onSubmit={handleCustomerSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Customer Name *
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              placeholder="Enter customer name"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(event) => setCustomerPhone(event.target.value)}
              placeholder="Enter phone number"
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={(event) => setCustomerEmail(event.target.value)}
              placeholder="Enter email"
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Address
            </label>
            <input
              type="text"
              value={customerAddress}
              onChange={(event) => setCustomerAddress(event.target.value)}
              placeholder="Enter address"
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>
        </div>


<button
  type="submit"
  disabled={customerSaving}
  className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
>
  {customerSaving
    ? "Saving..."
    : editingCustomerId
      ? "Update Customer"
      : "Add Customer"}
</button>

{editingCustomerId && (
  <button
    type="button"
    onClick={handleCancelCustomerEdit}
    className="ml-2 rounded-lg border border-gray-300 px-5 py-2"
  >
    Cancel
  </button>
)}

      </form>
    </div>

    {/* Database se aayi customer list */}
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Customer List</h3>

      <input
        type="search"
        value={customerSearch}
        onChange={(event) => setCustomerSearch(event.target.value)}
        placeholder="Search by name, phone or email..."
        className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2"
      />

      {customersLoading ? (
        <p className="text-gray-500">Loading customers...</p>
      ) : customers.filter((customer) => {
          const search = customerSearch.trim().toLowerCase();

          return (
            String(customer.name || "").toLowerCase().includes(search) ||
            String(customer.phone || "").toLowerCase().includes(search) ||
            String(customer.email || "").toLowerCase().includes(search)
          );
        }).length === 0 ? (
        <p className="text-gray-500">Abhi koi customer nahi mila.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-3 py-3">Name</th>
                <th className="px-3 py-3">Phone</th>
                <th className="px-3 py-3">Email</th>
                <th className="px-3 py-3">Address</th>
                
              </tr>
            </thead>

            <tbody>
              {customers
                .filter((customer) => {
                  const search = customerSearch.trim().toLowerCase();

                  return (
                    String(customer.name || "").toLowerCase().includes(search) ||
                    String(customer.phone || "").toLowerCase().includes(search) ||
                    String(customer.email || "").toLowerCase().includes(search)
                  );
                })
                .map((customer) => (
                  <tr
                    key={customer.id || customer._id}
                    className="border-b last:border-0"
                  >
                    <td className="px-3 py-3 font-medium">
                      {customer.name}
                    </td>
                    <td className="px-3 py-3">{customer.phone || "—"}</td>
                    <td className="px-3 py-3">{customer.email || "—"}</td>
                    <td className="px-3 py-3">{customer.address || "—"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </section>
)}

          {active === "Dashboard" && (
            <div className="min-w-0 space-y-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <SummaryCard
                  label="Total Products"
                  value={products.length}
                  detail="Current inventory"
                  icon="▦"
                />
                <SummaryCard
                  label="Inventory Value"
                  value={formatCurrency(inventoryValue)}
                  detail="Price × stock"
                  icon="₹"
                />
                <SummaryCard
                  label="Low Stock Items"
                  value={lowStockCount}
                  detail="5 units or fewer"
                  icon="!"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
                  <h3 className="font-bold">Sales Overview</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Saved sales ka amount
                  </p>

                  <div className="mt-5 rounded-xl bg-blue-50 p-4 sm:p-5">
                    <p className="text-sm text-blue-700">Total recorded sales</p>
                    <p className="mt-2 break-words text-3xl font-bold text-blue-900">
                      {formatCurrency(
                        sales.reduce(
                          (total, sale) => total + Number(sale.totalAmount || 0),
                          0
                        )
                      )}
                    </p>
                    <p className="mt-2 text-sm text-blue-700">
                      {sales.length} saved sale record(s)
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActive("Sales")}
                    className="mt-5 min-h-11 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
                  >
                    Record a Sale / View History
                  </button>
                </section>

                <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="font-bold">Inventory Alerts</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Items with 5 or fewer units
                  </p>

                  <div className="mt-5 space-y-4">
                    {products.filter((product) => Number(product.stock) <= 5).length === 0 ? (
                      <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">
                        Abhi low-stock product nahi hai.
                      </p>
                    ) : (
                      products
                        .filter((product) => Number(product.stock) <= 5)
                        .slice(0, 5)
                        .map((product) => (
                          <div key={product.id} className="flex min-w-0 items-center justify-between gap-3">
                            <span className="min-w-0 break-words text-sm font-medium">
                              {product.name}
                            </span>
                            <span className="shrink-0 whitespace-nowrap rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
                              {product.stock} left
                            </span>
                          </div>
                        ))
                    )}

                    <button
                      type="button"
                      onClick={() => setActive("Products")}
                      className="min-h-11 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold hover:bg-slate-50"
                    >
                      Manage Inventory
                    </button>
                  </div>
                </section>
              </div>

              <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-bold">Recent Sales</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Latest saved transactions
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActive("Sales")}
                    className="min-h-11 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                  >
                    View All Sales
                  </button>
                </div>

                {sales.length === 0 ? (
                  <p className="mt-5 rounded-xl bg-slate-50 p-5 text-sm text-slate-500">
                    Abhi koi saved sale nahi hai.
                  </p>
                ) : (
                  <div className="mt-5 space-y-3">
                    {sales.slice(0, 5).map((sale) => (
                      <div
                        key={sale._id || sale.id}
                        className="flex min-w-0 items-start justify-between gap-3 border-b border-slate-100 pb-3 last:border-0"
                      >
                        <div className="min-w-0">
                          <p className="break-words text-sm font-semibold">
                            {sale.productName || sale.product?.name || "Product"}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            Qty: {sale.quantity}
                            {sale.createdAt
                              ? ` · ${new Date(sale.createdAt).toLocaleDateString("en-IN")}`
                              : ""}
                          </p>
                        </div>
                        <p className="shrink-0 text-sm font-bold">
                          {formatCurrency(sale.totalAmount)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          )}

          {/* Remaining modules abhi placeholders hain. */}
          {!["Dashboard", "Products", "Sales","Purchases"].includes(active) && (
            <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
                {menuItems.find((item) => item.name === active)?.icon}
              </div>

              <h3 className="text-xl font-bold">{active}</h3>
              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
                {active} module abhi placeholder hai. Ismein working forms aur database agle development steps mein add karenge.
              </p>

              <button
                type="button"
                onClick={() => setActive("Dashboard")}
                className="mt-6 min-h-11 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Back to Dashboard
              </button>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

