"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Mail, Building2, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/auth/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid admin credentials");
      }

      localStorage.setItem("adminToken", data.token);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCreds = () => {
    setEmail("admin@gmail.com");
    setPassword("123456");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4 sm:p-6 hero-gradient-bg relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl bg-slate-800/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT BRAND SECTION */}
        <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 p-8 sm:p-12 flex flex-col justify-between text-white relative">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">ApnaBiz</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold mb-4 border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-300" /> Admin Control Panel
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Manage Listings, Categories & Users
            </h1>

            <p className="mt-3 text-emerald-100/80 text-xs sm:text-sm leading-relaxed">
              Secure administrative access for ApnaBiz directory management and master data controls.
            </p>
          </div>

          {/* Quick Credential Card */}
          <div className="mt-8 p-4 rounded-2xl bg-slate-900/60 border border-white/10 text-xs space-y-1">
            <span className="font-bold text-amber-300 block mb-1">🔑 Demo Admin Access:</span>
            <p className="text-slate-300 font-mono">Email: <span className="text-white font-bold">admin@gmail.com</span></p>
            <p className="text-slate-300 font-mono">Password: <span className="text-white font-bold">123456</span></p>
            <button
              onClick={fillDemoCreds}
              className="mt-2 text-[11px] font-bold text-emerald-400 hover:underline inline-flex items-center gap-1"
            >
              Auto-fill Credentials →
            </button>
          </div>
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="p-8 sm:p-12 flex flex-col justify-center bg-slate-800/60">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Admin Sign In</h2>
          <p className="text-xs text-slate-400 mb-6">Enter your authorized credentials below</p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Admin Email
              </label>
              <div className="flex items-center gap-2 border border-slate-700 rounded-xl px-3.5 py-3 bg-slate-900/80 focus-within:border-emerald-500 transition">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="email"
                  required
                  placeholder="admin@gmail.com"
                  className="bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 w-full outline-none font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Password
              </label>
              <div className="flex items-center gap-2 border border-slate-700 rounded-xl px-3.5 py-3 bg-slate-900/80 focus-within:border-emerald-500 transition">
                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 w-full outline-none font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2"
            >
              <span>{loading ? "Verifying..." : "Sign In to Admin Panel"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
