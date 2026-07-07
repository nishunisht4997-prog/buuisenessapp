"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddDistrict() {
  const [states, setStates] = useState([]);
  const [stateId, setStateId] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/state")
      .then((res) => res.json())
      .then(setStates);
  }, []);

  const save = async () => {
    await fetch("/api/admin/district", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, stateId }),
    });

    router.push("/admin/district-master");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Add District</h2>

      <div className="bg-white p-6 rounded shadow max-w-xl">
        <label className="block mb-2 font-semibold">Select State</label>
        <select
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setStateId(e.target.value)}
        >
          <option value="">-- Select State --</option>
          {states.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-semibold">District Name</label>
        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Enter district"
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
