"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BusinessProfile() {
  const router = useRouter();

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
      router.push("/free-listing/login");
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
      });

    fetch("/api/admin/category")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  const loadSubCategory = async (id) => {
    const res = await fetch(`/api/admin/subcategory?categoryId=${id}`);
    setSubCategories(await res.json());
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 SAVE PROFILE
  const saveProfile = async () => {
    const res = await fetch("/api/business/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success !== false) {
      alert("Business profile saved successfully");
      router.push("/business/website"); // 👉 NEXT STEP
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Business Profile</h2>

      {/* BUSINESS NAME */}
      <div className="mb-4">
        <label className="font-semibold">Business Name</label>
        <input
          className="w-full border p-2 rounded"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      {/* CATEGORY */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="font-semibold">Category</label>
          <select
            className="w-full border p-2 rounded"
            name="categoryId"
            value={form.categoryId}
            onChange={(e) => {
              handleChange(e);
              loadSubCategory(e.target.value);
            }}
          >
            <option value="">Select</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Sub Category</label>
          <select
            className="w-full border p-2 rounded"
            name="subCategoryId"
            value={form.subCategoryId}
            onChange={handleChange}
          >
            <option value="">Select</option>
            {subCategories.map((sc) => (
              <option key={sc.id} value={sc.id}>
                {sc.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ADDRESS */}
      <div className="mb-4">
        <label className="font-semibold">Address</label>
        <textarea
          className="w-full border p-2 rounded"
          name="address"
          value={form.address}
          onChange={handleChange}
        />
      </div>

      {/* NUMBERS */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="font-semibold">Display Number</label>
          <input
            className="w-full border p-2 rounded"
            name="displayNumber"
            value={form.displayNumber}
            onChange={(e) =>
              setForm({
                ...form,
                displayNumber: e.target.value,
                whatsappNumber: form.sameAsDisplay
                  ? e.target.value
                  : form.whatsappNumber,
              })
            }
          />
        </div>

        <div>
          <label className="font-semibold">WhatsApp Number</label>
          <input
            className="w-full border p-2 rounded"
            name="whatsappNumber"
            disabled={form.sameAsDisplay}
            value={form.whatsappNumber}
            onChange={(e) =>
              setForm({ ...form, whatsappNumber: e.target.value })
            }
          />

          <label className="flex items-center gap-2 mt-2 text-sm">
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
            />
            Same as Display Number
          </label>
        </div>
      </div>

      <button
        onClick={saveProfile}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
      >
        Save & Continue →
      </button>
    </div>
  );
}
