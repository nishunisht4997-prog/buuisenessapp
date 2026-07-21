"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StateMaster() {
  const [states, setStates] = useState([]);

  const loadData = async () => {
    const res = await fetch("/api/admin/state");
    const data = await res.json();
    setStates(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteState = async (id) => {
    if (!confirm("Delete this state?")) return;

    await fetch(`/api/admin/state/${id}`, { method: "DELETE" });
    loadData();
  };

  return (
    <div className="p-6">
   
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">State Master</h2>
        <Link
          href="/admin/state-master/create"
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          + Add
        </Link>
      </div>

     
      <div className="bg-white shadow rounded-lg">
        <table className="w-full">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-3 text-left">State Name</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {states.map((state) => (
              <tr key={state.id} className="border-t">
                <td className="p-3">{state.name}</td>
                <td className="p-3 text-center space-x-2">
                  <Link
                    href={`/admin/state-master/${state.id}/edit`}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteState(state.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {states.length === 0 && (
              <tr>
                <td colSpan="2" className="p-6 text-center text-gray-500">
                  No states found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
