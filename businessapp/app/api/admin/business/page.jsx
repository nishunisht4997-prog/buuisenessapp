"use client";

import { useEffect, useState } from "react";

export default function AdminBusinessPage() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    fetch("/api/admin/business")
      .then((res) => res.json())
      .then((data) => setBusinesses(data));
  }, []);

  const approveBusiness = async (id) => {
    const res = await fetch("/api/admin/business/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      alert("Business Approved");
      location.reload();
    } else {
      alert("Failed to approve");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Business List</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {businesses.map((business) => (
            <tr key={business.id} className="border-t">
              <td className="p-2">{business.name}</td>
              <td className="p-2">{business.phone}</td>
              <td className="p-2">
                {business.status ? "Approved" : "Pending"}
              </td>
              <td className="p-2">
                {!business.status && (
                  <button
                    onClick={() => approveBusiness(business.id)}
                    className="bg-green-600 text-white px-4 py-1 rounded"
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
