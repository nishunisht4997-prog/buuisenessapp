"use client";

import { useState } from "react";
import { Filter, X, Star, MapPin, DollarSign, TrendingUp, ShieldCheck, Clock } from "lucide-react";

export default function SearchFilters({ filters, onFiltersChange, resultCount }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      minRating: null,
      verifiedOnly: false,
      openNow: false,
      sortBy: "relevance",
      priceLevel: null,
    });
  };

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== null && v !== false && v !== "relevance"
  ).length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden text-slate-100 my-4">
      {/* Filter Toggle Header Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-800/60 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Filter size={16} />
          </div>
          <span className="font-extrabold text-sm text-white">Live Search Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-amber-500 text-slate-950 text-xs font-black px-2 py-0.5 rounded-full">
              {activeFilterCount} Active
            </span>
          )}
        </div>
        <span className="text-xs text-slate-400 font-semibold">{resultCount || 0} Results Found</span>
      </button>

      {/* Filter Options Panel */}
      {isExpanded && (
        <div className="border-t border-slate-800 px-4 py-5 space-y-5 bg-slate-950/60">
          {/* Minimum Rating */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
              <Star size={15} className="text-amber-400 fill-amber-400" />
              Minimum Rating Filter
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "4.0+ Stars ⭐", value: 4.0 },
                { label: "3.5+ Stars", value: 3.5 },
                { label: "3.0+ Stars", value: 3.0 },
                { label: "All Ratings", value: null },
              ].map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleFilterChange("minRating", option.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    filters.minRating === option.value
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Switches: Verified Only & Open Now */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
            {/* Verified Only Toggle */}
            <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-emerald-400" /> Verified Only
              </span>
              <button
                type="button"
                onClick={() => handleFilterChange("verifiedOnly", !filters.verifiedOnly)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  filters.verifiedOnly ? "bg-emerald-500" : "bg-slate-800"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-slate-950 rounded-full transition-transform ${
                    filters.verifiedOnly ? "translate-x-5 bg-white" : ""
                  }`}
                />
              </button>
            </div>

            {/* Open Now Toggle */}
            <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Clock size={16} className="text-amber-400" /> Open Now
              </span>
              <button
                type="button"
                onClick={() => handleFilterChange("openNow", !filters.openNow)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  filters.openNow ? "bg-amber-500" : "bg-slate-800"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-slate-950 rounded-full transition-transform ${
                    filters.openNow ? "translate-x-5 bg-white" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="pt-2 border-t border-slate-800/80">
            <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
              <TrendingUp size={15} className="text-indigo-400" />
              Sorting Order
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-500 font-medium"
            >
              <option value="relevance">Relevance (Default)</option>
              <option value="highestRated">Highest Rated (4.8+)</option>
              <option value="nearest">Nearest Location</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>

          {/* Clear All Button */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="w-full py-2.5 text-xs font-extrabold text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-950/80 rounded-xl border border-rose-900/60 transition-colors flex items-center justify-center gap-1.5"
            >
              <X size={14} /> Clear All Active Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
