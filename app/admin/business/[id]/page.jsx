"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Building2,
  Phone,
  MapPin,
  Tag,
  ShieldCheck,
  Clock,
  ArrowLeft,
  Save,
  CheckCircle2,
  XCircle,
  Image as ImageIcon,
  Sparkles,
  DollarSign
} from "lucide-react";

export default function AdminBusinessDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [areas, setAreas] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    businessCode: "",
    phone: "",
    address: "",
    categoryId: "",
    subCategoryId: "",
    stateId: "",
    districtId: "",
    areaId: "",
    storeImage: "",
    operatingHours: "09:00 AM - 10:00 PM",
    priceLevel: "₹1,200 approx",
    status: "APPROVED",
    isVerified: true,
  });

  // Load Masters & Business Details
  useEffect(() => {
    // Load Categories
    fetch("/api/admin/category")
      .then((r) => r.json())
      .then((d) => setCategories(d.data || []))
      .catch(() => {});

    // Load States
    fetch("/api/admin/state")
      .then((r) => r.json())
      .then((d) => setStates(d.data || []))
      .catch(() => {});

    // Load Business
    fetch(`/api/admin/business/get?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          const b = data.data;
          setFormData({
            id: b.id,
            name: b.name || "",
            businessCode: b.businessCode || "",
            phone: b.phone || "",
            address: b.address || "",
            categoryId: b.categoryId || "",
            subCategoryId: b.subCategoryId || "",
            stateId: b.stateId || "",
            districtId: b.districtId || "",
            areaId: b.areaId || "",
            storeImage: b.storeImage || "",
            operatingHours: b.operatingHours || "09:00 AM - 10:00 PM",
            priceLevel: b.priceLevel || "₹1,200 approx",
            status: b.status || "APPROVED",
            isVerified: b.isVerified ?? true,
          });
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Load SubCategories when Category changes
  useEffect(() => {
    if (formData.categoryId) {
      fetch(`/api/admin/subcategory?categoryId=${formData.categoryId}`)
        .then((r) => r.json())
        .then((d) => setSubCategories(d.data || []))
        .catch(() => {});
    }
  }, [formData.categoryId]);

  // Load Districts when State changes
  useEffect(() => {
    if (formData.stateId) {
      fetch(`/api/admin/district?stateId=${formData.stateId}`)
        .then((r) => r.json())
        .then((d) => setDistricts(d.data || []))
        .catch(() => {});
    }
  }, [formData.stateId]);

  // Load Areas when District changes
  useEffect(() => {
    if (formData.districtId) {
      fetch(`/api/admin/area?districtId=${formData.districtId}`)
        .then((r) => r.json())
        .then((d) => setAreas(d.data || []))
        .catch(() => {});
    }
  }, [formData.districtId]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/admin/business/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Business listing details saved successfully!");
        router.push("/admin/business");
      } else {
        alert(data.message || "Failed to update business listing");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving business details");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 font-medium animate-pulse">
        Loading business editor details...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* 🔹 Top Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Go Back"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Building2 size={22} className="text-amber-400" />
              <span>Edit Business Listing</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              ID: <span className="font-mono text-amber-400">{formData.businessCode || id}</span>
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-orange-500/20 disabled:opacity-60 transition-all"
        >
          <Save size={16} />
          <span>{saving ? "Saving Changes..." : "Save Listing"}</span>
        </button>
      </div>

      {/* 🔹 Main Form Grid */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Basic Info & Image Preview */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* General Information Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-black text-white uppercase tracking-wider text-amber-400 flex items-center gap-1.5 border-b border-slate-800 pb-3">
              <Building2 size={16} />
              <span>General Business Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5">Business Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-500 font-bold"
                  placeholder="e.g. Swosti Grand Hotel"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5">Phone / WhatsApp Contact</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-500 font-medium"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5">Operating Hours</label>
                <input
                  type="text"
                  value={formData.operatingHours}
                  onChange={(e) => handleChange("operatingHours", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-500 font-medium"
                  placeholder="09:00 AM - 10:00 PM"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5">Estimated Rate / Price Level</label>
                <input
                  type="text"
                  value={formData.priceLevel}
                  onChange={(e) => handleChange("priceLevel", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-500 font-medium"
                  placeholder="e.g. ₹1,200 approx / night"
                />
              </div>
            </div>
          </div>

          {/* Category & Location Master Mapping */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-black text-white uppercase tracking-wider text-indigo-400 flex items-center gap-1.5 border-b border-slate-800 pb-3">
              <Tag size={16} />
              <span>Category & Location Mapping</span>
            </h2>

            {/* Category Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5">Category</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => handleChange("categoryId", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-indigo-500 font-bold"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5">Sub Category</label>
                <select
                  value={formData.subCategoryId}
                  onChange={(e) => handleChange("subCategoryId", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-indigo-500 font-medium"
                >
                  <option value="">Select Sub Category</option>
                  {subCategories.map((sc) => (
                    <option key={sc.id} value={sc.id}>{sc.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5">State</label>
                <select
                  value={formData.stateId}
                  onChange={(e) => handleChange("stateId", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-indigo-500 font-medium"
                >
                  <option value="">Select State</option>
                  {states.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5">District</label>
                <select
                  value={formData.districtId}
                  onChange={(e) => handleChange("districtId", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-indigo-500 font-medium"
                >
                  <option value="">Select District</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5">Area / Locality</label>
                <select
                  value={formData.areaId}
                  onChange={(e) => handleChange("areaId", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-indigo-500 font-medium"
                >
                  <option value="">Select Area</option>
                  {areas.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">Full Physical Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-indigo-500 font-medium"
                placeholder="Plot No., Street, Landmark, Pincode"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Store Image & Status Verification Controls */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Status & Blue Tick Controls */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-black text-white uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 border-b border-slate-800 pb-3">
              <ShieldCheck size={16} />
              <span>Listing Verification</span>
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">Approval Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-black text-amber-400 outline-none focus:border-emerald-500 uppercase tracking-wider"
              >
                <option value="APPROVED">APPROVED (Live)</option>
                <option value="PENDING">PENDING REVIEW</option>
                <option value="REJECTED">REJECTED</option>
                <option value="BLOCKED">BLOCKED</option>
              </select>
            </div>

            {/* Blue Tick Badge Switch */}
            <div className="flex items-center justify-between bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className={formData.isVerified ? "text-emerald-400" : "text-slate-500"} />
                <div>
                  <span className="text-xs font-black text-white block">Verified Blue Tick</span>
                  <span className="text-[10px] text-slate-400 font-medium">Shows verified badge to buyers</span>
                </div>
              </div>

              <input
                type="checkbox"
                checked={formData.isVerified}
                onChange={(e) => handleChange("isVerified", e.target.checked)}
                className="w-5 h-5 accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Storefront Image Upload / Preview */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
            <h2 className="text-sm font-black text-white uppercase tracking-wider text-purple-400 flex items-center gap-1.5 border-b border-slate-800 pb-3">
              <ImageIcon size={16} />
              <span>Storefront Banner Image</span>
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">Image URL</label>
              <input
                type="text"
                value={formData.storeImage}
                onChange={(e) => handleChange("storeImage", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-purple-500 font-mono"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            {/* Image Preview Box */}
            <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center relative mt-2">
              {formData.storeImage ? (
                <img src={formData.storeImage} alt="Store Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center text-slate-500 text-xs font-medium">
                  No Store Image Provided
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
