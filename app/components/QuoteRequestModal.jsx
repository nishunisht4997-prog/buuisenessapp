"use client";

import { useState } from "react";
import { X, Loader2, Calendar, DollarSign, FileText, Send, CheckCircle } from "lucide-react";

export default function QuoteRequestModal({ isOpen, onClose, businessId, businessName }) {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    requirements: "",
    preferredDate: "",
    budget: "",
    additionalNotes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  const budgetOptions = [
    { value: "1k-5k", label: "₹1,000 - ₹5,000" },
    { value: "5k-10k", label: "₹5,000 - ₹10,000" },
    { value: "10k-25k", label: "₹10,000 - ₹25,000" },
    { value: "25k-50k", label: "₹25,000 - ₹50,000" },
    { value: "50k+", label: "₹50,000+" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.customerName.trim() || !formData.phone.trim() || !formData.email.trim() || 
        !formData.requirements.trim() || !formData.preferredDate || !formData.budget) {
      setError("Please fill in all required fields");
      return;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      
      const res = await fetch("/api/quote-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          businessId,
          ...formData,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit quote request");
      }

      setSuccess(true);
      setReferenceId(data.data?.id || "QR" + Date.now());
      
      // Reset form after delay
      setTimeout(() => {
        setFormData({
          customerName: "",
          phone: "",
          email: "",
          requirements: "",
          preferredDate: "",
          budget: "",
          additionalNotes: "",
        });
        setSuccess(false);
        onClose();
      }, 3000);
    } catch (err) {
      console.error("Error submitting quote request:", err);
      setError(err.message || "Failed to submit quote request. Please try again.");
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
          <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-gradient-to-r from-amber-50 to-orange-50 rounded-t-2xl">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Get Quote</h2>
              <p className="text-xs text-slate-600">{businessName}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Success Message */}
          {success ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Quote Request Submitted!</h3>
              <p className="text-sm text-slate-600 mb-4">
                Your request has been sent to the business. They will contact you shortly.
              </p>
              <div className="bg-slate-50 rounded-xl p-3 inline-block">
                <p className="text-xs text-slate-500">Reference ID</p>
                <p className="text-sm font-bold text-indigo-600">{referenceId}</p>
              </div>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Customer Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition text-sm"
                  required
                />
              </div>

              {/* Phone & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit number"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition text-sm"
                    required
                  />
                </div>
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Service Requirements *
                </label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="Describe what service you need..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition text-sm resize-none"
                  rows={3}
                  required
                />
              </div>

              {/* Preferred Date & Budget Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-amber-600" />
                    Budget Range *
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition text-sm bg-white"
                    required
                  >
                    <option value="">Select budget</option>
                    {budgetOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-600" />
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  placeholder="Any other details you'd like to share..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition text-sm resize-none"
                  rows={2}
                />
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
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-amber-400 disabled:to-orange-400 text-white font-semibold py-3 rounded-xl shadow-md shadow-orange-500/20 transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Quote Request</span>
                  </>
                )}
              </button>

              <p className="text-xs text-slate-400 text-center">
                By submitting, you agree to receive quotes from this business
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
