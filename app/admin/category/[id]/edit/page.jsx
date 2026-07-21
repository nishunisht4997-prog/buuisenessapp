"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditCategory() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCategory = async () => {
      try {
        const res = await fetch(`/api/admin/category/${id}`);
        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.json();
        setName(data.name);

        setLoading(false); // ✅ VERY IMPORTANT
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Category not found");
        setLoading(false); // ✅ also stop loading on error
      }
    };

    fetchCategory();
  }, [id]);

  const updateCategory = async () => {
    await fetch(`/api/admin/category/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    router.push("/admin/category");
  };

  if (loading) {
    return <div className="p-6">Loading category...</div>;
  }

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl">
      <h2 className="text-xl font-bold mb-4">Edit Category</h2>

      <input
        className="border p-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="mt-4 flex gap-3">
        <button
          onClick={updateCategory}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>

        <button
          onClick={() => router.back()}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
