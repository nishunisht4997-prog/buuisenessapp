"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [businesses, setBusinesses] = useState([]);
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

        const data = res.data;
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
      });
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-300 to-purple-200 p-8 space-y-10">
      {/* =======================
          WELCOME HEADER
      ======================== */}
      <div className="bg-indigo-50
 rounded-2xl shadow p-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome Admin 👋</h1>
          <p className="text-gray-500 mt-2">
            Here’s what’s happening with your platform today.
          </p>
        </div>
        <div className="hidden md:block text-sm text-gray-400">
          Admin Dashboard
        </div>
      </div>

      {/* =======================
          STAT CARDS
      ======================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Total Businesses" value={stats.total} color="blue" />
        <StatCard title="Approved" value={stats.approved} color="green" />
        <StatCard title="Pending" value={stats.pending} color="yellow" />
        <StatCard title="Rejected" value={stats.rejected} color="red" />
        <StatCard title="Today’s Activity" value={stats.today} color="purple" />
      </div>

      {/* =======================
          BUSINESS TABLE
      ======================== */}
      <div className="bg-fuchsia-100 rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Business Listings
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-gray-500 text-sm">
                <th className="px-4">Business Name</th>
                <th className="px-4">Business ID</th>
                <th className="px-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {businesses.map((biz) => (
                <tr
                  key={biz.id}
                  className="bg-gray-50 hover:bg-white transition rounded-lg shadow-sm"
                >
                  <td className="px-4 py-4 font-medium text-gray-800 rounded-l-lg">
                    {biz.name}
                  </td>
                  <td className="px-4 py-4 text-gray-500">
                    {biz.businessCode}
                  </td>
                  <td className="px-4 py-4 rounded-r-lg">
                    <StatusBadge status={biz.status} />
                  </td>
                </tr>
              ))}

              {businesses.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-10 text-gray-400">
                    No business listings found
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

/* =======================
   STAT CARD
======================= */
function StatCard({ title, value, color }) {
  const map = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    yellow: "from-yellow-400 to-yellow-500",
    red: "from-red-500 to-red-600",
    purple: "from-purple-500 to-purple-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 hover:-translate-y-1 transition">
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${map[color]} text-white flex items-center justify-center mb-4`}
      >
        ●
      </div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  );
}

/* =======================
   STATUS BADGE
======================= */
function StatusBadge({ status }) {
  const map = {
    APPROVED: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    REJECTED: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-4 py-1.5 rounded-full text-sm font-semibold ${map[status]}`}
    >
      {status}
    </span>
  );
}
