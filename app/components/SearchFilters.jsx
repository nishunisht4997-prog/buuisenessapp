"use client";

import { useState } from "react";
import { Filter, X, Star, ShieldCheck, Clock, ChevronDown, ChevronUp } from "lucide-react";

export default function SearchFilters({ filters, onFiltersChange, resultCount }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const ratingOptions = [
    { value: 4.0, label: "4.0+ Stars" },
    { value: 3.5, label: "3.5+ Stars" },
    { value: 3.0, label: "3.0+ Stars" },
  ];

  const sortOptions = [
    { value: "highestRated", label: "Highest Rated" },
    { value: "mostReviewed", label: "Most Reviewed" },
    { value: "nearest", label: "Nearest" },
    { value: "priceLow", label: "Price: Low to High" },
    { value: "priceHigh", label: "Price: High to Low" },
  ];

  const toggleFilter = (filterKey) => {
    onFiltersChange({
      ...filters,
      [filterKey]: !filters[filterKey],
    });
  };

  const setRating = (value) => {
    onFiltersChange({
      ...filters,
      minRating: filters.minRating === value ? null : value,
    });
  };

  const setSortBy = (value) => {
    onFiltersChange({
      ...filters,
      sortBy: value,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      minRating: null,
      verifiedOnly: false,
      openNow: false,
      sortBy: null,
    });
  };

  const activeFilterCount = [
    filters.minRating,
    filters.verifiedOnly,
    filters.openNow,
    filters.sortBy,
  ].filter(Boolean).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-bold text-slate-900">Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
          <span className="text-xs text-slate-400">({resultCount} results)</span>
        </div>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-slate-100 rounded transition"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </button>
        </div>
      </div>

      {/* Quick Filters (Always Visible) */}
      <div className="flex flex-wrap gap-2 mb-3">
        {/* Verified Only */}
        <button
          onClick={() => toggleFilter("verifiedOnly")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
            filters.verifiedOnly
              ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
              : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-emerald-300"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified Only</span>
          {filters.verifiedOnly && <X className="w-3 h-3 ml-1" />}
        </button>

        {/* Open Now */}
        <button
          onClick={() => toggleFilter("openNow")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
            filters.openNow
              ? "bg-blue-100 text-blue-700 border border-blue-200"
              : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-blue-300"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Open Now</span>
          {filters.openNow && <X className="w-3 h-3 ml-1" />}
        </button>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-4 pt-3 border-t border-slate-100 animate-in slide-in-from-top-2">
          {/* Rating Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Minimum Rating
            </label>
            <div className="flex flex-wrap gap-2">
              {ratingOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setRating(option.value)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                    filters.minRating === option.value
                      ? "bg-amber-100 text-amber-700 border border-amber-200"
                      : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-amber-300"
                  }`}
                >
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Sort By
            </label>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                    filters.sortBy === option.value
                      ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                      : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-indigo-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && !isExpanded && (
        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
          {filters.minRating && (
            <button
              onClick={() => setRating(null)}
              className="flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg border border-amber-200 hover:bg-amber-100 transition"
            >
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{filters.minRating}+ Stars</span>
              <X className="w-3 h-3" />
            </button>
          )}
          {filters.sortBy && (
            <button
              onClick={() => setSortBy(null)}
              className="flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-lg border border-indigo-200 hover:bg-indigo-100 transition"
            >
              <span>{sortOptions.find(o => o.value === filters.sortBy)?.label}</span>
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
