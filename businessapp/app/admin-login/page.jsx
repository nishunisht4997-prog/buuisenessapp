"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const res = await fetch("/api/auth/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    localStorage.setItem("adminToken", data.token);
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl flex w-225 overflow-hidden">
        {/* LEFT SECTION */}
        <div className="relative w-1/2 bg-green-500 text-white p-12 flex flex-col justify-center overflow-hidden">
          <div className="absolute -top-24 -left-24 w-75 h-75 bg-green-400 rounded-full blur-3xl opacity-40"></div>

          <h1 className="text-4xl font-bold mb-4 z-10">Admin Login</h1>

          <p className="text-lg opacity-90 z-10">
            Manage your business, listings & users from one place.
          </p>

          <div className="relative mt-10 z-10">
            <img
              src="/login.png"
              alt="Admin Login"
              className="w-[320px] mx-auto drop-shadow-2xl -mb-20"
            />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-semibold mb-6">Admin Sign In</h2>

          <input
            type="email"
            placeholder="Enter email"
            className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-green-500"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter password"
            className="w-full border rounded-lg p-3 mb-6 focus:ring-2 focus:ring-green-500"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Only admins can access this panel
          </p>
        </div>
      </div>
    </div>
  );
}
