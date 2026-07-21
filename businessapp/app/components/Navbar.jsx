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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <h1 className="text-xl sm:text-2xl font-bold leading-none whitespace-nowrap">
            <span className="text-amber-500">Apna</span>
            <span className="text-purple-800">Biz</span>
          </h1>

          {/* Right side */}
          <div className="flex items-center gap-3 sm:gap-6 text-sm">
            <span className="hidden sm:inline whitespace-nowrap">🌐 EN</span>
            <span className="hidden lg:inline whitespace-nowrap">Investor Relations</span>
            <span className="hidden md:inline whitespace-nowrap">Leads</span>

            <button
              onClick={() => router.push("/free-listing")}
              className="bg-orange-500 text-white px-3 sm:px-4 py-2 rounded whitespace-nowrap"
            >
              Free Listing
            </button>

            <button
              onClick={() => setShowLogin(true)}
              className="bg-amber-500 text-white px-3 sm:px-4 py-2 rounded whitespace-nowrap hidden sm:inline-flex"
            >
              Login / Sign Up
            </button>

            {/* Mobile login button */}
            <button
              onClick={() => setShowLogin(true)}
              className="bg-amber-500 text-white p-2 rounded sm:hidden"
              aria-label="Login / Sign Up"
              title="Login / Sign Up"
            >
              👤
            </button>
          </div>
        </div>
      </header>

      {/* ✅ LOGIN POPUP */}
      {showLogin && <LoginPopup close={() => setShowLogin(false)} />}
    </>
  );
}
