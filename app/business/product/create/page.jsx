"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductProfilePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    quantity: "",
    costPerPiece: "",
    totalCost: 0,
    image: null,
    imagePreview: null,
  });

  // 🔢 LIVE TOTAL COST
  const calculateTotal = (qty, cost) =>
    (Number(qty) || 0) * (Number(cost) || 0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = {
      ...form,
      [name]: value,
    };

    if (name === "quantity" || name === "costPerPiece") {
      updated.totalCost = calculateTotal(
        name === "quantity" ? value : form.quantity,
        name === "costPerPiece" ? value : form.costPerPiece
      );
    }

    setForm(updated);
  };

  // 🖼 IMAGE HANDLER
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({
      ...form,
      image: file,
      imagePreview: URL.createObjectURL(file),
    });
  };

  const submit = async () => {
    const fd = new FormData();
    fd.append("businessId", localStorage.getItem("businessId"));
    fd.append("name", form.name);
    fd.append("description", form.description);
    fd.append("quantity", form.quantity);
    fd.append("costPerPiece", form.costPerPiece);
    fd.append("totalCost", form.totalCost);

    if (form.image) fd.append("image", form.image);

    const res = await fetch("/api/business/product/create", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Product added successfully");
      router.refresh();
    } else {
      alert(data.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>

      <input
        className="input"
        placeholder="Product Name"
        name="name"
        onChange={handleChange}
      />

      <textarea
        className="input"
        placeholder="Description"
        name="description"
        onChange={handleChange}
      />

      <input
        className="input"
        type="number"
        placeholder="Quantity"
        name="quantity"
        onChange={handleChange}
      />

      <input
        className="input"
        type="number"
        placeholder="Cost per piece (₹)"
        name="costPerPiece"
        onChange={handleChange}
      />

      {/* 🔥 AUTO TOTAL */}
      <input
        className="input bg-gray-100 font-semibold"
        readOnly
        value={`Total Cost: ₹${form.totalCost}`}
      />

      {/* 🖼 IMAGE UPLOAD */}
      <div className="mt-3">
        <label className="block text-sm font-medium mb-1">Product Image</label>

        <input type="file" accept="image/*" onChange={handleImage} />

        {form.imagePreview && (
          <img
            src={form.imagePreview}
            alt="Preview"
            className="mt-3 w-32 h-32 object-cover rounded-lg border"
          />
        )}
      </div>

      <button
        onClick={submit}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Save Product
      </button>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}
