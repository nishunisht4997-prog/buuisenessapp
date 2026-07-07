"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AreaMaster() {
  const [areas, setAreas] = useState([]);

  const loadData = async () => {
    const res = await fetch("/api/admin/area");
    const data = await res.json();
    setAreas(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteArea = async (id) => {
    if (!confirm("Delete this area?")) return;
    await fetch(`/api/admin/area/${id}`, { method: "DELETE" });
    loadData();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Area Master</h2>
        <Link
          href="/admin/area-master/create"
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          + Add
        </Link>
      </div>

      <div className="bg-white shadow rounded">
        <table className="w-full">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-3 text-left">District</th>
              <th className="p-3 text-left">Area Name</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {areas.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-3">{a.district.name}</td>
                <td className="p-3">{a.name}</td>
                <td className="p-3 text-center space-x-2">
                  <Link
                    href={`/admin/area-master/${a.id}/edit`}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteArea(a.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {areas.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center p-6 text-gray-500">
                  No areas found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
