"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DistrictMaster() {
  const [districts, setDistricts] = useState([]);

  const loadData = async () => {
    const res = await fetch("/api/admin/district");
    const data = await res.json();
    setDistricts(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteDistrict = async (id) => {
    if (!confirm("Delete this district?")) return;
    await fetch(`/api/admin/district/${id}`, { method: "DELETE" });
    loadData();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">District Master</h2>
        <Link
          href="/admin/district-master/create"
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          + Add
        </Link>
      </div>

      <div className="bg-white shadow rounded">
        <table className="w-full">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-3 text-left">State</th>
              <th className="p-3 text-left">District</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {districts.map((d) => (
              <tr key={d.id} className="border-t">
                <td className="p-3">{d.state.name}</td>
                <td className="p-3">{d.name}</td>
                <td className="p-3 text-center space-x-2">
                  <Link
                    href={`/admin/district-master/${d.id}/edit`}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteDistrict(d.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {districts.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center p-6 text-gray-500">
                  No districts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
