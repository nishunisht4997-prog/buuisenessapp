"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  CheckCircle2,
  Clock,
  XCircle,
  Activity,
  ShieldCheck,
  Search,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  UserCheck
} from "lucide-react";

export default function AdminDashboard() {
  const [businesses, setBusinesses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
    today: 0,
  });

  useEffect(() => {
    fetch("/api/admin/business/list")
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) return;

        const data = res.data || [];
        setBusinesses(data);

        const today = new Date().toDateString();

        setStats({
          total: data.length,
          approved: data.filter((b) => b.status === "APPROVED").length,
          pending: data.filter((b) => b.status === "PENDING").length,
          rejected: data.filter((b) => b.status === "REJECTED").length,
          today: data.filter(
            (b) => new Date(b.createdAt).toDateString() === today
          ).length,
        });
      })
      .catch((err) => console.error("Admin stats fetch error:", err));
  }, []);

  const filteredBusinesses = businesses.filter(
    (b) =>
      b.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.businessCode?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 🔹 Welcome Admin Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome Super Admin 👋
            </h1>
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck size={13} /> Live System
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 font-medium">
            Real-time platform statistics, business approval queues, and master categories management.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => (window.location.href = "/admin/business")}
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs shadow-md flex items-center gap-1.5 transition-all"
          >
            <UserCheck size={16} /> Manage Approvals
          </button>
        </div>
      </div>

      {/* 🔹 Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Listings"
          value={stats.total}
          icon={Building2}
          iconColor="text-indigo-400"
          bgColor="bg-indigo-500/10"
        />
        <StatCard
          title="Approved"
          value={stats.approved}
          icon={CheckCircle2}
          iconColor="text-emerald-400"
          bgColor="bg-emerald-500/10"
        />
        <StatCard
          title="Pending Queue"
          value={stats.pending}
          icon={Clock}
          iconColor="text-amber-400"
          bgColor="bg-amber-500/10"
        />
        <StatCard
          title="Rejected"
          value={stats.rejected}
          icon={XCircle}
          iconColor="text-rose-400"
          bgColor="bg-rose-500/10"
        />
        <StatCard
          title="Today's Activity"
          value={stats.today}
          icon={Activity}
          iconColor="text-purple-400"
          bgColor="bg-purple-500/10"
        />
      </div>

      {/* 🔹 Business Listings Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Building2 size={20} className="text-emerald-400" />
              <span>Platform Business Listings</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">Recent merchant registrations and verification status</p>
          </div>

          {/* Table Search Input */}
          <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 w-full sm:w-64 focus-within:border-emerald-500 transition-all">
            <Search size={16} className="text-slate-500 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search business..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-white placeholder:text-slate-500 outline-none w-full font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Business Name</th>
                <th className="py-3 px-4">Code / ID</th>
                <th className="py-3 px-4">Registered Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredBusinesses.map((biz) => (
                <tr key={biz.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-800/60 text-indigo-300 font-extrabold flex items-center justify-center shrink-0">
                      {biz.name?.charAt(0) || "B"}
                    </div>
                    <span>{biz.name}</span>
                  </td>
                  <td className="py-4 px-4 text-slate-400 font-mono">
                    {biz.businessCode || biz.id?.slice(0, 8)}
                  </td>
                  <td className="py-4 px-4 text-slate-400 font-medium">
                    {biz.createdAt ? new Date(biz.createdAt).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={biz.status || "APPROVED"} />
                  </td>
                </tr>
              ))}

              {filteredBusinesses.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-12 text-slate-500 font-medium">
                    No business listings found matching search.
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

function StatCard({ title, value, icon: Icon, iconColor, bgColor }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-xs font-semibold">{title}</p>
        <p className="text-2xl font-black text-white mt-1">{value}</p>
      </div>
      <div className={`w-11 h-11 rounded-xl ${bgColor} ${iconColor} flex items-center justify-center shrink-0`}>
        <Icon size={20} />
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    APPROVED: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    PENDING: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    REJECTED: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold border uppercase tracking-wider ${map[status] || map.APPROVED}`}>
      {status}
    </span>
  );
}
