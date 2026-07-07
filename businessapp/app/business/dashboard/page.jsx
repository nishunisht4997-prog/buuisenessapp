"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const businessId = localStorage.getItem("businessId");

    // ❌ No business → send to registration
    if (!businessId) {
      window.location.href = "/free-listing/register";
      return;
    }

    fetch(`/api/admin/business/get?id=${businessId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("BUSINESS DATA:", data); // ✅ debug

        if (data.success) {
          setBusiness(data.data);
        } else {
          setBusiness(null);
        }
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        setBusiness(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔄 Loading state
  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  // ❌ If API failed or no business
  if (!business) {
    return <p className="p-6 text-red-500">Business info not found</p>;
  }

  return (
    <div className="space-y-6">
      {/* WELCOME */}
      <div className="bg-fuchsia-50 p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold">Welcome 👋</h1>
        <p className="text-gray-500 mt-1">
          Start listing your business and reach more customers 🚀
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl shadow bg-fuchsia-50">
          <h2 className="text-xl font-bold">Start Your Business Journey</h2>
          <p className="text-sm mt-2">
            Add your business details to get discovered.
          </p>
          <button className="mt-4 bg-lime-600 text-white px-4 py-2 rounded-lg">
            Start Listing →
          </button>
        </div>

        <div className="bg-fuchsia-50 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-3">
            Why List Your Business?
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>✅ Reach more customers</li>
            <li>✅ Increase visibility</li>
            <li>✅ Get verified</li>
            <li>✅ Manage easily</li>
          </ul>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Stat title="Categories" value="12+" />
        <Stat title="Leads" value="245+" />
        <Stat title="Views" value="1.2K" />
        <Stat title="Rating" value="4.8 ⭐" />
      </div>

      {/* ✅ BUSINESS INFO (NOW WORKS) */}
      <div className="p-6 rounded-xl shadow bg-fuchsia-50">
        <h2 className="text-lg font-medium text-cyan-800 mb-4">
          Business Info
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <b>Name:</b> {business.name}
          </p>
          <p>
            <b>Phone:</b> {business.phone}
          </p>
          <p>
            <b>Category:</b> {business.category?.name}
          </p>
          <p>
            <b>Status:</b> {business.status}
          </p>
          <p>
            <b>Location:</b> {business.district?.name}, {business.state?.name}
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-fuchsia-50 p-5 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold text-lime-500">{value}</p>
    </div>
  );
}
