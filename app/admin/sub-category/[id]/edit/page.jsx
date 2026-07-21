"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditSubCategory() {
  const { id } = useParams();
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const catRes = await fetch("/api/admin/category");
      const catData = await catRes.json();
      setCategories(catData);

      const res = await fetch(`/api/admin/subcategory/${id}`);
      const data = await res.json();

      setName(data.name);
      setCategoryId(data.categoryId);
      setStatus(data.status);

      setLoading(false);
    };

    loadData();
  }, [id]);

  const updateSubCategory = async () => {
    await fetch(`/api/admin/subcategory/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, categoryId, status }),
    });

    router.push("/admin/sub-category");
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
   
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Edit Business Sub Category
        </h2>
        <p className="text-gray-500">Update sub category details below</p>
      </div>

  
      <div className="bg-white shadow rounded-lg p-6 max-w-xl">
      
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Choose Category
          </label>
          <select
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

    
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Sub Category Name
          </label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter sub category name"
          />
        </div>

      
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1">Status</label>
          <select
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={status ? "1" : "0"}
            onChange={(e) => setStatus(e.target.value === "1")}
          >
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>

       
        <div className="flex gap-4">
          <button
            onClick={updateSubCategory}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Update
          </button>

          <button
            onClick={() => router.back()}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
