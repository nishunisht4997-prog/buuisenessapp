"use client";
import { useEffect, useState } from "react";
import { Search, MapPin, Sparkles, Navigation, Star, ShieldCheck, ArrowRight, Loader2, MessageSquare } from "lucide-react";
import BookmarkButton from "./BookmarkButton";
import RatingReviewModal from "./RatingReviewModal";
import BusinessQuickViewDrawer from "./BusinessQuickViewDrawer";
import SearchFilters from "./SearchFilters";
import QuoteRequestModal from "./QuoteRequestModal";

const rotateTexts = [
  "4.9 Crore+ Local Businesses",
  "5.9 Crore+ Products & Services",
  "Top Rated Doctors & Hospitals",
  "Instant Verified B2B Quotes",
];

const trendingSearches = [
  { label: "Restaurants", icon: "🍽️", keyword: "restaurant" },
  { label: "Hotels", icon: "🏨", keyword: "hotel" },
  { label: "Beauty & Spa", icon: "💆‍♀️", keyword: "spa" },
  { label: "AC Repair", icon: "🔧", keyword: "ac repair" },
  { label: "Packers & Movers", icon: "📦", keyword: "movers" },
  { label: "PG / Hostels", icon: "🏠", keyword: "pg" },
];

export default function SearchSection() {
  const [textIndex, setTextIndex] = useState(0);

  // 🔍 search states
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("Bhubaneswar");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Filter states
  const [filters, setFilters] = useState({
    minRating: null,
    verifiedOnly: false,
    openNow: false,
    sortBy: null,
  });

  // Review modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  // Quick view drawer state
  const [showQuickView, setShowQuickView] = useState(false);
  const [quickViewBusiness, setQuickViewBusiness] = useState(null);

  // Quote modal state
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteBusiness, setQuoteBusiness] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotateTexts.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (overrideKeyword) => {
    const searchKeyword = overrideKeyword !== undefined ? overrideKeyword : keyword;
    if (!searchKeyword && !location) return;

    try {
      setLoading(true);
      setError("");
      setResults([]);

      const params = new URLSearchParams();
      if (searchKeyword) params.append("keyword", searchKeyword);
      if (location) params.append("location", location);
      
      // Add filters
      if (filters.minRating) params.append("minRating", filters.minRating);
      if (filters.verifiedOnly) params.append("verifiedOnly", "true");
      if (filters.openNow) params.append("openNow", "true");
      if (filters.sortBy) params.append("sortBy", filters.sortBy);

      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error("Search failed");
      }

      setResults(data.data || []);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while searching. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative pt-8 pb-10 px-4 sm:px-6 hero-gradient-bg border-b border-slate-100 overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-4 animate-fade-in shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          <span>India's #1 Local Business & Service Finder</span>
        </div>

        {/* Hero Title with Rotating Counter */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Search across{" "}
          <span className="block sm:inline-block h-14 overflow-hidden align-bottom">
            <span
              className="inline-block transition-transform duration-700 ease-out gradient-text"
              style={{ transform: `translateY(-${textIndex * 56}px)` }}
            >
              {rotateTexts.map((text, i) => (
                <span key={i} className="block h-14 leading-tight">
                  {text}
                </span>
              ))}
            </span>
          </span>
        </h1>

        <p className="mt-3 text-slate-500 text-sm sm:text-base max-w-xl">
          Get direct contact info, ratings, reviews, pricing, and instant quotes for local experts near you.
        </p>

        {/* Dual Search Input Box */}
        <div className="mt-8 w-full max-w-3xl bg-white p-2.5 sm:p-3 rounded-2xl shadow-xl shadow-indigo-900/5 border border-slate-200/80 flex flex-col sm:flex-row items-center gap-2.5">
          {/* Location Input */}
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100 w-full sm:w-1/3 focus-within:border-indigo-400 transition">
            <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
            <input
              type="text"
              placeholder="Enter Location / City"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 w-full outline-none font-medium"
            />
            <button
              title="Use current location"
              onClick={() => setLocation("Bhubaneswar")}
              className="p-1 text-slate-400 hover:text-indigo-600 transition"
            >
              <Navigation className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Keyword Input */}
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100 w-full sm:w-2/3 focus-within:border-indigo-400 transition">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search for Spa, Salon, Restaurant, Electrician..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 w-full outline-none font-medium"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={() => handleSearch()}
            disabled={loading}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md shadow-indigo-600/25 transition flex items-center justify-center gap-2 shrink-0 disabled:opacity-75"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Search</span>
              </>
            )}
          </button>
        </div>

        {/* Trending Searches Pills */}
        <div className="mt-5 flex items-center justify-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">Popular:</span>
          {trendingSearches.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setKeyword(item.label);
                handleSearch(item.label);
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 font-medium shadow-2xs transition hover:scale-105"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="max-w-2xl mx-auto mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl text-center">
          {error}
        </div>
      )}

      {/* SEARCH RESULTS DISPLAY */}
      {results.length > 0 && (
        <div className="max-w-4xl mx-auto mt-8">
          {/* Filters */}
          <SearchFilters
            filters={filters}
            onFiltersChange={(newFilters) => {
              setFilters(newFilters);
              handleSearch();
            }}
            resultCount={results.length}
          />

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>Search Results</span>
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">
                {results.length} found
              </span>
            </h3>
            <button 
              onClick={() => {
                setResults([]);
                setFilters({ minRating: null, verifiedOnly: false, openNow: false, sortBy: null });
              }} 
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Clear Results
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setQuickViewBusiness(item);
                  setShowQuickView(true);
                }}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-base font-bold text-slate-900 hover:text-indigo-600 transition">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <BookmarkButton businessId={item.id} size="small" />
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full shrink-0">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        Verified
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-medium text-indigo-600 mt-1">
                    {item.category} {item.subCategory ? `• ${item.subCategory}` : ""}
                  </p>

                  <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>
                      {item.location?.area}, {item.location?.district}, {item.location?.state}
                    </span>
                  </p>

                  {item.description && (
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>4.8</span>
                    <span className="text-slate-400 font-normal">(120+ reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBusiness(item);
                        setShowReviewModal(true);
                      }}
                      className="text-xs font-semibold text-slate-600 hover:text-indigo-600 flex items-center gap-1 transition"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Review</span>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuoteBusiness(item);
                        setShowQuoteModal(true);
                      }}
                      className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition"
                    >
                      <span>Get Quote</span>
                    </button>
                    <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                      View Contact <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NO RESULTS DISPLAY */}
      {!loading && results.length === 0 && keyword && (
        <div className="max-w-md mx-auto mt-6 bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-xs">
          <p className="text-slate-600 font-medium text-sm">
            No businesses found matching <span className="font-bold text-slate-800">"{keyword}"</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">Try searching with a broader term or different city.</p>
        </div>
      )}

      {/* RATING REVIEW MODAL */}
      {showReviewModal && selectedBusiness && (
        <RatingReviewModal
          isOpen={showReviewModal}
          onClose={() => {
            setShowReviewModal(false);
            setSelectedBusiness(null);
          }}
          businessId={selectedBusiness.id}
          businessName={selectedBusiness.name}
        />
      )}

      {/* BUSINESS QUICK VIEW DRAWER */}
      {showQuickView && quickViewBusiness && (
        <BusinessQuickViewDrawer
          isOpen={showQuickView}
          onClose={() => {
            setShowQuickView(false);
            setQuickViewBusiness(null);
          }}
          business={quickViewBusiness}
        />
      )}

      {/* QUOTE REQUEST MODAL */}
      {showQuoteModal && quoteBusiness && (
        <QuoteRequestModal
          isOpen={showQuoteModal}
          onClose={() => {
            setShowQuoteModal(false);
            setQuoteBusiness(null);
          }}
          businessId={quoteBusiness.id}
          businessName={quoteBusiness.name}
        />
      )}
    </div>
  );
}
