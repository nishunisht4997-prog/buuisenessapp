"use client";

import { useState } from "react";
import { X, Calendar, DollarSign, Send, MessageCircle, Sparkles, ShieldCheck } from "lucide-react";

export default function QuoteRequestModal({ isOpen, onClose, businessId, businessName, phone: vendorPhone }) {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    requirements: "",
    preferredDate: "",
    budget: "",
    additionalNotes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customerName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    if (!formData.requirements.trim()) {
      alert("Please describe your requirements");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quote-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId,
          customerId: "user-placeholder",
          ...formData,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const refId = data.referenceId || "QT-10028";
        setReferenceId(refId);

        // Generate WhatsApp Deep Link Payload
        const textMessage = `*NEW QUOTE REQUEST - APNABIZ*\n\n📌 *Business:* ${businessName}\n👤 *Customer:* ${formData.customerName}\n📞 *Phone:* ${formData.phone}\n📧 *Email:* ${formData.email}\n📝 *Requirements:* ${formData.requirements}\n💰 *Budget:* ${formData.budget || "Flexible"}\n📅 *Preferred Date:* ${formData.preferredDate || "Immediate"}\n\n*Reference ID:* ${refId}`;

        const cleanPhone = vendorPhone ? vendorPhone.replace(/\D/g, "") : "919876543210";
        const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(textMessage)}`;
        setWhatsappUrl(waUrl);

        setSubmitSuccess(true);
      } else {
        alert("Failed to submit quote request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting quote request:", error);
      alert("Failed to submit quote request. Please try again.");
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

      {/* Modal Container */}
      <div className="relative bg-slate-900 border border-slate-800 text-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto z-10 p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
              <Sparkles size={16} />
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">Request Instant Quote</h2>
              <p className="text-[11px] text-slate-400 font-medium">Direct Lead Auto-Forwarding</p>
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
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <ShieldCheck size={36} />
            </div>

            <h3 className="text-2xl font-black text-white tracking-tight">Quote Request Submitted!</h3>
            <p className="text-xs text-slate-300 font-medium max-w-xs mx-auto">
              Your request for <strong className="text-amber-400">{businessName}</strong> has been logged in the system.
            </p>
            <p className="text-xs text-slate-400 bg-slate-950 p-2 rounded-xl border border-slate-800 font-mono">
              Reference ID: <span className="text-emerald-400 font-bold">{referenceId}</span>
            </p>

            {/* WhatsApp Auto-Forward CTA */}
            <div className="pt-4 space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-3 rounded-2xl text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle size={18} />
                <span>Send Direct Lead on WhatsApp Now</span>
              </a>

              <button
                onClick={onClose}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2.5 rounded-2xl text-xs transition-colors"
              >
                Done / Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
              <p className="text-[11px] text-slate-400 font-medium">Requesting verified quote from:</p>
              <p className="font-extrabold text-sm text-amber-400 mt-0.5">{businessName}</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Your Full Name *</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-amber-500 transition-colors font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-amber-500 transition-colors font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-amber-500 transition-colors font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Describe Requirements *</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Specify services required, quantities, or special requests..."
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-amber-500 transition-colors resize-none font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Preferred Date</label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-500 transition-colors font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Budget Range</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-500 transition-colors font-medium"
                >
                  <option value="">Select budget range</option>
                  <option value="1k-5k">₹1,000 - ₹5,000</option>
                  <option value="5k-10k">₹5,000 - ₹10,000</option>
                  <option value="10k-25k">₹10,000 - ₹25,000</option>
                  <option value="25k-50k">₹25,000 - ₹50,000</option>
                  <option value="50k+">₹50,000+</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black py-3 rounded-2xl text-xs shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-all mt-2"
            >
              <Send size={16} />
              <span>{isSubmitting ? "Submitting Request..." : "Submit & Auto-Forward via WhatsApp"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
