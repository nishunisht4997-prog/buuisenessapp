"use client";

import { useState, useEffect } from "react";
import { Heart, X, MapPin, Star, ArrowRight, Trash2, Loader2 } from "lucide-react";

export default function SavedBusinessesDrawer({ isOpen, onClose }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchBookmarks();
    }
  }, [isOpen]);

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      if (token) {
        // Fetch from API
        const res = await fetch("/api/bookmarks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setBookmarks(data.data);
        }
      } else {
        // Fetch from localStorage
        const savedIds = JSON.parse(localStorage.getItem("bookmarks") || "[]");
        // For guest users, we'd need to fetch business details by IDs
        // For now, show placeholder
        setBookmarks(savedIds.map(id => ({ id, name: "Business", category: "Category", area: "Area" })));
      }
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeBookmark = async (businessId) => {
    try {
      const token = localStorage.getItem("token");
      
      if (token) {
        await fetch("/api/bookmarks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ businessId }),
        });
      } else {
        const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
        const newBookmarks = savedBookmarks.filter(id => id !== businessId);
        localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
      }
      
      setBookmarks(bookmarks.filter(b => b.id !== businessId));
      window.dispatchEvent(new Event("bookmarkChange"));
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h2 className="text-lg font-bold text-slate-900">Saved Businesses</h2>
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">
              {bookmarks.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
          ) : bookmarks.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-700 mb-2">No saved businesses yet</h3>
              <p className="text-sm text-slate-500">
                Click the heart icon on any business to save it here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarks.map((business) => (
                <div
                  key={business.id}
                  className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 truncate">
                        {business.name}
                      </h4>
                      <p className="text-xs font-medium text-indigo-600 mt-0.5">
                        {business.category}
                        {business.subCategory && ` • ${business.subCategory}`}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">
                          {business.area}, {business.district}
                        </span>
                      </p>
                      {business.averageRating && (
                        <div className="flex items-center gap-1 mt-2 text-amber-500 font-bold text-xs">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{business.averageRating.toFixed(1)}</span>
                          <span className="text-slate-400 font-normal">
                            ({business.totalReviews || 0} reviews)
                          </span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeBookmark(business.id)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition opacity-0 group-hover:opacity-100"
                      title="Remove from bookmarks"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {bookmarks.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-3 rounded-xl transition">
              <span>Compare Saved Businesses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
