"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateSubCategory() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    fetch("/api/admin/category")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  const save = async () => {
    await fetch("/api/admin/subcategory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, categoryId, status: true }),
    });

    router.push("/admin/sub-category");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Add Business Sub Category</h2>

      <div className="bg-white p-6 rounded shadow max-w-xl">
        <div className="mb-4">
          <label className="font-semibold">Category</label>
          <select
            className="w-full border p-2 rounded"
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="font-semibold">Sub Category Name</label>
          <input
            className="w-full border p-2 rounded"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter sub category"
          />
        </div>

        <button
          onClick={save}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Save Sub Category
        </button>
      </div>
    </div>
  );
}
