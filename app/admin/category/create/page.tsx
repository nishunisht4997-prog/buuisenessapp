"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCategory() {
  const [name, setName] = useState("");
  const router = useRouter();

  const saveCategory = async () => {
    if (!name.trim()) {
      alert("Category name is required");
      return;
    }

    await fetch("/api/admin/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    router.push("/admin/category");
  };

  return (
    <div className="p-6 max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Add Business Category
        </h2>
        <p className="text-sm text-gray-500">
          Create a new category for your business listing
        </p>
      </div>

      {/* Card */}
      <div className="bg-white shadow rounded-lg p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category Name
        </label>

        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={saveCategory}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Save Category
          </button>

          <button
            onClick={() => router.push("/admin/category")}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
