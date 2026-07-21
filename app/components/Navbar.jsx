"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginPopup from "./LoginPopup";
import SavedBusinessesDrawer from "./SavedBusinessesDrawer";
import { Building2, Globe, TrendingUp, User, ChevronDown, PlusCircle, Menu, X, MapPin, Heart } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Bhubaneswar");
  const [showCityMenu, setShowCityMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSavedDrawer, setShowSavedDrawer] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  const cities = ["Bhubaneswar", "Cuttack", "Puri", "Rourkela", "Delhi", "Mumbai", "Bangalore"];

  useEffect(() => {
    const updateBookmarkCount = () => {
      const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
      setBookmarkCount(savedBookmarks.length);
    };

    updateBookmarkCount();
    window.addEventListener("bookmarkChange", updateBookmarkCount);
    window.addEventListener("storage", updateBookmarkCount);

    return () => {
      window.removeEventListener("bookmarkChange", updateBookmarkCount);
      window.removeEventListener("storage", updateBookmarkCount);
    };
  }, []);

  return (
    <>
      <header className="w-full glass-nav sticky top-0 z-50 transition-all duration-300">
        {/* Top Mini Banner / Quick Info Bar */}
        <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6 hidden sm:block">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Over 5.9 Cr+ Verified Businesses & Services Listed
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1 cursor-pointer hover:text-white transition">
                <Globe className="w-3.5 h-3.5" /> EN
              </span>
              <span className="cursor-pointer hover:text-white transition flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> Investor Relations
              </span>
              <span className="cursor-pointer hover:text-white transition">Leads</span>
              <span className="cursor-pointer hover:text-white transition text-amber-400 font-medium">B2B Portal</span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          {/* Logo & Location Selector */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div 
              onClick={() => router.push("/")} 
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  <span className="text-amber-500">Apna</span>
                  <span className="text-indigo-600">Biz</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-slate-400 -mt-1 hidden sm:block">
                  Local Search & Directory
                </span>
              </div>
            </div>

            {/* City Selector (Desktop) */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setShowCityMenu(!showCityMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white/80 text-xs font-semibold text-slate-700 hover:border-indigo-300 transition"
              >
                <span className="text-indigo-600">📍</span>
                <span>{selectedCity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showCityMenu && (
                <div className="absolute left-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select City
                  </div>
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setShowCityMenu(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-indigo-50 transition ${
                        selectedCity === city ? "text-indigo-600 bg-indigo-50/50 font-semibold" : "text-slate-700"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Right Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setShowSavedDrawer(true)}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white/80 text-slate-700 hover:border-rose-300 hover:bg-rose-50 transition"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-semibold">Saved</span>
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </button>

            <button
              onClick={() => router.push("/free-listing")}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-md shadow-orange-500/20 hover:shadow-lg transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Free Listing</span>
            </button>

            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-md shadow-indigo-500/20 hover:shadow-lg transition-all"
            >
              <User className="w-4 h-4" />
              <span>Login / Sign Up</span>
            </button>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={() => setShowLogin(true)}
              className="p-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold"
            >
              <User className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-white border-b border-slate-200 p-4 space-y-3 animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-800 outline-none w-full"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                router.push("/free-listing");
              }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs py-3 rounded-xl shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Free Business Listing</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowLogin(true);
              }}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold text-xs py-3 rounded-xl shadow-md"
            >
              <User className="w-4 h-4" />
              <span>Login or Register</span>
            </button>
          </div>
        )}
      </header>

      {/* LOGIN POPUP */}
      {showLogin && <LoginPopup close={() => setShowLogin(false)} />}

      {/* SAVED BUSINESSES DRAWER */}
      {showSavedDrawer && (
        <SavedBusinessesDrawer
          isOpen={showSavedDrawer}
          onClose={() => setShowSavedDrawer(false)}
        />
      )}
    </>
  );
}
