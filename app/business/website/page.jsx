"use client";

import { useState } from "react";
import {
  Globe,
  Mail,
  Camera,
  Upload,
  Sparkles,
  Save,
  CheckCircle2,
  Share2,
  AtSign
} from "lucide-react";

export default function WebsiteProfile() {
  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [form, setForm] = useState({
    websiteUrl: "",
    email: "",
    facebook: "",
    instagram: "",
    logo: null,
    logoPreview: null,
  });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({
      ...form,
      logo: file,
      logoPreview: URL.createObjectURL(file),
    });
  };

  const saveWebsiteProfile = async (e) => {
    if (e) e.preventDefault();
    const businessId = localStorage.getItem("businessId");
    if (!businessId) return alert("Session expired. Please log in again.");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("businessId", businessId);
      formData.append("websiteUrl", form.websiteUrl);
      formData.append("email", form.email);
      formData.append("facebook", form.facebook);
      formData.append("instagram", form.instagram);

      if (form.logo) {
        formData.append("logo", form.logo);
      }

      await fetch("/api/business/website-profile", {
        method: "POST",
        body: formData,
      });

      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
      }, 2500);
    } catch (err) {
      console.error(err);
      alert("Error saving website profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4">
      {/* Top Banner Header */}
      <div className="mb-8">
        <span className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-3 shadow-sm">
          <Globe size={14} /> Online Presence & Digital Branding
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-2">
          <span>Website & Social Profile</span>
          <Sparkles size={24} className="text-indigo-400 animate-pulse" />
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1 font-medium">
          Upload your business logo, set your official website domain, and link your social media handles.
        </p>
      </div>

      {/* Success Alert Banner */}
      {savedSuccess && (
        <div className="mb-6 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 px-5 py-3 rounded-2xl text-xs font-black flex items-center gap-2 animate-in zoom-in-95 duration-200">
          <CheckCircle2 size={18} />
          <span>Website & Social Media Settings Saved Successfully!</span>
        </div>
      )}

      {/* Glassmorphic Form Card */}
      <form onSubmit={saveWebsiteProfile} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* LOGO UPLOAD DROPZONE */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-3">Official Business Logo</label>
          <div className="flex flex-col sm:flex-row items-center gap-5 bg-slate-950 p-5 rounded-2xl border border-slate-800">
            {form.logoPreview ? (
              <div className="w-24 h-24 rounded-2xl overflow-hidden relative border border-amber-500/40 shadow-xl shrink-0">
                <img src={form.logoPreview} alt="Logo Preview" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-2xl border border-dashed border-slate-800 bg-slate-900 flex flex-col items-center justify-center text-slate-500 shrink-0">
                <Camera size={26} />
                <span className="text-[10px] mt-1.5 font-bold">No Logo Uploaded</span>
              </div>
            )}

            <div className="space-y-2 text-center sm:text-left">
              <label className="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-indigo-500/20 hover:from-amber-500/30 hover:to-indigo-500/30 text-amber-300 border border-amber-500/40 px-4 py-2.5 rounded-xl text-xs font-black transition-all">
                <Upload size={16} />
                <span>Upload Brand Logo</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
              </label>
              <p className="text-[11px] text-slate-400 font-medium">
                Recommended size: 500x500px (PNG or JPG format). Logo appears on search cards & QR cards.
              </p>
            </div>
          </div>
        </div>

        {/* WEBSITE URL & EMAIL GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Official Website Link</label>
            <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 focus-within:border-amber-500 transition-colors">
              <Globe size={18} className="text-amber-400 mr-3 shrink-0" />
              <input
                type="url"
                placeholder="https://www.yourbusiness.com"
                value={form.websiteUrl}
                onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                className="bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-600 outline-none w-full font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Business Official Email</label>
            <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 focus-within:border-indigo-500 transition-colors">
              <Mail size={18} className="text-indigo-400 mr-3 shrink-0" />
              <input
                type="email"
                placeholder="contact@yourbusiness.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-600 outline-none w-full font-medium"
              />
            </div>
          </div>
        </div>

        {/* SOCIAL MEDIA HANDLES GRID */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <label className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Share2 size={15} className="text-amber-400" />
            <span>Social Media & Brand Channels</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1.5">Facebook Page URL</label>
              <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 focus-within:border-blue-500 transition-colors">
                <Share2 size={18} className="text-blue-400 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="https://facebook.com/yourpage"
                  value={form.facebook}
                  onChange={(e) => setForm({ ...form, facebook: e.target.value })}
                  className="bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-600 outline-none w-full font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1.5">Instagram Profile Handle</label>
              <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 focus-within:border-pink-500 transition-colors">
                <AtSign size={18} className="text-pink-400 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="https://instagram.com/yourhandle"
                  value={form.instagram}
                  onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                  className="bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-600 outline-none w-full font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-700 text-white font-black px-8 py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl shadow-indigo-600/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <Save size={16} />
            <span>{loading ? "Saving Settings..." : "Save Website Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
