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
  Menu,
  X,
  Bot,
  Download,
  Utensils,
  Hotel,
  Sofa,
  GraduationCap,
  Hospital,
  HardHat,
  Dumbbell,
  Package,
  Home,
  LogIn
} from "lucide-react";
import LoginPopup from "./LoginPopup";
import SavedBusinessesDrawer from "./SavedBusinessesDrawer";
import AIChatbotModal from "./AIChatbotModal";

const CITIES = [
  { name: "Bhubaneswar", short: "BBSR", state: "Odisha", popular: true },
  { name: "Cuttack", short: "CTC", state: "Odisha", popular: true },
  { name: "Puri", short: "PURI", state: "Odisha", popular: true },
  { name: "Rourkela", short: "RKL", state: "Odisha", popular: true },
  { name: "Sambalpur", short: "SBP", state: "Odisha", popular: false },
  { name: "Berhampur", short: "BAM", state: "Odisha", popular: false },
  { name: "Balasore", short: "BLS", state: "Odisha", popular: false },
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
  const [showAiBot, setShowAiBot] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [selectedCity, setSelectedCity] = useState("Bhubaneswar");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      {/* 🔹 Top Statistical & Trust Bar (Desktop only) */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800/80 hidden lg:block">
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
            <span
              onClick={() => setShowAiBot(true)}
              className="flex items-center gap-1 text-amber-400 font-black cursor-pointer hover:text-amber-300 transition"
            >
              <Bot size={13} /> AI Smart Matchmaker
            </span>
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

      {/* 🔹 Main Glassmorphic Navbar */}
      <header className="w-full glass-nav sticky top-0 z-40 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 py-2 sm:py-3 flex items-center justify-between gap-1.5 sm:gap-4">
          
          {/* LEFT: Logo & City Dropdown */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Logo */}
            <div
              onClick={() => router.push("/")}
              className="flex items-center gap-1 sm:gap-2 cursor-pointer group shrink-0"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm sm:text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
                A
              </div>
              <h1 className="text-sm sm:text-2xl font-black tracking-tight leading-none whitespace-nowrap">
                <span className="text-amber-500">Apna</span>
                <span className="text-white">Biz</span>
              </h1>
            </div>

            {/* City Dropdown Selector */}
            <div className="relative shrink-0" ref={cityDropdownRef}>
              <button
                onClick={() => setShowCityDropdown(!showCityDropdown)}
                className="flex items-center gap-1 bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-[11px] sm:text-sm font-extrabold px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-slate-800 transition-colors shadow-sm"
              >
                <MapPin size={12} className="text-amber-400 shrink-0" />
                <span className="truncate max-w-[50px] xs:max-w-[70px] sm:max-w-[120px]">{selectedCity}</span>
                <ChevronDown size={12} className={`text-slate-400 transition-transform duration-200 ${showCityDropdown ? "rotate-180" : ""}`} />
              </button>

              {showCityDropdown && (
                <div className="absolute top-full left-0 mt-2 w-52 sm:w-60 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-2 sm:p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-white">
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

          {/* RIGHT: Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* AI Bot Button (Desktop/Tablet) */}
            <button
              onClick={() => setShowAiBot(true)}
              className="hidden md:flex bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-400 font-black px-3 py-2 rounded-xl text-xs items-center gap-1 shadow-sm transition-all whitespace-nowrap"
              title="AI Smart Matchmaker"
            >
              <Bot size={15} className="text-amber-400 shrink-0" />
              <span>AI Matchmaker</span>
            </button>

            {/* Free Listing CTA Button */}
            <button
              onClick={() => router.push("/free-listing")}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs flex items-center gap-1 shadow-md shadow-orange-500/20 hover:shadow-lg transition-all duration-200 whitespace-nowrap"
            >
              <PlusCircle size={14} />
              <span className="hidden sm:inline">Free Listing</span>
              <span className="sm:hidden font-bold">+ Add</span>
            </button>

            {/* Saved Bookmarks Button */}
            <button
              onClick={() => setShowBookmarks(true)}
              className="relative p-1.5 sm:p-2.5 text-slate-300 hover:text-amber-400 hover:bg-slate-800 rounded-xl transition-colors shrink-0"
              aria-label="Saved businesses"
              title="Saved Businesses"
            >
              <Heart size={18} className="sm:w-5 sm:h-5" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow animate-pulse">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* 🔑 LOGIN / SIGN UP BUTTON */}
            <button
              onClick={() => setShowLogin(true)}
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs flex items-center gap-1 shadow-lg shadow-orange-500/20 transition-all whitespace-nowrap shrink-0"
            >
              <User size={14} className="text-slate-950 shrink-0" />
              <span className="hidden sm:inline">Login / Sign Up</span>
              <span className="sm:hidden font-extrabold">Login</span>
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-slate-300 hover:text-white rounded-xl bg-slate-900 border border-slate-800 shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* 🔹 Quick Category Nav Strip (Tablet/Desktop) */}
        <div className="bg-slate-950/80 border-t border-slate-800/80 px-4 sm:px-6 py-2 overflow-x-auto no-scrollbar hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center gap-2.5">
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

      {/* 🔹 MOBILE SLIDE-OVER DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative w-4/5 max-w-xs bg-slate-900 border-r border-slate-800 text-slate-100 h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto z-10">
            <div>
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white font-black text-sm flex items-center justify-center">
                    A
                  </div>
                  <span className="font-black text-base text-white">
                    Apna<span className="text-amber-400">Biz</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation Links List */}
              <div className="space-y-2">
                {/* Highlighted Login / Sign Up Button inside Drawer */}
                <button
                  onClick={() => { setShowLogin(true); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 px-3.5 py-3 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg"
                >
                  <User size={16} className="text-slate-950" />
                  <span>Login / Sign Up Now</span>
                </button>

                {/* PWA App Install Button */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (window.deferredPWAInstall) {
                      window.deferredPWAInstall();
                    } else {
                      alert("To install ApnaBiz PWA App:\n1. Tap your browser menu (3 dots or share icon)\n2. Select 'Add to Home Screen' or 'Install App'");
                    }
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                >
                  <Download size={16} />
                  <span>Install ApnaBiz App 📲</span>
                </button>

                <button
                  onClick={() => { setShowAiBot(true); setMobileMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-black text-amber-400 bg-slate-950 border border-slate-800"
                >
                  <Bot size={16} />
                  <span>AI Smart Matchmaker Chatbot</span>
                </button>

                <button
                  onClick={() => { router.push("/"); setMobileMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-800"
                >
                  <Home size={16} className="text-amber-400" />
                  <span>Home Page</span>
                </button>

                <button
                  onClick={() => { router.push("/free-listing"); setMobileMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-800"
                >
                  <PlusCircle size={16} className="text-amber-400" />
                  <span>Free Business Listing</span>
                </button>

                <button
                  onClick={() => { router.push("/business/dashboard"); setMobileMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-800"
                >
                  <TrendingUp size={16} className="text-indigo-400" />
                  <span>Merchant Portal</span>
                </button>

                <button
                  onClick={() => { router.push("/admin-login"); setMobileMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-800"
                >
                  <ShieldCheck size={16} className="text-emerald-400" />
                  <span>Admin Sign In</span>
                </button>
              </div>

              {/* Quick Categories List */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-2">
                  Browse Categories
                </span>
                <div className="space-y-1">
                  {QUICK_NAV_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.slug}
                        onClick={() => { router.push(`/category/${cat.slug}`); setMobileMenuOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800"
                      >
                        <Icon size={14} className="text-amber-400" />
                        <span>{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Drawer Bottom Login Trigger */}
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => { setShowLogin(true); setMobileMenuOpen(false); }}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <LogIn size={16} className="text-amber-400" />
                <span>Login / Sign Up</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ LOGIN POPUP */}
      {showLogin && <LoginPopup close={() => setShowLogin(false)} />}

      {/* ✅ SAVED BUSINESSES DRAWER */}
      {showBookmarks && <SavedBusinessesDrawer isOpen={showBookmarks} onClose={() => setShowBookmarks(false)} />}

      {/* ✅ AI SMART MATCHMAKER CHATBOT */}
      {showAiBot && <AIChatbotModal isOpen={showAiBot} onClose={() => setShowAiBot(false)} />}
    </>
  );
}
