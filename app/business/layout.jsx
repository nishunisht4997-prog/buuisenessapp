"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  User,
  Globe,
  Package,
  Ticket,
  LogOut,
  Building2,
  ShieldCheck,
  Menu,
  X
} from "lucide-react";

const NAV_LINKS = [
  { href: "/business/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/business/basic-profile", label: "Business Profile", icon: User },
  { href: "/business/website", label: "Website Settings", icon: Globe },
  { href: "/business/product-profile", label: "Products & Services", icon: Package },
  { href: "/business/coupons", label: "Coupons & Referrals", icon: Ticket },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const businessId = localStorage.getItem("businessId");

    // ❌ Not a registered business → free-listing landing
    if (!businessId) {
      window.location.href = "/free-listing";
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      {/* 🔹 MOBILE HEADER */}
      <header className="md:hidden sticky top-0 z-50 bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow">
            A
          </div>
          <span className="font-extrabold text-sm text-white">
            ApnaBiz <span className="text-indigo-400">Merchant</span>
          </span>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900"
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* 🔹 DARK SIDEBAR (Desktop Fixed + Mobile Drawer) */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between z-50 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Brand Logo */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md">
                A
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight leading-none text-white">
                  Apna<span className="text-amber-400">Biz</span>
                </h2>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Merchant Portal</span>
              </div>
            </div>

            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-white" : "text-slate-500"} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="pt-6 border-t border-slate-800">
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="w-full bg-slate-900 hover:bg-rose-950/60 text-slate-300 hover:text-rose-400 border border-slate-800 hover:border-rose-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
          >
            <LogOut size={16} />
            <span>Logout Account</span>
          </button>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* 🔹 MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-64 p-4 sm:p-8 bg-slate-900 text-slate-100 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
