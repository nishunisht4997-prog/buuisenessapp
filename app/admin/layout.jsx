"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FolderTree,
  Layers,
  MapPin,
  Building2,
  Globe,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Compass
} from "lucide-react";

const ADMIN_LINKS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/kyc-verification", label: "KYC Verification Hub", icon: ShieldCheck },
  { href: "/admin/category", label: "Category Master", icon: FolderTree },
  { href: "/admin/sub-category", label: "Sub Category", icon: Layers },
  { href: "/admin/state-master", label: "State Master", icon: Globe },
  { href: "/admin/district-master", label: "District Master", icon: Compass },
  { href: "/admin/area-master", label: "Area Master", icon: MapPin },
  { href: "/admin/business", label: "Business Listing", icon: Building2 },
];

export default function BusinessLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* 🔹 MOBILE TOP HEADER */}
      <header className="md:hidden sticky top-0 z-50 bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-400 to-teal-500 text-slate-950 font-black flex items-center justify-center text-sm shadow">
            A
          </div>
          <span className="font-extrabold text-sm text-white">
            ApnaBiz <span className="text-emerald-400">Admin</span>
          </span>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800"
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* 🔹 SIDEBAR (Desktop fixed + Mobile Drawer) */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between z-50 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Logo & Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-slate-950 font-black text-lg flex items-center justify-center shadow-md">
                A
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight leading-none text-white">
                  Apna<span className="text-emerald-400">Biz</span>
                </h2>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                  <ShieldCheck size={11} /> Master Panel
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
            {ADMIN_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-slate-950" : "text-slate-500"} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="pt-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full bg-slate-950 hover:bg-rose-950/60 text-slate-300 hover:text-rose-400 border border-slate-800 hover:border-rose-900 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
          >
            <LogOut size={16} />
            <span>Logout Admin</span>
          </button>
        </div>
      </aside>

      {/* Backdrop Overlay for Mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* 🔹 MAIN CONTENT */}
      <main className="flex-1 md:ml-64 p-4 sm:p-8 min-h-screen overflow-y-auto bg-slate-950">
        {children}
      </main>
    </div>
  );
}
