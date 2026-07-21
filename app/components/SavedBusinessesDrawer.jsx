"use client";

import { useState, useEffect } from "react";
import { X, Heart, MapPin, Phone, Star, Trash2, PhoneCall, MessageCircle } from "lucide-react";

export default function SavedBusinessesDrawer({ isOpen, onClose }) {
  const [savedBusinesses, setSavedBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchSavedBusinesses();
    }
  }, [isOpen]);

  const fetchSavedBusinesses = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/bookmarks");
      if (response.ok) {
        const data = await response.json();
        setSavedBusinesses(data.data || []);
      } else {
        const bookmarkIds = JSON.parse(localStorage.getItem("bookmarks") || "[]");
        if (bookmarkIds.length > 0) {
          const searchResponse = await fetch("/api/search?keyword=");
          const searchData = await searchResponse.json();
          const filtered = searchData.data?.filter((b) => bookmarkIds.includes(b.id)) || [];
          setSavedBusinesses(filtered);
        }
      }
    } catch (error) {
      console.error("Error fetching saved businesses:", error);
      const bookmarkIds = JSON.parse(localStorage.getItem("bookmarks") || "[]");
      setSavedBusinesses(bookmarkIds.map((id) => ({ id, name: "Saved Business", category: "Services" })));
    } finally {
      setLoading(false);
    }
  };

  const removeBookmark = async (businessId) => {
    try {
      await fetch(`/api/bookmarks/${businessId}`, { method: "DELETE" });
      const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
      const newBookmarks = bookmarks.filter((id) => id !== businessId);
      localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
      setSavedBusinesses(savedBusinesses.filter((b) => b.id !== businessId));
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-slate-900 border-l border-slate-800 text-slate-100 h-full shadow-2xl overflow-y-auto z-10 flex flex-col justify-between">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center">
              <Heart size={18} className="fill-rose-400" />
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">Saved Businesses</h2>
              <p className="text-[11px] text-slate-400 font-medium">Your bookmarked items</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1">
          {loading ? (
            <div className="text-center py-12 text-slate-400 font-medium">Loading saved businesses...</div>
          ) : savedBusinesses.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-600">
                <Heart size={32} />
              </div>
              <p className="text-sm font-bold text-slate-300">No saved businesses yet</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Click the heart icon on any business card to save it for quick access later.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedBusinesses.map((business) => (
                <div
                  key={business.id}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-4 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-extrabold text-white text-sm">{business.name}</h3>
                      <p className="text-xs text-indigo-400 font-semibold mt-0.5">{business.category}</p>

                      {business.area && (
                        <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                          <MapPin size={13} className="text-amber-400 shrink-0" />
                          <span>{business.area}, {business.district}</span>
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => removeBookmark(business.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-900">
                    {business.phone && (
                      <a
                        href={`tel:${business.phone}`}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors"
                      >
                        <PhoneCall size={13} /> Call
                      </a>
                    )}
                    {business.phone && (
                      <a
                        href={`https://wa.me/${business.phone?.replace("+", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-[11px] px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors"
                      >
                        <MessageCircle size={13} /> WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
