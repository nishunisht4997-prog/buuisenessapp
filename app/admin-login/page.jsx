"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck, ArrowRight, Building2, Key } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("adminToken", data.token);
      router.push("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col md:flex-row max-w-4xl w-full overflow-hidden">
        
        {/* LEFT BRAND SECTION */}
        <div className="relative md:w-1/2 bg-gradient-to-tr from-emerald-950 via-teal-900 to-indigo-950 text-white p-8 sm:p-12 flex flex-col justify-between overflow-hidden">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg">
                A
              </div>
              <h1 className="text-2xl font-black tracking-tight">
                Apna<span className="text-emerald-400">Biz</span>
              </h1>
            </div>

            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1 mb-4">
              <ShieldCheck size={14} /> Admin Portal
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              Control Panel & Business Management
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed font-medium">
              Manage category listings, verify merchant accounts, oversee user leads, and monitor platform analytics from a unified dashboard.
            </p>
          </div>

          {/* Helper Credentials Banner */}
          <div className="relative z-10 mt-8 p-4 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-slate-800 text-xs">
            <p className="text-amber-400 font-bold flex items-center gap-1.5 mb-1">
              <Key size={14} /> Demo Admin Credentials:
            </p>
            <p className="text-slate-300">Email: <span className="font-mono text-emerald-400 font-bold">admin@gmail.com</span></p>
            <p className="text-slate-300">Password: <span className="font-mono text-emerald-400 font-bold">123456</span></p>
          </div>
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">Admin Sign In</h2>
            <p className="text-xs text-slate-400 mt-1 font-medium">Enter your credentials to access the master panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Admin Email</label>
              <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                <Mail size={18} className="text-slate-500 mr-2.5 shrink-0" />
                <input
                  type="email"
                  required
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-sm text-white placeholder:text-slate-600 w-full outline-none font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Password</label>
              <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                <Lock size={18} className="text-slate-500 mr-2.5 shrink-0" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent text-sm text-white placeholder:text-slate-600 w-full outline-none font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-black py-3 rounded-xl text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>{loading ? "Authenticating..." : "Login to Admin Panel"}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="text-center text-[11px] text-slate-500 mt-6 font-medium">
            Authorized admin access only. All actions are logged.
          </p>
        </div>
      </div>
    </div>
  );
}
