"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  useEffect(() => {
    const businessId = localStorage.getItem("businessId");

    // ❌ Not a registered business → free-listing landing
    if (!businessId) {
      window.location.href = "/free-listing";
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-blue-50 shadow-lg p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-blue-900 mb-8">
          Business Panel
        </h2>

        <nav className="space-y-3 text-gray-700">
          <NavLink href="/business/dashboard" label="Dashboard" />
          <NavLink href="/business/basic-profile" label="Profile" />
          <NavLink href="/business/website" label="Website Profile" />
          <NavLink
            href="/business/product-profile"
            label="Products / Service Profile"
          />
          <NavLink href="/business/coupons" label="Coupons / Referral Code" />
        </nav>

        <div className="mt-auto">
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="w-full bg-blue-950 hover:bg-blue-900 text-white py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 bg-blue-950 text-gray-900">{children}</main>
    </div>
  );
}

function NavLink({ href, label }) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-lg hover:bg-cyan-50 hover:text-blue-900 transition"
    >
      {label}
    </Link>
  );
}
