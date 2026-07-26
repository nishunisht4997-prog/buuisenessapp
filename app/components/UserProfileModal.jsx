"use client";

import { useState, useEffect } from "react";
import { User, Mail, MapPin, Phone, ShieldCheck, X, Save, Sparkles, CheckCircle2 } from "lucide-react";

export default function UserProfileModal({ isOpen, onClose, onSaveSuccess }) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Bhubaneswar");
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const savedPhone = localStorage.getItem("phone") || "+91 98765 43210";
      const savedName = localStorage.getItem("userName") || "";
      const savedEmail = localStorage.getItem("userEmail") || "";
      const savedCity = localStorage.getItem("userCity") || "Bhubaneswar";

      setPhone(savedPhone);
      setName(savedName);
      setEmail(savedEmail);
      setCity(savedCity);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    if (e) e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your Full Name");
      return;
    }

    setSaving(true);

    try {
      localStorage.setItem("userName", name.trim());
      localStorage.setItem("userEmail", email.trim());
      localStorage.setItem("userCity", city);
      localStorage.setItem("userLoggedIn", "true");

      // Notify Navbar & window of auth change
      window.dispatchEvent(new Event("auth-change"));

      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        if (onSaveSuccess) onSaveSuccess();
        onClose();
      }, 1000);
    } catch (err) {
      console.error("Error saving user profile:", err);
      alert("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors z-10"
        >
          <X size={18} />
        </button>

        {/* Header Branding */}
        <div className="mb-6">
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1 mb-2">
            <ShieldCheck size={13} /> Verified User Profile
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Customer Profile Form</span>
            <Sparkles size={18} className="text-amber-400 animate-pulse" />
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Complete your profile to unlock 1-click quote requests & saved bookmarks
          </p>
        </div>

        {/* Success Alert Banner */}
        {savedSuccess && (
          <div className="mb-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 animate-in zoom-in-95 duration-200">
            <CheckCircle2 size={16} />
            <span>Profile Details Saved Successfully!</span>
          </div>
        )}

        {/* Profile Form */}
        <form onSubmit={handleSave} className="space-y-4">
          {/* Verified Phone (Read-Only) */}
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1.5">Verified Mobile Number</label>
            <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-3.5 py-2.5 opacity-80">
              <Phone size={16} className="text-emerald-400 mr-2.5 shrink-0" />
              <input
                type="text"
                value={phone}
                disabled
                className="bg-transparent text-xs sm:text-sm text-slate-300 font-bold w-full outline-none"
              />
              <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                Logged In ✓
              </span>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Full Name *</label>
            <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-3.5 py-2.5 focus-within:border-amber-500 transition-colors">
              <User size={16} className="text-amber-400 mr-2.5 shrink-0" />
              <input
                type="text"
                required
                placeholder="e.g. Nishat Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-600 outline-none w-full font-bold"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Email Address</label>
            <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-3.5 py-2.5 focus-within:border-indigo-500 transition-colors">
              <Mail size={16} className="text-indigo-400 mr-2.5 shrink-0" />
              <input
                type="email"
                placeholder="e.g. nishat@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-600 outline-none w-full font-medium"
              />
            </div>
          </div>

          {/* Preferred City */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Primary Location / City</label>
            <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-3.5 py-2.5 focus-within:border-amber-500 transition-colors">
              <MapPin size={16} className="text-amber-400 mr-2.5 shrink-0" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-transparent text-xs sm:text-sm text-white outline-none w-full font-bold cursor-pointer"
              >
                <option value="Bhubaneswar" className="bg-slate-900 text-white">Bhubaneswar</option>
                <option value="Cuttack" className="bg-slate-900 text-white">Cuttack</option>
                <option value="Puri" className="bg-slate-900 text-white">Puri</option>
                <option value="Rourkela" className="bg-slate-900 text-white">Rourkela</option>
                <option value="Sambalpur" className="bg-slate-900 text-white">Sambalpur</option>
                <option value="Berhampur" className="bg-slate-900 text-white">Berhampur</option>
              </select>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl shadow-orange-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mt-2"
          >
            <Save size={16} />
            <span>{saving ? "Saving Profile..." : "Save Profile Details"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
