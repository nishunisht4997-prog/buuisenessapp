"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BusinessLayout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg p-5 flex flex-col">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">
          Business Panel
        </h2>

        {/* MENU */}
        <ul className="space-y-4 text-gray-700 flex-1 overflow-y-auto">
          <li>
            <Link href="/admin/dashboard" className="sidebar-link">
              📊 Dashboard
            </Link>
          </li>
          <li>
            <Link href="/admin/category" className="sidebar-link">
              📂 Category
            </Link>
          </li>
          <li>
            <Link href="/admin/sub-category" className="sidebar-link">
              🗂 Sub Category
            </Link>
          </li>
          <li>
            <Link href="/admin/state-master" className="sidebar-link">
              🌍 State Master
            </Link>
          </li>
          <li>
            <Link href="/admin/district-master" className="sidebar-link">
              🏙 District
            </Link>
          </li>
          <li>
            <Link href="/admin/area-master" className="sidebar-link">
              📍 Area
            </Link>
          </li>
          <li>
            <Link href="/admin/business" className="sidebar-link">
              🏪 Business Listing
            </Link>
          </li>
        </ul>

        {/* LOGOUT — ALWAYS AT BOTTOM */}
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-64 p-8 min-h-screen overflow-y-auto">{children}</main>
    </div>
  );
}
