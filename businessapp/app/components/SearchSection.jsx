"use client";
import { useEffect, useState } from "react";

const numbers = ["4.9 Crore+ Businesses", "5.9 Crore+ Products & Services"];

export default function SearchSection() {
  const [index, setIndex] = useState(0);

  // 🔍 search states
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // animation effect (unchanged)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % numbers.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // 🔎 search handler
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

      setResults(data.data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while searching.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 px-6">
      {/* TEXT */}
      <div className="text-3xl font-semibold flex gap-2 overflow-hidden h-12 mb-4">
        <span>Search across</span>

        <div className="relative h-12 overflow-hidden">
          <div
            className="transition-transform duration-700"
            style={{ transform: `translateY(-${index * 48}px)` }}
          >
            {numbers.map((text, i) => (
              <div key={i} className="h-12 text-purple-800">
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white shadow-md rounded-lg flex items-center p-3 gap-3 max-w-2xl">
        <input
          type="text"
          placeholder="📍 Bhubaneswar"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border px-4 py-2 rounded w-1/4 outline-none"
        />

        <input
          type="text"
          placeholder="Search for Spa, Salon, Restaurant..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border px-4 py-2 rounded w-2/4 outline-none"
        />

        <button
          onClick={handleSearch}
          className="bg-purple-800 text-white px-6 py-2 rounded hover:bg-purple-700"
        >
          {loading ? "Searching..." : "🔍 Search"}
        </button>
      </div>

      {/* ERROR */}
      {error && <p className="text-red-600 mt-4 font-medium">{error}</p>}

      {/* SEARCH RESULTS */}
      <div className="mt-6 max-w-2xl">
        {results.length > 0 && (
          <h3 className="text-lg font-semibold mb-3">
            Search Results ({results.length})
          </h3>
        )}

        {results.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 mb-3 bg-white shadow-sm"
          >
            <h4 className="text-lg font-semibold text-purple-800">
              {item.name}
            </h4>

            <p className="text-sm text-gray-600">
              {item.category}
              {item.subCategory ? ` • ${item.subCategory}` : ""}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              📍 {item.location.area}, {item.location.district},{" "}
              {item.location.state}
            </p>

            <p className="text-sm mt-2 text-gray-700">{item.description}</p>
          </div>
        ))}

        {/* NO RESULTS */}
        {!loading && results.length === 0 && keyword && (
          <p className="text-gray-500 mt-4">
            No businesses found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}
