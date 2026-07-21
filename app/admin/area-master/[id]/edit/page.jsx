"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditArea() {
  const { id } = useParams();
  const router = useRouter();

  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/api/admin/district")
      .then((res) => res.json())
      .then(setDistricts);

    fetch(`/api/admin/area/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setDistrictId(data.districtId);
      });
  }, [id]);

  const update = async () => {
    await fetch(`/api/admin/area/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, districtId }),
    });

    router.push("/admin/area-master");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Area</h2>

      <div className="bg-white p-6 rounded shadow max-w-xl">
        <label className="block mb-2 font-semibold">District</label>
        <select
          className="w-full border p-2 rounded mb-4"
          value={districtId}
          onChange={(e) => setDistrictId(e.target.value)}
        >
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-semibold">Area Name</label>
        <input
          className="w-full border p-2 rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={update}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
}
