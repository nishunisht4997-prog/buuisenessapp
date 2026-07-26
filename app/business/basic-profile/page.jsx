"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Phone,
  MessageCircle,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FolderTree,
  Save,
  CheckCircle2
} from "lucide-react";

export default function BusinessProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    categoryId: "",
    subCategoryId: "",
    address: "",
    displayNumber: "",
    whatsappNumber: "",
    sameAsDisplay: true,
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // 🔹 LOAD DATA
  useEffect(() => {
    const businessId = localStorage.getItem("businessId");
    if (!businessId) {
      router.push("/free-listing");
      return;
    }

    fetch(`/api/business/profile?id=${businessId}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data?.name || "",
          categoryId: data?.categoryId || "",
          subCategoryId: data?.subCategoryId || "",
          address: data?.address || "",
          displayNumber: data?.displayNumber || data?.phone || "",
          whatsappNumber: data?.whatsappNumber || data?.phone || "",
          sameAsDisplay: true,
        });

        if (data?.categoryId) loadSubCategory(data.categoryId);
      })
      .catch((err) => console.error(err));

    fetch("/api/admin/category")
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  }, []);

  const loadSubCategory = async (id) => {
    try {
      const res = await fetch(`/api/admin/subcategory?categoryId=${id}`);
      const data = await res.json();
      setSubCategories(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 SAVE PROFILE
  const saveProfile = async (e) => {
    if (e) e.preventDefault();
    if (!form.name) return alert("Please enter Business Name");

    setLoading(true);
    try {
      const res = await fetch("/api/business/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success !== false) {
        setSavedSuccess(true);
        setTimeout(() => {
          router.push("/business/website");
        }, 1200);
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4">
      {/* Top Banner Header */}
      <div className="mb-8">
        <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-3 shadow-sm">
          <ShieldCheck size={14} /> Merchant Identity Settings
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-2">
          <span>Business Profile</span>
          <Sparkles size={24} className="text-amber-400 animate-pulse" />
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1 font-medium">
          Manage your store name, primary categories, address, and customer contact details.
        </p>
      </div>

      {/* Success Alert Banner */}
      {savedSuccess && (
        <div className="mb-6 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 px-5 py-3 rounded-2xl text-xs font-black flex items-center gap-2 animate-in zoom-in-95 duration-200">
          <CheckCircle2 size={18} />
          <span>Business Profile Saved Successfully! Redirecting to Website Settings...</span>
        </div>
      )}

      {/* Glassmorphic Form Card */}
      <form onSubmit={saveProfile} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Business Name */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-2">Business / Store Name *</label>
          <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 focus-within:border-amber-500 transition-colors">
            <Building2 size={18} className="text-amber-400 mr-3 shrink-0" />
            <input
              type="text"
              required
              name="name"
              placeholder="e.g. Swosti Grand Hotel & Resort"
              value={form.name}
              onChange={handleChange}
              className="bg-transparent text-sm text-white placeholder:text-slate-600 outline-none w-full font-bold"
            />
          </div>
        </div>

        {/* Category & Subcategory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Primary Category *</label>
            <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 focus-within:border-amber-500 transition-colors">
              <FolderTree size={18} className="text-amber-400 mr-3 shrink-0" />
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={(e) => {
                  handleChange(e);
                  loadSubCategory(e.target.value);
                }}
                className="bg-transparent text-xs sm:text-sm text-white outline-none w-full font-medium cursor-pointer"
              >
                <option value="" className="bg-slate-900 text-white">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                    {c.name}
                  </option>
                ))}
                {categories.length === 0 && (
                  <>
                    <option value="cat-1" className="bg-slate-900 text-white">Restaurants & Fine Dining</option>
                    <option value="cat-2" className="bg-slate-900 text-white">Hotels & Luxury Stays</option>
                    <option value="cat-3" className="bg-slate-900 text-white">Beauty & Wellness Spa</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Sub Category</label>
            <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 focus-within:border-amber-500 transition-colors">
              <FolderTree size={18} className="text-indigo-400 mr-3 shrink-0" />
              <select
                name="subCategoryId"
                value={form.subCategoryId}
                onChange={handleChange}
                className="bg-transparent text-xs sm:text-sm text-white outline-none w-full font-medium cursor-pointer"
              >
                <option value="" className="bg-slate-900 text-white">Select Sub Category</option>
                {subCategories.map((sc) => (
                  <option key={sc.id} value={sc.id} className="bg-slate-900 text-white">
                    {sc.name}
                  </option>
                ))}
                {subCategories.length === 0 && (
                  <>
                    <option value="sub-1" className="bg-slate-900 text-white">Luxury Suites</option>
                    <option value="sub-2" className="bg-slate-900 text-white">Banquet & Convention</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-2">Full Store Address</label>
          <div className="relative flex items-start bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 focus-within:border-amber-500 transition-colors">
            <MapPin size={18} className="text-amber-400 mr-3 mt-0.5 shrink-0" />
            <textarea
              rows={3}
              name="address"
              placeholder="Plot No, Street, Landmark, Area, Pincode..."
              value={form.address}
              onChange={handleChange}
              className="bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-600 outline-none w-full font-medium resize-none"
            />
          </div>
        </div>

        {/* Numbers Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-800">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Customer Display Phone</label>
            <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 focus-within:border-amber-500 transition-colors">
              <Phone size={18} className="text-emerald-400 mr-3 shrink-0" />
              <input
                type="text"
                name="displayNumber"
                placeholder="+91 98765 43210"
                value={form.displayNumber}
                onChange={(e) =>
                  setForm({
                    ...form,
                    displayNumber: e.target.value,
                    whatsappNumber: form.sameAsDisplay ? e.target.value : form.whatsappNumber,
                  })
                }
                className="bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-600 outline-none w-full font-mono font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">WhatsApp Contact Number</label>
            <div className={`relative flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 transition-colors ${
              form.sameAsDisplay ? "opacity-60 cursor-not-allowed" : "focus-within:border-emerald-500"
            }`}>
              <MessageCircle size={18} className="text-emerald-400 mr-3 shrink-0" />
              <input
                type="text"
                name="whatsappNumber"
                disabled={form.sameAsDisplay}
                placeholder="+91 98765 43210"
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                className="bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-600 outline-none w-full font-mono font-bold"
              />
            </div>

            <label className="flex items-center gap-2 mt-2.5 text-xs text-slate-400 font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={form.sameAsDisplay}
                onChange={(e) =>
                  setForm({
                    ...form,
                    sameAsDisplay: e.target.checked,
                    whatsappNumber: e.target.checked ? form.displayNumber : "",
                  })
                }
                className="w-4 h-4 rounded accent-amber-500 cursor-pointer"
              />
              <span>Same as Customer Display Phone</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black px-8 py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl shadow-orange-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <Save size={16} />
            <span>{loading ? "Saving Profile..." : "Save Profile & Continue"}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
