"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditDistrict() {
  const { id } = useParams();
  const router = useRouter();

  const [states, setStates] = useState([]);
  const [stateId, setStateId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/api/admin/state")
      .then((res) => res.json())
      .then(setStates);

    fetch(`/api/admin/district/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setStateId(data.stateId);
      });
  }, [id]);

  const update = async () => {
    await fetch(`/api/admin/district/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, stateId }),
    });

    router.push("/admin/district-master");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Edit District</h2>

      <div className="bg-white p-6 rounded shadow max-w-xl">
        <label className="block mb-2 font-semibold">State</label>
        <select
          className="w-full border p-2 rounded mb-4"
          value={stateId}
          onChange={(e) => setStateId(e.target.value)}
        >
          {states.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-semibold">District Name</label>
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
