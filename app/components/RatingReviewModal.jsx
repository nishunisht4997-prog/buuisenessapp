"use client";

import { useState } from "react";
import { X, Star, Loader2, Upload, Image as ImageIcon } from "lucide-react";
import StarRatingInput from "./StarRatingInput";

export default function RatingReviewModal({ isOpen, onClose, businessId, businessName }) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    
    if (!title.trim() || !comment.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          businessId,
          rating,
          title,
          comment,
          photos,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit review");
      }

      // Reset form
      setRating(0);
      setTitle("");
      setComment("");
      setPhotos([]);
      
      onClose();
      alert("Review submitted successfully!");
    } catch (err) {
      console.error("Error submitting review:", err);
      setError(err.message || "Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
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

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-2xl">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Write a Review</h2>
              <p className="text-xs text-slate-600">{businessName}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Star Rating */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Your Rating *
              </label>
              <StarRatingInput rating={rating} setRating={setRating} size="large" />
              {rating > 0 && (
                <p className="text-xs text-slate-500 mt-1">
                  {rating === 5 && "Excellent!"}
                  {rating === 4 && "Very Good"}
                  {rating === 3 && "Good"}
                  {rating === 2 && "Fair"}
                  {rating === 1 && "Poor"}
                </p>
              )}
            </div>

            {/* Review Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Review Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Summarize your experience"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition text-sm"
                maxLength={100}
              />
              <p className="text-xs text-slate-400 mt-1 text-right">{title.length}/100</p>
            </div>

            {/* Review Comment */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Your Review *
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about your experience with this business..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition text-sm resize-none"
                rows={4}
                minLength={20}
                maxLength={1000}
              />
              <p className="text-xs text-slate-400 mt-1 text-right">{comment.length}/1000</p>
            </div>

            {/* Photo Upload (Optional) */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Add Photos (Optional)
              </label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-indigo-300 transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    setPhotos(files.map(f => URL.createObjectURL(f)));
                  }}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">
                    Click to upload photos (max 3)
                  </p>
                </label>
              </div>
              {photos.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {photos.map((photo, idx) => (
                    <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <img src={photo} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 rounded-xl shadow-md shadow-indigo-500/20 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>Submit Review</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
