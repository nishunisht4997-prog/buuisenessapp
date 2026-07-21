"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddArea() {
  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/district")
      .then((res) => res.json())
      .then(setDistricts);
  }, []);

  const save = async () => {
    await fetch("/api/admin/area", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, districtId }),
    });

    router.push("/admin/area-master");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Add Area</h2>

      <div className="bg-white p-6 rounded shadow max-w-xl">
        <label className="block mb-2 font-semibold">Select District</label>
        <select
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setDistrictId(e.target.value)}
        >
          <option value="">-- Select District --</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-semibold">Area Name</label>
        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Enter area name"
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={save}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
