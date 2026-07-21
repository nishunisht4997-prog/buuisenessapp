'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

export default function BookmarkButton({ businessId, size = 24, className = '' }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check localStorage for bookmarked businesses
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(businessId));
  }, [businessId]);

  const toggleBookmark = async () => {
    setIsLoading(true);
    
    try {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      
      if (isBookmarked) {
        // Remove from bookmarks
        const newBookmarks = bookmarks.filter((id) => id !== businessId);
        localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
        setIsBookmarked(false);
        
        // Try to sync with server if logged in
        try {
          await fetch('/api/bookmarks/' + businessId, { method: 'DELETE' });
        } catch (e) {
          console.log('Server sync failed, using localStorage only');
        }
      } else {
        // Add to bookmarks
        const newBookmarks = [...bookmarks, businessId];
        localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
        setIsBookmarked(true);
        
        // Try to sync with server if logged in
        try {
          await fetch('/api/bookmarks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ businessId }),
          });
        } catch (e) {
          console.log('Server sync failed, using localStorage only');
        }
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      disabled={isLoading}
      className={`transition-all duration-300 ${className}`}
      aria-label={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
    >
      <Heart
        size={size}
        className={`${isBookmarked ? 'fill-red-500 text-red-500' : 'text-gray-400'} 
          ${isLoading ? 'opacity-50' : ''} 
          hover:scale-110 transition-transform`}
      />
    </button>
  );
}
