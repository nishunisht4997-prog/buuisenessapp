"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SubCategoryPage() {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const res = await fetch("/api/admin/subcategory");
    const json = await res.json();
    setData(json);
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
    if (!confirm("Delete this sub category?")) return;
    await fetch(`/api/admin/subcategory/${id}`, { method: "DELETE" });
    loadData();
  };

  return (
    <div className="p-6">
    
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Business Sub Category</h2>
        <Link
          href="/admin/sub-category/create"
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          + Add
        </Link>
      </div>

    
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Sub Category</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, i) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{item.category?.name}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3 font-semibold text-green-600">
                  {item.status ? "Active" : "Inactive"}
                </td>
                <td className="p-3 text-center space-x-2">
                  <Link
                    href={`/admin/sub-category/${item.id}/edit`}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => toggleStatus(item.id, item.status)}
                    className="bg-orange-500 text-white px-3 py-1 rounded"
                  >
                    {item.status ? "Deactivate" : "Activate"}
                  </button>

                  <button
                    onClick={() => deleteItem(item.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No Sub Categories Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
