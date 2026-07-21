'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

export default function StarRatingInput({ rating, setRating, size = 24, readonly = false }) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (value) => {
    if (!readonly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  const handleClick = (value) => {
    if (!readonly) {
      setRating(value);
    }
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(star)}
          className="transition-transform hover:scale-110 disabled:hover:scale-100"
          aria-label={`Rate ${star} stars`}
        >
          <Star
            size={size}
            className={`${
              (hoverRating || rating) >= star
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
}
