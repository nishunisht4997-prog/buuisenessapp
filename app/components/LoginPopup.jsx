"use client";

import { useState } from "react";
import {
  Phone,
  Lock,
  ShieldCheck,
  X,
  ArrowRight,
  Sparkles,
  UserCheck,
  Building2,
  RefreshCw
} from "lucide-react";

export default function LoginModal({ close }) {
  const [activeTab, setActiveTab] = useState("USER"); // USER | MERCHANT
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  const sendOtp = async (e) => {
    if (e) e.preventDefault();
    if (!phone || phone.length < 10) return alert("Enter valid 10-digit mobile number");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();
      setOtp(data.otp || "1234"); // demo fallback
      setStep(2);
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    if (e) e.preventDefault();
    if (!otp) return alert("Enter OTP");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login-verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Invalid OTP");
        return;
      }

      // 🔥 Clean old session
      localStorage.removeItem("userId");
      localStorage.removeItem("businessId");
      localStorage.removeItem("phone");

      if (data.userId) {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("phone", phone);
      }

      if (data.businessId) {
        localStorage.setItem("businessId", data.businessId);
      }

      window.location.href = data.redirect || "/";
    } catch (err) {
      console.error(err);
      alert("Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 sm:p-8 relative shadow-2xl overflow-hidden">
        
        {/* Top Decorative Glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />

        {/* Close Button */}
        <button
          onClick={close}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors z-10"
          aria-label="Close Modal"
        >
          <X size={18} />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-md">
            A
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight leading-none">
              Apna<span className="text-amber-400">Biz</span>
            </h2>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sign In / Register</span>
          </div>
        </div>

        {/* Role Switcher Tabs */}
        <div className="grid grid-cols-2 gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 mb-6">
          <button
            onClick={() => { setActiveTab("USER"); setStep(1); }}
            className={`py-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "USER"
                ? "bg-amber-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <UserCheck size={14} /> User Login
          </button>

          <button
            onClick={() => { setActiveTab("MERCHANT"); setStep(1); }}
            className={`py-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "MERCHANT"
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Building2 size={14} /> Merchant Portal
          </button>
        </div>

        {/* Step 1: Mobile Phone Input */}
        {step === 1 && (
          <form onSubmit={sendOtp} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">
                {activeTab === "USER" ? "Mobile Number" : "Registered Business Mobile"}
              </label>
              <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-3.5 py-3 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all">
                <span className="text-xs font-bold text-amber-400 pr-2 border-r border-slate-800 mr-2.5">+91</span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="Enter 10-digit number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="bg-transparent text-sm text-white placeholder:text-slate-600 w-full outline-none font-medium tracking-wide"
                />
                <Phone size={18} className="text-slate-500 shrink-0 ml-2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full font-black py-3 rounded-2xl text-xs shadow-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === "USER"
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 shadow-orange-500/20"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-indigo-600/20"
              }`}
            >
              <span>{loading ? "Sending OTP..." : "Get Verification OTP"}</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <form onSubmit={verifyOtp} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-300">Enter OTP</label>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[11px] font-bold text-amber-400 hover:underline"
                >
                  Change Number
                </button>
              </div>

              <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-3.5 py-3 focus-within:border-amber-500 transition-all">
                <Lock size={18} className="text-slate-500 mr-2.5 shrink-0" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="Enter 4-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="bg-transparent text-sm text-white placeholder:text-slate-600 w-full outline-none font-mono tracking-widest"
                />
              </div>

              {/* Dev Hint */}
              <div className="mt-2 text-[11px] font-semibold text-slate-400 bg-slate-950/60 p-2 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <span>Demo OTP: <strong className="text-emerald-400 font-mono">{otp || "1234"}</strong></span>
                <span className="text-[10px] text-slate-500">Auto-filled</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-black py-3 rounded-2xl text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck size={16} />
              <span>{loading ? "Verifying..." : "Verify & Continue"}</span>
            </button>
          </form>
        )}

        {/* Footer Admin Portal Link */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <button
            onClick={() => (window.location.href = "/admin-login")}
            className="text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1"
          >
            <ShieldCheck size={14} className="text-amber-400" />
            <span>Switch to Admin Portal Sign In →</span>
          </button>
        </div>
      </div>
    </div>
  );
}
