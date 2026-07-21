"use client";

import { useEffect, useState } from "react";

export default function RegisterPage() {
  // 🔐 CASE HANDLING
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const businessId = localStorage.getItem("businessId");

    // ❌ Case 3 → not logged in
    if (!userId) {
      window.location.href = "/free-listing";
      return;
    }

    // ❌ Case 1 → already has business
    if (businessId) {
      window.location.href = "/business/dashboard";
    }

    // ✅ Case 2 → stay here
  }, []);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [areas, setAreas] = useState([]);

  const [form, setForm] = useState({
    categoryId: "",
    subCategoryId: "",
    stateId: "",
    districtId: "",
    areaId: "",
    businessName: "",
    phone: "",
    address: "",
    storeImage: null,
    storeImagePreview: null,
  });

  // 📦 LOAD MASTER DATA
  useEffect(() => {
    fetch("/api/admin/category")
      .then((r) => r.json())
      .then(setCategories);
    fetch("/api/admin/state")
      .then((r) => r.json())
      .then(setStates);

    setForm((f) => ({
      ...f,
      phone: localStorage.getItem("phone") || "",
    }));
  }, []);

  const loadSubCategories = async (id) => {
    const res = await fetch(`/api/admin/subcategory?categoryId=${id}`);
    setSubCategories(await res.json());
  };

  const loadDistricts = async (id) => {
    const res = await fetch(`/api/admin/district?stateId=${id}`);
    setDistricts(await res.json());
  };

  const loadAreas = async (id) => {
    const res = await fetch(`/api/admin/area?districtId=${id}`);
    setAreas(await res.json());
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({
      ...form,
      storeImage: file,
      storeImagePreview: URL.createObjectURL(file),
    });
  };

  // 🚀 SUBMIT
  const submitForm = async () => {
    if (
      !form.businessName ||
      !form.categoryId ||
      !form.subCategoryId ||
      !form.stateId ||
      !form.districtId ||
      !form.areaId
    ) {
      alert("Please fill all required fields");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("businessName", form.businessName);
    formData.append("phone", form.phone);
    formData.append("categoryId", form.categoryId);
    formData.append("subCategoryId", form.subCategoryId);
    formData.append("stateId", form.stateId);
    formData.append("districtId", form.districtId);
    formData.append("areaId", form.areaId);
    formData.append("address", form.address || "");

    if (form.storeImage) {
      formData.append("storeImage", form.storeImage);
    }

    const res = await fetch("/api/admin/business/create", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("businessId", data.businessId);
      window.location.href = "/business/dashboard";
    } else {
      alert(data.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex justify-center py-10">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-2">Register Your Business</h2>
        <p className="text-gray-500 mb-6">Add details to get listed</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            className="input"
            value={form.categoryId}
            onChange={(e) => {
              setForm({
                ...form,
                categoryId: e.target.value,
                subCategoryId: "",
              });
              setSubCategories([]);
              loadSubCategories(e.target.value);
            }}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            className="input"
            value={form.subCategoryId}
            onChange={(e) =>
              setForm({ ...form, subCategoryId: e.target.value })
            }
          >
            <option value="">Select Sub Category</option>
            {subCategories.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <select
            className="input"
            value={form.stateId}
            onChange={(e) => {
              setForm({ ...form, stateId: e.target.value });
              loadDistricts(e.target.value);
            }}
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <select
            className="input"
            value={form.districtId}
            onChange={(e) => {
              setForm({ ...form, districtId: e.target.value });
              loadAreas(e.target.value);
            }}
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <select
            className="input"
            value={form.areaId}
            onChange={(e) => setForm({ ...form, areaId: e.target.value })}
          >
            <option value="">Select Area</option>
            {areas.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>

          <input
            className="input"
            placeholder="Business Name"
            value={form.businessName}
            onChange={(e) => setForm({ ...form, businessName: e.target.value })}
          />

          <input className="input bg-gray-100" value={form.phone} disabled />
        </div>

        <div className="mt-6">
          <label className="block mb-2 font-medium">Store Image</label>
          <div className="flex gap-4 items-center">
            {form.storeImagePreview ? (
              <img
                src={form.storeImagePreview}
                className="w-24 h-24 rounded object-cover border"
              />
            ) : (
              <div className="w-24 h-24 border-dashed border flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            <label className="cursor-pointer bg-gray-200 px-4 py-2 rounded">
              Upload
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        <textarea
          className="input mt-4"
          placeholder="Business Address"
          rows={3}
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <button
          onClick={submitForm}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg"
        >
          🚀 Register Business
        </button>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
        }
      `}</style>
    </div>
  );
}
