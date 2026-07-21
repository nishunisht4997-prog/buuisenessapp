"use client";

import { useState } from "react";

export default function WebsiteProfile() {
  const [form, setForm] = useState({
    websiteUrl: "",
    email: "",
    facebook: "",
    instagram: "",
    logo: null,
    logoPreview: null,
  });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({
      ...form,
      logo: file,
      logoPreview: URL.createObjectURL(file),
    });
  };

  const saveWebsiteProfile = async () => {
    const businessId = localStorage.getItem("businessId");
    if (!businessId) return alert("Session expired");

    const formData = new FormData();
    formData.append("businessId", businessId);
    formData.append("websiteUrl", form.websiteUrl);
    formData.append("email", form.email);
    formData.append("facebook", form.facebook);
    formData.append("instagram", form.instagram);

    if (form.logo) {
      formData.append("logo", form.logo);
    }

    await fetch("/api/business/website-profile", {
      method: "POST",
      body: formData,
    });

    alert("Website profile saved successfully!");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Website Profile</h2>

      {/* LOGO */}
      <div className="mb-6">
        <label className="font-semibold block mb-2">Website Logo</label>
        <div className="flex gap-4 items-center">
          {form.logoPreview ? (
            <img
              src={form.logoPreview}
              className="w-24 h-24 rounded object-cover border"
            />
          ) : (
            <div className="w-24 h-24 border border-dashed flex items-center justify-center text-gray-400">
              No Logo
            </div>
          )}

          <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded">
            Upload Logo
            <input type="file" className="hidden" onChange={handleFile} />
          </label>
        </div>
      </div>

      {/* URL */}
      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="Website URL"
        value={form.websiteUrl}
        onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
      />

      {/* EMAIL */}
      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      {/* SOCIAL */}
      <div className="grid grid-cols-2 gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Facebook URL"
          value={form.facebook}
          onChange={(e) => setForm({ ...form, facebook: e.target.value })}
        />

        <input
          className="border p-2 rounded"
          placeholder="Instagram URL"
          value={form.instagram}
          onChange={(e) => setForm({ ...form, instagram: e.target.value })}
        />
      </div>

      <button
        onClick={saveWebsiteProfile}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
      >
        Save Website Profile
      </button>
    </div>
  );
}
