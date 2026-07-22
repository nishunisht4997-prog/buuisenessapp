"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderTree, Plus, Edit, Trash2, Power } from "lucide-react";

export default function SubCategoryPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/subcategory");
      const json = await res.json();
      setData(Array.isArray(json) ? json : json.data || []);
    } catch (err) {
      console.error("Error loading subcategories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleStatus = async (id, status) => {
    await fetch(`/api/admin/subcategory/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: !status }),
    });
    loadData();
  };

  const deleteItem = async (id) => {
    if (!confirm("Are you sure you want to delete this sub-category?")) return;
    await fetch(`/api/admin/subcategory/${id}`, { method: "DELETE" });
    loadData();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <FolderTree size={24} className="text-indigo-400" />
            <span>Sub-Category Master Manager</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 font-medium">
            Manage sub-categories linked to parent categories.
          </p>
        </div>

        <Link
          href="/admin/sub-category/create"
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-orange-500/20 transition-all shrink-0"
        >
          <Plus size={16} />
          <span>Add Sub-Category</span>
        </Link>
      </div>

      {/* Sub-Categories Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-slate-400 font-medium animate-pulse">Loading sub-categories...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">#</th>
                  <th className="py-3.5 px-4">Parent Category</th>
                  <th className="py-3.5 px-4">Sub-Category Name</th>
                  <th className="py-3.5 px-4">Live Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/60 text-xs">
                {data.map((item, i) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4 font-mono text-slate-400">{i + 1}</td>

                    <td className="py-4 px-4 text-indigo-400 font-bold">
                      {item.category?.name || "N/A"}
                    </td>

                    <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 flex items-center justify-center font-black text-xs shrink-0">
                        {item.name?.charAt(0) || "S"}
                      </div>
                      <span>{item.name}</span>
                    </td>

                    <td className="py-4 px-4">
                      {item.status ? (
                        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          Active
                        </span>
                      ) : (
                        <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          Inactive
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/sub-category/${item.id}/edit`}
                          className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-extrabold px-3 py-1.5 rounded-xl text-xs border border-slate-700 transition-colors flex items-center gap-1"
                        >
                          <Edit size={13} /> Edit
                        </Link>

                        <button
                          onClick={() => toggleStatus(item.id, item.status)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1 transition-colors ${
                            item.status
                              ? "bg-slate-800 text-amber-400 border border-amber-500/30"
                              : "bg-emerald-500 text-slate-950"
                          }`}
                        >
                          <Power size={13} />
                          {item.status ? "Deactivate" : "Activate"}
                        </button>

                        <button
                          onClick={() => deleteItem(item.id)}
                          className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2.5 py-1.5 rounded-xl text-xs font-extrabold transition-colors flex items-center gap-1"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {data.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-12 text-slate-500 font-medium">
                      No sub-categories found in database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
