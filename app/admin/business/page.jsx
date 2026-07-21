"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  Phone,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  ShieldCheck,
  UserCheck
} from "lucide-react";

export default function AdminBusinessPage() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTab, setFilterTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBusinesses = () => {
    setLoading(true);
    fetch("/api/admin/business/list")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBusinesses(data.data || []);
        } else {
          setBusinesses([]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const approveBusiness = async (id) => {
    try {
      const res = await fetch("/api/admin/business/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert("Business Approved Successfully!");
        fetchBusinesses();
      } else {
        alert("Failed to approve business");
      }
    } catch (err) {
      console.error(err);
      alert("Error approving business");
    }
  };

  const filtered = businesses.filter((b) => {
    const matchesSearch =
      b.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone?.includes(searchQuery);
    
    if (filterTab === "PENDING") return matchesSearch && (b.status === "PENDING" || !b.status);
    if (filterTab === "APPROVED") return matchesSearch && (b.status === "APPROVED" || b.status === true);
    return matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Building2 size={24} className="text-emerald-400" />
            <span>Business Verification Queue</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 font-medium">
            Review and approve pending merchant listings to publish them live on ApnaBiz directory.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-emerald-400 font-bold">
          <ShieldCheck size={16} />
          <span>{businesses.length} Total Registered</span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {["ALL", "PENDING", "APPROVED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                filterTab === tab
                  ? "bg-emerald-500 text-slate-950 shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-2xl px-3.5 py-2 w-full sm:w-72 focus-within:border-emerald-500 transition-all">
          <Search size={16} className="text-slate-500 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search by business name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-white placeholder:text-slate-500 outline-none w-full font-medium"
          />
        </div>
      </div>

      {/* Business Listings Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-slate-400 font-medium">Loading business queue...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Business Name</th>
                  <th className="py-3.5 px-4">Phone Number</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filtered.map((business) => {
                  const isApproved = business.status === "APPROVED" || business.status === true;
                  return (
                    <tr key={business.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-4 font-bold text-white flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 text-indigo-400 font-black flex items-center justify-center shrink-0 text-sm">
                          {business.name?.charAt(0) || "B"}
                        </div>
                        <span>{business.name}</span>
                      </td>

                      <td className="py-4 px-4 text-slate-300 font-medium">
                        <span className="inline-flex items-center gap-1.5">
                          <Phone size={13} className="text-slate-500" />
                          {business.phone || "N/A"}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        {isApproved ? (
                          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
                            <CheckCircle2 size={12} /> Approved
                          </span>
                        ) : (
                          <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
                            <Clock size={12} /> Pending Review
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 text-right">
                        {!isApproved ? (
                          <button
                            onClick={() => approveBusiness(business.id)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-4 py-1.5 rounded-xl text-xs shadow-md transition-all inline-flex items-center gap-1"
                          >
                            <UserCheck size={14} /> Approve Now
                          </button>
                        ) : (
                          <span className="text-slate-500 font-semibold text-xs">Verified ✓</span>
                        )}
                      </td>
                    </tr>
                  );
                })}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-12 text-slate-500 font-medium">
                      No business listings found in this queue.
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
