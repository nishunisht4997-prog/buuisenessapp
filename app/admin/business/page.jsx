"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminBusinessList() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/business/list")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBusinesses(data.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6">Loading businesses...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Business Listing</h1>

      {businesses.length === 0 ? (
        <p className="text-gray-500">No businesses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {businesses.map((biz) => (
            <div
              key={biz.id}
              onClick={() => router.push(`/admin/business/${biz.id}`)}
              className="cursor-pointer bg-white rounded-xl shadow border hover:shadow-lg transition"
            >
              <div className="p-5 space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  {biz.name}
                </h2>

                <p className="text-sm text-gray-500">
                  Business ID:{" "}
                  <span className="font-medium">{biz.businessCode}</span>
                </p>

                <p className="text-sm text-gray-500">
                  Phone: <span className="font-medium">{biz.phone}</span>
                </p>

                <div className="pt-2">
                  <StatusBadge status={biz.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 🔹 Status badge (same page, no external dependency)
function StatusBadge({ status }) {
  const colors = {
    PENDING: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
    BLOCKED: "bg-gray-200 text-gray-700",
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
        colors[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}
