"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  Trash2,
  Edit,
  Sparkles,
  ShieldCheck,
  Tag,
  DollarSign,
  Layers,
  Box
} from "lucide-react";

export default function ProductProfilePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const businessId = localStorage.getItem("businessId");
    if (!businessId) {
      setLoading(false);
      return;
    }

    fetch(`/api/business/product/list?businessId=${businessId}`)
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const deleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product/service?")) return;

    try {
      await fetch("/api/business/product/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-4">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-slate-800 pb-6">
        <div>
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-2 shadow-sm">
            <Package size={14} /> Catalog & Inventory Manager
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Products & Services</span>
            <Sparkles size={24} className="text-amber-400 animate-pulse" />
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 font-medium">
            List your menu items, store products, or professional service packages for local buyers.
          </p>
        </div>

        <Link
          href="/business/product/create"
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black px-5 py-3 rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-orange-500/20 hover:scale-105 transition-all shrink-0"
        >
          <Plus size={18} />
          <span>Add New Product / Service</span>
        </Link>
      </div>

      {/* Catalog Table Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden relative">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-extrabold uppercase tracking-wider text-[10px] sm:text-xs">
                <th className="py-3.5 px-4">#</th>
                <th className="py-3.5 px-4">Product / Service</th>
                <th className="py-3.5 px-4">Stock Qty</th>
                <th className="py-3.5 px-4">Cost / Price</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/80">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-400 animate-pulse font-medium">
                    Loading inventory catalog...
                  </td>
                </tr>
              ) : products.length > 0 ? (
                products.map((p, i) => (
                  <tr key={p.id || i} className="hover:bg-slate-850/60 transition-colors group">
                    <td className="py-4 px-4 font-mono font-bold text-slate-500">{i + 1}</td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-800 shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 shrink-0">
                            <Box size={18} />
                          </div>
                        )}
                        <div>
                          <p className="font-black text-white group-hover:text-amber-400 transition-colors">{p.name}</p>
                          {p.description && (
                            <p className="text-[11px] text-slate-400 line-clamp-1 font-medium">{p.description}</p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-bold text-slate-300">
                      <span className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 font-mono text-xs">
                        {p.quantity || "1"} Units
                      </span>
                    </td>

                    <td className="py-4 px-4 font-black text-emerald-400 text-sm">
                      ₹{p.costPerPiece || p.cost || p.totalCost || "0"}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/business/product/${p.id}/edit`}
                          className="p-2 text-slate-300 hover:text-amber-400 hover:bg-slate-800 rounded-xl transition-colors border border-slate-800"
                          title="Edit Item"
                        >
                          <Edit size={16} />
                        </Link>

                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-2 text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors border border-slate-800 hover:border-rose-500/30"
                          title="Delete Item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-16 text-center">
                    <div className="max-w-sm mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                        <Package size={24} />
                      </div>
                      <h3 className="text-base font-black text-white">No Products or Services Added</h3>
                      <p className="text-xs text-slate-400 font-medium">
                        Click the button below to add your first product or service package.
                      </p>
                      <Link
                        href="/business/product/create"
                        className="inline-flex items-center gap-1.5 bg-slate-950 hover:bg-slate-800 text-amber-400 border border-slate-800 font-black text-xs px-4 py-2.5 rounded-xl transition-colors"
                      >
                        <Plus size={14} />
                        <span>Add Product Now</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
