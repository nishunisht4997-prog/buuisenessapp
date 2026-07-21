"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  PlusCircle,
  ShieldCheck,
  TrendingUp,
  Phone,
  CheckCircle2,
  Building2,
  ArrowRight,
  UserCheck,
  Star
} from "lucide-react";
import LoginPopup from "../components/LoginPopup";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function FreeListing() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const businessId = localStorage.getItem("businessId");

    if (userId && businessId) {
      window.location.href = "/business/dashboard";
      return;
    }

    if (userId && !businessId) {
      window.location.href = "/free-listing/register";
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        {/* 🔹 HERO ONBOARDING SECTION */}
        <div className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden text-center border-b border-slate-800">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-r from-amber-500/10 via-indigo-500/15 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10">
            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-4 shadow-sm">
              <Sparkles size={14} /> 100% Free Business Directory
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Grow Your Local Business Online with <span className="gradient-text">ApnaBiz</span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-2xl mx-auto font-medium leading-relaxed">
              Reach over 50,000+ daily local buyers in Odisha. Get verified customer inquiries sent directly to your phone & WhatsApp.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setShowLogin(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black px-8 py-3.5 rounded-2xl text-sm shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
              >
                <PlusCircle size={18} />
                <span>Start Free Registration Now</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 🔹 3 EASY STEPS GRID */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Get Listed in 3 Simple Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
              Takes less than 2 minutes to create your verified store listing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard
              step="Step 1"
              title="Verify Mobile Number"
              desc="Enter your 10-digit mobile number and receive instant OTP verification."
              icon={Phone}
              iconColor="text-amber-400"
              bgColor="bg-amber-500/10"
            />
            <StepCard
              step="Step 2"
              title="Add Business Profile"
              desc="Select category, location, business address, and store photo."
              icon={Building2}
              iconColor="text-indigo-400"
              bgColor="bg-indigo-500/10"
            />
            <StepCard
              step="Step 3"
              title="Get Verified & Receive Leads"
              desc="Get Blue Tick verification and start receiving customer calls & WhatsApp leads!"
              icon={ShieldCheck}
              iconColor="text-emerald-400"
              bgColor="bg-emerald-500/10"
            />
          </div>
        </div>

        {/* 🔹 MERCHANT BENEFITS BANNER */}
        <div className="bg-slate-900 border-y border-slate-800 py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-black text-emerald-400 uppercase tracking-widest block mb-2">Why Choose ApnaBiz</span>
              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Everything You Need To Win Local Customers
              </h3>
              
              <ul className="space-y-4 mt-6 text-xs sm:text-sm">
                <li className="flex items-center gap-3 text-slate-300 font-semibold">
                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                  <span>100% Free Forever listing with zero hidden charges</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300 font-semibold">
                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                  <span>Direct WhatsApp Lead forwarding to your mobile</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300 font-semibold">
                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                  <span>Verified Blue Tick Badge for customer trust</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300 font-semibold">
                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                  <span>Merchant Analytics Dashboard with lead tracking</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl text-center space-y-4">
              <div className="w-14 h-14 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto">
                <TrendingUp size={28} />
              </div>
              <h4 className="text-xl font-black text-white">+18% Average Lead Growth</h4>
              <p className="text-xs text-slate-400 font-medium max-w-sm mx-auto">
                Over 12,000+ local store owners in Bhubaneswar, Cuttack & Puri generate active leads on ApnaBiz daily.
              </p>
              <button
                onClick={() => setShowLogin(true)}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-3 rounded-2xl text-xs shadow-lg transition-all"
              >
                Register Business Now →
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* LOGIN POPUP MODAL */}
      {showLogin && <LoginPopup close={() => setShowLogin(false)} />}

      <Footer />
    </div>
  );
}

function StepCard({ step, title, desc, icon: Icon, iconColor, bgColor }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-black text-amber-400 uppercase tracking-widest">{step}</span>
          <div className={`w-10 h-10 rounded-xl ${bgColor} ${iconColor} flex items-center justify-center`}>
            <Icon size={20} />
          </div>
        </div>
        <h3 className="text-base font-black text-white">{title}</h3>
        <p className="text-xs text-slate-400 mt-2 font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
