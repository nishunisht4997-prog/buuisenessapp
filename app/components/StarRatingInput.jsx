"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function StarRatingInput({ rating, setRating, size = "default" }) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-6 h-6",
    large: "w-8 h-8",
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => setRating(star)}
          className="transition-transform hover:scale-110 active:scale-95"
        >
          <Star
            className={`${sizeClasses[size]} ${
              star <= (hoverRating || rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-none text-slate-300"
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
}
