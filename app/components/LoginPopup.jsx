"use client";
import { useState } from "react";
import { X, Phone, Lock, Building2, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LoginModal({ close }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (!phone || phone.length < 10) {
      return alert("Please enter a valid 10-digit mobile number");
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();
      if (data.otp) setOtp(data.otp); // dev mode fallback
      setStep(2);
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) return alert("Please enter OTP");

    try {
      setLoading(true);
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

      // CLEAN OLD SESSION
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
      alert("Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 p-6 text-white relative">
          <button
            onClick={close}
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">ApnaBiz Account</span>
          </div>
          <p className="text-xs text-indigo-100 font-medium">
            {step === 1 ? "Enter your phone number to continue" : `OTP sent to +91 ${phone}`}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Mobile Number
                </label>
                <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:border-indigo-500 focus-within:bg-white transition">
                  <span className="text-sm font-bold text-slate-500 border-r border-slate-300 pr-2">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    className="w-full bg-transparent text-sm font-bold text-slate-800 placeholder-slate-400 outline-none"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              </div>

              <button
                onClick={sendOtp}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-3 rounded-xl shadow-md shadow-indigo-500/20 transition flex items-center justify-center gap-2"
              >
                <span>{loading ? "Sending OTP..." : "Get Verification OTP"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Enter 4-Digit OTP
                  </label>
                  <button onClick={() => setStep(1)} className="text-xs font-semibold text-indigo-600 hover:underline">
                    Change Phone
                  </button>
                </div>
                <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:border-indigo-500 focus-within:bg-white transition">
                  <Lock className="w-4 h-4 text-indigo-600 shrink-0" />
                  <input
                    type="text"
                    maxLength={6}
                    className="w-full bg-transparent text-sm font-bold text-slate-800 tracking-widest placeholder-slate-400 outline-none"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={verifyOtp}
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 rounded-xl shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{loading ? "Verifying..." : "Verify & Login"}</span>
              </button>
            </div>
          )}

          {/* Admin Toggle */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <button
              onClick={() => (window.location.href = "/admin-login")}
              className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition inline-flex items-center gap-1"
            >
              <span>Are you an Administrator?</span>
              <span className="text-indigo-600 underline">Login as Admin</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
