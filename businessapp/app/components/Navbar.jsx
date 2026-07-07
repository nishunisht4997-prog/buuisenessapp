"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginPopup from "./LoginPopup";

export default function Navbar() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <header className="w-full bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-2xl font-bold">
            <span className="text-amber-500">Apna</span>
            <span className="text-purple-800">Biz</span>
          </h1>

          {/* Right side */}
          <div className="flex items-center gap-6 text-sm">
            <span>🌐 EN</span>
            <span>Investor Relations</span>
            <span>Leads</span>

            <button
              onClick={() => router.push("/free-listing")}
              className="bg-orange-500 text-white px-4 py-2 rounded"
            >
              Free Listing
            </button>

            <button
              onClick={() => setShowLogin(true)}
              className="bg-amber-500 text-white px-4 py-2 rounded"
            >
              Login / Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* ✅ LOGIN POPUP */}
      {showLogin && <LoginPopup close={() => setShowLogin(false)} />}
    </>
  );
}
