"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Plus, Edit, Trash2 } from "lucide-react";

export default function DistrictMaster() {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/district");
      const data = await res.json();
      setDistricts(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Error loading districts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteDistrict = async (id) => {
    if (!confirm("Are you sure you want to delete this district?")) return;
    await fetch(`/api/admin/district/${id}`, { method: "DELETE" });
    loadData();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <MapPin size={24} className="text-amber-400" />
            <span>District Master Manager</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 font-medium">
            Manage districts linked to states (e.g. Khurda, Cuttack, Puri, Rourkela).
          </p>
        </div>

        <Link
          href="/admin/district-master/create"
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-orange-500/20 transition-all shrink-0"
        >
          <Plus size={16} />
          <span>Add District</span>
        </Link>
      </div>

      {/* Districts Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-slate-400 font-medium animate-pulse">Loading districts...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">#</th>
                  <th className="py-3.5 px-4">State</th>
                  <th className="py-3.5 px-4">District Name</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/60 text-xs">
                {districts.map((d, i) => (
                  <tr key={d.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4 font-mono text-slate-400">{i + 1}</td>

                    <td className="py-4 px-4 text-cyan-400 font-bold">
                      {d.state?.name || "N/A"}
                    </td>

                    <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-black text-xs shrink-0">
                        {d.name?.charAt(0) || "D"}
                      </div>
                      <span>{d.name}</span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/district-master/${d.id}/edit`}
                          className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-extrabold px-3 py-1.5 rounded-xl text-xs border border-slate-700 transition-colors flex items-center gap-1"
                        >
                          <Edit size={13} /> Edit
                        </Link>

                        <button
                          onClick={() => deleteDistrict(d.id)}
                          className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2.5 py-1.5 rounded-xl text-xs font-extrabold transition-colors flex items-center gap-1"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {districts.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-12 text-slate-500 font-medium">
                      No districts found in database.
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
