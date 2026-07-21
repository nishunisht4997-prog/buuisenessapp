"use client";

import { useState } from "react";
import { X, Star, Camera, ShieldCheck, Sparkles, Send } from "lucide-react";
import StarRatingInput from "./StarRatingInput";

export default function RatingReviewModal({ isOpen, onClose, businessId, businessName }) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a star rating");
      return;
    }

    if (!title.trim() || !comment.trim()) {
      alert("Please fill in the review title and comment");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId,
          userId: "user-placeholder",
          rating,
          title,
          comment,
          photos,
          categories: {
            service: rating,
            quality: rating,
            value: rating,
          },
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          onClose();
          setRating(0);
          setTitle("");
          setComment("");
          setPhotos([]);
          setSubmitSuccess(false);
        }, 2000);
      } else {
        alert("Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-slate-900 border border-slate-800 text-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto z-10 p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
              <Star size={16} className="fill-slate-950" />
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">Write Customer Review</h2>
              <p className="text-[11px] text-slate-400 font-medium">Verified customer feedback</p>
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
        {submitSuccess ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <ShieldCheck size={36} />
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight">Review Submitted!</h3>
            <p className="text-xs text-slate-400 font-medium">Thank you for helping other buyers make informed choices.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <p className="text-[11px] text-slate-400 font-medium">Reviewing Business:</p>
              <p className="font-extrabold text-sm text-amber-400 mt-0.5">{businessName}</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Select Star Rating *</label>
              <StarRatingInput rating={rating} setRating={setRating} size={28} />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Review Headline *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Excellent service & friendly staff!"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-amber-500 transition-colors font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Detailed Review *</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share details of your experience, service quality, and pricing..."
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-amber-500 transition-colors resize-none font-medium"
                required
                minLength={15}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black py-3 rounded-2xl text-xs shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-all mt-2"
            >
              <Send size={16} />
              <span>{isSubmitting ? "Submitting Review..." : "Submit Review"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
