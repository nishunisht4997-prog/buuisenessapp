"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditState() {
  const { id } = useParams();
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    fetch(`/api/admin/state/${id}`)
      .then((res) => res.json())
      .then((data) => setName(data.name));
  }, [id]);

  const updateState = async () => {
    await fetch(`/api/admin/state/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    router.push("/admin/state-master");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Edit State</h2>

      <div className="bg-white p-6 rounded shadow max-w-xl">
        <label className="block mb-2 font-semibold">State Name</label>

        <input
          type="text"
          className="w-full border px-3 py-2 rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={updateState}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
}
