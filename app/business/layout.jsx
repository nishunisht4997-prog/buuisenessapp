"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { LayoutDashboard, User, Globe, Package, Tag, LogOut, Building2, ShieldCheck, Sparkles } from "lucide-react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const businessId = localStorage.getItem("businessId");
    if (!businessId) {
      window.location.href = "/free-listing";
    }
  }, []);

  const navItems = [
    { href: "/business/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/business/basic-profile", label: "Profile", icon: User },
    { href: "/business/website", label: "Website Profile", icon: Globe },
    { href: "/business/product-profile", label: "Products & Services", icon: Package },
    { href: "/business/coupons", label: "Coupons & Referrals", icon: Tag },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-300 p-6 flex flex-col justify-between border-r border-slate-800 shrink-0">
        <div>
          {/* Brand Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white tracking-tight">
                <span className="text-amber-500">Apna</span>Biz
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Merchant Portal
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-slate-800">
          <div className="bg-slate-800/80 p-3 rounded-xl mb-4 border border-slate-700/50 flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-slate-200">Account Active</span>
              <span className="text-[10px] text-slate-400">Verified Business</span>
            </div>
          </div>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="w-full flex items-center justify-center gap-2 bg-rose-600/10 hover:bg-rose-600 text-rose-400 hover:text-white text-xs font-bold py-2.5 rounded-xl border border-rose-500/20 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Account</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
