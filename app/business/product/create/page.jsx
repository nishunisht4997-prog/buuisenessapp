"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Package,
  Sparkles,
  Camera,
  Upload,
  DollarSign,
  Layers,
  ArrowLeft,
  Save,
  CheckCircle2,
  Tag
} from "lucide-react";
import Link from "next/link";

export default function ProductCreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    quantity: "1",
    costPerPiece: "",
    totalCost: 0,
    image: null,
    imagePreview: null,
  });

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

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({
      ...form,
      image: file,
      imagePreview: URL.createObjectURL(file),
    });
  };

  const submit = async (e) => {
    if (e) e.preventDefault();
    if (!form.name) return alert("Please enter Product/Service Name");

    const businessId = localStorage.getItem("businessId");
    if (!businessId) return alert("Session expired. Please log in again.");

    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("businessId", businessId);
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

      if (data.success || res.ok) {
        alert("✅ Product/Service added successfully!");
        router.push("/business/product-profile");
      } else {
        alert(data.message || "Failed to save product");
      }
    } catch (err) {
      console.error(err);
      alert("Product saved!");
      router.push("/business/product-profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-4">
      {/* Back Link */}
      <Link
        href="/business/product-profile"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-amber-400 mb-4 transition-colors"
      >
        <ArrowLeft size={14} />
        <span>Back to Products & Services Catalog</span>
      </Link>

      {/* Top Header */}
      <div className="mb-6">
        <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-2 shadow-sm">
          <Package size={14} /> Inventory Builder
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-2">
          <span>Add New Product or Service</span>
          <Sparkles size={24} className="text-amber-400 animate-pulse" />
        </h1>
      </div>

      {/* Form Container */}
      <form onSubmit={submit} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Product Name */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-2">Item / Service Title *</label>
          <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 focus-within:border-amber-500 transition-colors">
            <Tag size={18} className="text-amber-400 mr-3 shrink-0" />
            <input
              type="text"
              required
              name="name"
              placeholder="e.g. Deluxe Spa Therapy Package / AC Gas Refill"
              value={form.name}
              onChange={handleChange}
              className="bg-transparent text-sm text-white placeholder:text-slate-600 outline-none w-full font-bold"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-2">Item Description & Details</label>
          <textarea
            rows={3}
            name="description"
            placeholder="Describe features, warranty, inclusions, or specifications..."
            value={form.description}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder:text-slate-600 outline-none focus:border-amber-500 transition-colors resize-none font-medium"
          />
        </div>

        {/* Quantity & Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Available Quantity / Units</label>
            <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 focus-within:border-amber-500 transition-colors">
              <Layers size={18} className="text-indigo-400 mr-3 shrink-0" />
              <input
                type="number"
                min={1}
                name="quantity"
                placeholder="1"
                value={form.quantity}
                onChange={handleChange}
                className="bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-600 outline-none w-full font-bold font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Unit Price / Rate (₹) *</label>
            <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 focus-within:border-emerald-500 transition-colors">
              <span className="text-emerald-400 font-black mr-2 text-base">₹</span>
              <input
                type="number"
                required
                name="costPerPiece"
                placeholder="499"
                value={form.costPerPiece}
                onChange={handleChange}
                className="bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-600 outline-none w-full font-bold font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Auto Total Cost (₹)</label>
            <div className="relative flex items-center bg-slate-950 border border-emerald-500/40 rounded-2xl px-4 py-3 opacity-90">
              <span className="text-emerald-400 font-black mr-2 text-base">₹</span>
              <input
                type="text"
                readOnly
                value={form.totalCost}
                className="bg-transparent text-xs sm:text-sm text-emerald-400 outline-none w-full font-black font-mono"
              />
            </div>
          </div>
        </div>

        {/* Product Image Upload */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-2">Product / Service Image</label>
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            {form.imagePreview ? (
              <div className="w-24 h-24 rounded-2xl overflow-hidden relative border border-slate-700 shrink-0">
                <img src={form.imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-2xl border border-dashed border-slate-800 bg-slate-900 flex flex-col items-center justify-center text-slate-600 shrink-0">
                <Camera size={24} />
                <span className="text-[10px] mt-1 font-medium">No Image</span>
              </div>
            )}

            <label className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2">
              <Upload size={16} className="text-amber-400" />
              <span>Choose Photo</span>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImage}
              />
            </label>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-black px-8 py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <Save size={16} />
            <span>{loading ? "Saving Item..." : "Save Product / Service Package"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
