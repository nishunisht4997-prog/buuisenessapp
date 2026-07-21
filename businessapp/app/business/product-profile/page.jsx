"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductProfilePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const businessId = localStorage.getItem("businessId");
    if (!businessId) return;

    fetch(`/api/business/product/list?businessId=${businessId}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;

    await fetch("/api/business/product/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Product / Service Profile</h1>

        <Link
          href="/business/product/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add
        </Link>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">#</th>
            <th className="p-2">Product</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Cost</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p, i) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.quantity}</td>
              <td className="p-2">₹{p.cost}</td>
              <td className="p-2 space-x-2">
                <Link
                  href={`/business/product/${p.id}/edit`}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteProduct(p.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No products added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
