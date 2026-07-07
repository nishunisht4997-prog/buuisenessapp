"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);

  // ✅ FETCH ALL CATEGORIES
  const loadData = async () => {
   const res = await fetch("/api/admin/category", { cache: "no-store" });
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // ✅ TOGGLE ACTIVE / INACTIVE
  const toggleStatus = async (id, status) => {
    await fetch(`/api/admin/category/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: !status }),
    });

    loadData();
  };

  // ✅ DELETE CATEGORY
  const deleteCategory = async (id) => {
    if (!confirm("Are you sure?")) return;

    await fetch(`/api/admin/category/${id}`, {
      method: "DELETE",
    });

    loadData();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Business Categories</h2>

        <Link
          href="/admin/category/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Category
        </Link>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">#</th>
            <th className="p-3">Name</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat, i) => (
            <tr key={cat.id} className="border-t text-center">
              <td className="p-3">{i + 1}</td>

              <td className="p-3">{cat.name}</td>

              {/* STATUS TEXT ONLY */}
              <td className="p-3 font-semibold">
                {cat.status ? (
                  <span className="text-green-600">Active</span>
                ) : (
                  <span className="text-red-600">Inactive</span>
                )}
              </td>

              {/* ACTION BUTTONS */}
              <td className="p-3 space-x-2">
                {/* Edit */}
                <Link
                  href={`/admin/category/${cat.id}/edit`}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </Link>

                {/* Activate / Deactivate */}
                <button
                  onClick={() => toggleStatus(cat.id, cat.status)}
                  className={`px-3 py-1 rounded text-white ${
                    cat.status ? "bg-orange-500" : "bg-green-600"
                  }`}
                >
                  {cat.status ? "Deactivate" : "Activate"}
                </button>

                {/* Delete */}
                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
