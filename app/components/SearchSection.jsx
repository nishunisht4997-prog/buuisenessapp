"use client";

import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  LocateFixed,
  Building2,
  Star,
  Phone,
  ShieldCheck,
  Loader2,
  Sparkles,
  Flame,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

const HERO_STATS = [
  "4.9 Cr+ Local Businesses",
  "5.9 Cr+ Products & Services",
  "100% Guaranteed Vendor Leads",
];

const SUGGESTION_CHIPS = [
  "Hotels in BBSR",
  "AC Repair",
  "Banquet Halls",
  "Beauty Spa",
  "Gyms & Fitness",
  "Packers & Movers",
];

export default function SearchSection() {
  const [index, setIndex] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_STATS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleAutoDetectLocation = () => {
    setDetectingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocation("Bhubaneswar (Current GPS)");
          setDetectingLocation(false);
        },
        () => {
          setLocation("Bhubaneswar");
          setDetectingLocation(false);
        }
      );
    } else {
      setLocation("Bhubaneswar");
      setDetectingLocation(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError("");
      setResults([]);

      const params = new URLSearchParams();
      if (keyword) params.append("keyword", keyword);
      if (location) params.append("location", location);

      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error("Search failed");
      }

      setResults(data.data || []);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while searching.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden pt-8 pb-4">
      {/* 🔹 Ambient Gradient Mesh Backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-r from-amber-500/10 via-indigo-500/15 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* 🔹 Rotating Hero Headline */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-6">
          <span className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Search across
          </span>
          <div className="relative h-10 sm:h-12 overflow-hidden">
            <div
              className="transition-transform duration-700 ease-out"
              style={{ transform: `translateY(-${index * 40}px)` }}
            >
              {HERO_STATS.map((text, i) => (
                <div
                  key={i}
                  className="h-10 sm:h-12 text-2xl sm:text-4xl font-black gradient-text flex items-center gap-2"
                >
                  <span>{text}</span>
                  <Sparkles size={24} className="text-amber-400 hidden sm:inline" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🔹 Dual Search Matrix Bar */}
        <div className="glass-card rounded-3xl p-3 sm:p-4 shadow-2xl border border-slate-800 max-w-4xl">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            
            {/* Location Input */}
            <div className="relative flex-1 flex items-center bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-3 focus-within:border-amber-500 transition-all">
              <MapPin size={18} className="text-amber-400 shrink-0 mr-2.5" />
              <input
                type="text"
                placeholder="City or Area (e.g. Bhubaneswar)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent text-xs sm:text-sm text-white font-medium placeholder:text-slate-500 w-full outline-none"
              />
              <button
                onClick={handleAutoDetectLocation}
                type="button"
                title="Auto Detect Location"
                className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-900 rounded-xl transition-colors shrink-0"
              >
                {detectingLocation ? (
                  <Loader2 size={16} className="animate-spin text-amber-400" />
                ) : (
                  <LocateFixed size={16} />
                )}
              </button>
            </div>

            <div className="hidden md:block w-px h-8 bg-slate-800 shrink-0" />

            {/* Service Input */}
            <div className="relative flex-[1.5] flex items-center bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-3 focus-within:border-amber-500 transition-all">
              <Search size={18} className="text-indigo-400 shrink-0 mr-2.5" />
              <input
                type="text"
                placeholder="Search Spa, Salon, Restaurant, Electricians..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="bg-transparent text-xs sm:text-sm text-white font-medium placeholder:text-slate-500 w-full outline-none"
              />
            </div>

            {/* Search CTA */}
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black px-7 py-3.5 rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 whitespace-nowrap text-xs sm:text-sm"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search size={18} />
                  <span>Search Now</span>
                </>
              )}
            </button>
          </div>

          {/* Suggestion Chips */}
          <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-extrabold text-slate-400 flex items-center gap-1 uppercase tracking-wider shrink-0 mr-1">
              <Flame size={13} className="text-amber-400" /> Trending:
            </span>
            {SUGGESTION_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => {
                  setKeyword(chip);
                  handleSearch();
                }}
                className="text-xs font-bold text-slate-300 hover:text-amber-400 bg-slate-950 hover:bg-slate-900 px-3 py-1 rounded-xl border border-slate-800 transition-colors shrink-0 whitespace-nowrap"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Error Notice */}
        {error && (
          <div className="mt-4 p-3 bg-rose-950/60 border border-rose-900 rounded-2xl text-rose-300 text-xs font-bold max-w-4xl">
            {error}
          </div>
        )}

        {/* Search Results Grid */}
        {results.length > 0 && (
          <div className="mt-8 max-w-4xl space-y-4">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Building2 size={20} className="text-amber-400" />
              <span>Search Results ({results.length})</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((item) => (
                <div
                  key={item.id}
                  className="glass-card glass-card-hover rounded-3xl p-5 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-base font-black text-white">{item.name}</h4>
                      <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <ShieldCheck size={12} /> Verified
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-indigo-400 mt-1">
                      {item.category}
                      {item.subCategory ? ` • ${item.subCategory}` : ""}
                    </p>

                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                      <MapPin size={13} className="text-amber-400 shrink-0" />
                      <span>{item.location?.area || "Area"}, {item.location?.district || "District"}</span>
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star size={14} className="fill-amber-400" />
                      <span>4.8</span>
                      <span className="text-slate-500 font-normal">(120+ reviews)</span>
                    </div>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1 transition-colors">
                      <Phone size={13} /> Call Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
