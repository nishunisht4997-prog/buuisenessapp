"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddState() {
  const [name, setName] = useState("");
  const router = useRouter();

  const saveState = async () => {
    if (!name.trim()) return alert("Enter state name");

    await fetch("/api/admin/state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    router.push("/admin/state-master");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Add State</h2>

      <div className="bg-white p-6 rounded shadow max-w-xl">
        <label className="block mb-2 font-semibold">State Name</label>

        <input
          type="text"
          placeholder="Enter State Name"
          className="w-full border px-3 py-2 rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={saveState}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
