"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

export default function BookmarkButton({ businessId, size = "default" }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check localStorage for guest bookmarks
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setIsBookmarked(savedBookmarks.includes(businessId));
  }, [businessId]);

  const toggleBookmark = async () => {
    setLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");

      if (token) {
        // Logged in user - API call
        const res = await fetch("/api/bookmarks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ businessId }),
        });

        const data = await res.json();
        
        if (data.success) {
          setIsBookmarked(data.action === "added");
        }
      } else {
        // Guest user - localStorage
        if (savedBookmarks.includes(businessId)) {
          const newBookmarks = savedBookmarks.filter(id => id !== businessId);
          localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
          setIsBookmarked(false);
        } else {
          localStorage.setItem("bookmarks", JSON.stringify([...savedBookmarks, businessId]));
          setIsBookmarked(true);
        }
        
        // Dispatch event for other components
        window.dispatchEvent(new Event("bookmarkChange"));
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setLoading(false);
    }
  };

  const sizeClasses = {
    small: "w-5 h-5",
    default: "w-6 h-6",
    large: "w-7 h-7",
  };

  return (
    <button
      onClick={toggleBookmark}
      disabled={loading}
      className={`relative group transition-transform hover:scale-110 active:scale-95 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      title={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
    >
      <Heart
        className={`${sizeClasses[size]} ${
          isBookmarked
            ? "fill-rose-500 text-rose-500"
            : "fill-none text-slate-400 group-hover:text-rose-400"
        } transition-colors duration-300`}
      />
      {isBookmarked && (
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
      )}
    </button>
  );
}
