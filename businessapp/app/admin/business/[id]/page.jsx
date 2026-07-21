"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AdminBusinessDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [business, setBusiness] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 🔹 Load business details
  useEffect(() => {
    fetch(`/api/admin/business/get?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBusiness(data.data);
          setStatus(data.data.status);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  // 🔹 Update status
  const saveStatus = async () => {
    setSaving(true);

    const res = await fetch("/api/admin/business/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        businessId: business.id,
        status,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Business status updated successfully");
      router.push("/admin/business");
    } else {
      alert(data.message || "Failed to update status");
    }

    setSaving(false);
  };

  if (loading) {
    return <div className="p-6">Loading business details...</div>;
  }

  if (!business) {
    return <div className="p-6 text-red-600">Business not found</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Business Details</h1>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back
        </button>
      </div>

      {/* STATUS CONTROL */}
      <div className="bg-white p-5 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-semibold">Business Status</h2>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-4 py-2 w-60"
        >
          <option value="PENDING">PENDING</option>
          <option value="APPROVED">APPROVED</option>
          <option value="REJECTED">REJECTED</option>
          <option value="BLOCKED">BLOCKED</option>
        </select>

        <div className="flex gap-3">
          <button
            onClick={saveStatus}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            onClick={() => router.back()}
            className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* BUSINESS INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT */}
        <div className="bg-white p-5 rounded-xl shadow space-y-3">
          <h2 className="text-lg font-semibold">Business Information</h2>

          <Info label="Business Name" value={business.name} />
          <Info label="Business Code" value={business.businessCode} />
          <Info label="Phone" value={business.phone} />
          <Info label="Address" value={business.address || "-"} />
          <Info
            label="Created At"
            value={new Date(business.createdAt).toLocaleString()}
          />
        </div>

        {/* RIGHT */}
        <div className="bg-white p-5 rounded-xl shadow space-y-3">
          <h2 className="text-lg font-semibold">Category & Location</h2>

          <Info label="Category" value={business.category?.name} />
          <Info label="Sub Category" value={business.subCategory?.name} />
          <Info label="State" value={business.state?.name} />
          <Info label="District" value={business.district?.name} />
          <Info label="Area" value={business.area?.name} />
        </div>
      </div>

      {/* BUSINESS IMAGE */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3">Business Image</h2>

        {business.storeImage ? (
          <img
            src={business.storeImage}
            alt="Business"
            className="w-60 h-60 object-cover rounded border"
          />
        ) : (
          <p className="text-gray-500">No image uploaded</p>
        )}
      </div>

      {/* LISTER INFO */}
      <div className="bg-white p-5 rounded-xl shadow space-y-3">
        <h2 className="text-lg font-semibold">Lister Information</h2>

        <Info label="User ID" value={business.user?.id} />
        <Info label="User Phone" value={business.user?.phone} />
        <Info
          label="Profile Completed"
          value={business.user?.isProfileCompleted ? "Yes" : "No"}
        />
      </div>
    </div>
  );
}

// 🔹 Reusable info row
function Info({ label, value }) {
  return (
    <p className="text-sm">
      <span className="font-medium text-gray-600">{label}:</span>{" "}
      <span className="text-gray-800">{value || "-"}</span>
    </p>
  );
}
