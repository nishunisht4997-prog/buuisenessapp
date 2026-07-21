"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  MapPin,
  Sparkles,
  User,
  PlusCircle,
  ChevronDown,
  ShieldCheck,
  Globe,
  TrendingUp,
  Building2,
  Palette,
  Utensils,
  Hotel,
  Sofa,
  GraduationCap,
  Hospital,
  HardHat,
  Dumbbell,
  Package
} from "lucide-react";
import LoginPopup from "./LoginPopup";
import SavedBusinessesDrawer from "./SavedBusinessesDrawer";

const CITIES = [
  { name: "Bhubaneswar", state: "Odisha", popular: true },
  { name: "Cuttack", state: "Odisha", popular: true },
  { name: "Puri", state: "Odisha", popular: true },
  { name: "Rourkela", state: "Odisha", popular: true },
  { name: "Sambalpur", state: "Odisha", popular: false },
  { name: "Berhampur", state: "Odisha", popular: false },
  { name: "Balasore", state: "Odisha", popular: false },
];

const QUICK_NAV_CATEGORIES = [
  { name: "Restaurants", slug: "restaurants", icon: Utensils },
  { name: "Hotels", slug: "hotels", icon: Hotel },
  { name: "Beauty Spa", slug: "beauty-spa", icon: Sparkles },
  { name: "Home Decor", slug: "home-decor", icon: Sofa },
  { name: "Education", slug: "education", icon: GraduationCap },
  { name: "Hospitals", slug: "hospitals", icon: Hospital },
  { name: "Contractors", slug: "contractors", icon: HardHat },
  { name: "Gym & Fitness", slug: "gym", icon: Dumbbell },
  { name: "Packers & Movers", slug: "packers-movers", icon: Package },
];

export default function Navbar() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [selectedCity, setSelectedCity] = useState("Bhubaneswar");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const cityDropdownRef = useRef(null);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarkCount(bookmarks.length);

    const handleClickOutside = (event) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
        setShowCityDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* 🔹 Top Statistical & Trust Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800/80 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Sparkles size={13} className="animate-pulse text-amber-400" /> 4.9 Cr+ Verified Listings
            </span>
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <ShieldCheck size={13} className="text-emerald-400" /> 100% Guaranteed Leads
            </span>
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Building2 size={13} className="text-indigo-400" /> 500+ Indian Cities
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1 hover:text-white cursor-pointer transition font-medium">
              <Globe size={13} /> EN / हिंदी / ଓଡ଼ିଆ
            </span>
            <span
              onClick={() => router.push("/business/dashboard")}
              className="flex items-center gap-1 text-slate-300 hover:text-indigo-300 cursor-pointer transition font-bold"
            >
              <TrendingUp size={13} /> Merchant Portal
            </span>
          </div>
        </div>
      </div>

      {/* 🔹 Glassmorphic Navigation Header */}
      <header className="w-full glass-nav sticky top-0 z-40 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          {/* Glowing Logo & City Selector */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Glow Badge Logo */}
            <div
              onClick={() => router.push("/")}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
                  A
                </div>
                <span className="absolute -inset-0.5 rounded-2xl bg-amber-500/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-none whitespace-nowrap">
                <span className="text-amber-500">Apna</span>
                <span className="text-white">Biz</span>
              </h1>
            </div>

            {/* City Dropdown Selector with GPS Indicator */}
            <div className="relative" ref={cityDropdownRef}>
              <button
                onClick={() => setShowCityDropdown(!showCityDropdown)}
                className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-extrabold px-3.5 py-2 rounded-xl border border-slate-800 transition-colors shadow-sm"
              >
                <MapPin size={15} className="text-amber-400 shrink-0" />
                <span className="truncate max-w-[100px] sm:max-w-[130px]">{selectedCity}</span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${showCityDropdown ? "rotate-180" : ""}`} />
              </button>

              {showCityDropdown && (
                <div className="absolute top-full left-0 mt-2 w-60 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-white">
                  <div className="text-[10px] font-extrabold text-slate-400 px-3 py-1 uppercase tracking-wider flex items-center justify-between">
                    <span>Select Location</span>
                    <span className="text-emerald-400 font-mono">GPS Active</span>
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-0.5 mt-1">
                    {CITIES.map((city) => (
                      <button
                        key={city.name}
                        onClick={() => {
                          setSelectedCity(city.name);
                          setShowCityDropdown(false);
                        }}
                        className={`w-full flex items-center justify-between text-left px-3 py-2 text-xs rounded-xl transition-colors ${
                          selectedCity === city.name
                            ? "bg-amber-500 text-slate-950 font-black"
                            : "text-slate-200 hover:bg-slate-800 font-semibold"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <MapPin size={13} className={selectedCity === city.name ? "text-slate-950" : "text-slate-400"} />
                          {city.name}
                        </span>
                        {city.popular && (
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            selectedCity === city.name ? "bg-slate-950 text-amber-400" : "bg-slate-800 text-amber-400"
                          }`}>
                            Popular
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Free Listing CTA */}
            <button
              onClick={() => router.push("/free-listing")}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-orange-500/20 hover:shadow-lg transition-all duration-200 whitespace-nowrap"
            >
              <PlusCircle size={16} />
              <span>Free Listing</span>
            </button>

            {/* Bookmark Drawer Trigger */}
            <button
              onClick={() => setShowBookmarks(true)}
              className="relative p-2.5 text-slate-300 hover:text-amber-400 hover:bg-slate-800 rounded-xl transition-colors"
              aria-label="Saved businesses"
              title="Saved Businesses"
            >
              <Heart size={20} />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow animate-pulse">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Login Button */}
            <button
              onClick={() => setShowLogin(true)}
              className="hidden sm:flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-sm transition-all whitespace-nowrap"
            >
              <User size={16} className="text-amber-400" />
              <span>Login / Sign Up</span>
            </button>

            {/* Mobile Login Button */}
            <button
              onClick={() => setShowLogin(true)}
              className="sm:hidden p-2 bg-slate-900 border border-slate-800 text-amber-400 rounded-xl"
              aria-label="Login / Sign Up"
            >
              <User size={18} />
            </button>
          </div>
        </div>

        {/* 🔹 Quick Category Nav Strip (Below main header) */}
        <div className="bg-slate-950/80 border-t border-slate-800/80 px-4 sm:px-6 py-2 overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3">
            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
              Quick Nav:
            </span>
            {QUICK_NAV_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.slug}
                  onClick={() => router.push(`/category/${cat.slug}`)}
                  className="text-xs font-bold text-slate-300 hover:text-amber-400 bg-slate-900/80 hover:bg-slate-800 px-3 py-1 rounded-xl border border-slate-800 transition-colors flex items-center gap-1.5 shrink-0 whitespace-nowrap"
                >
                  <Icon size={13} className="text-amber-400" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ✅ LOGIN POPUP */}
      {showLogin && <LoginPopup close={() => setShowLogin(false)} />}

      {/* ✅ SAVED BUSINESSES DRAWER */}
      {showBookmarks && <SavedBusinessesDrawer isOpen={showBookmarks} onClose={() => setShowBookmarks(false)} />}
    </>
  );
}
