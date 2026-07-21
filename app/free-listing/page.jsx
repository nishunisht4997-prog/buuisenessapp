"use client";

import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PhoneCall, ShieldCheck, Rocket, Building2, CheckCircle2, ArrowRight, Sparkles, Users, Star } from "lucide-react";

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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.15),transparent_50%)]" />

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-6">
              <Sparkles className="w-3.5 h-3.5" /> 100% Free Lifetime Business Listing
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Grow Your Local Business & Get <span className="gradient-text-amber">10x Customer Leads</span>
            </h1>

            <p className="mt-4 text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Create your free business profile in under 2 minutes. Reach millions of local buyers in your city looking for your products and services.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setShowLogin(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-sm sm:text-base px-8 py-4 rounded-2xl shadow-xl shadow-amber-500/25 transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>Start Free Listing Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* 3 EASY STEPS */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Quick Setup</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Get Listed in 3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="01"
              icon={PhoneCall}
              title="Enter Mobile Number"
              desc="Verify your primary contact number with a quick 4-digit OTP code."
            />
            <StepCard
              number="02"
              icon={Building2}
              title="Add Business Info"
              desc="Enter business name, category, location, and catalog pictures."
            />
            <StepCard
              number="03"
              icon={Rocket}
              title="Get Listed & Receive Leads"
              desc="Start receiving phone calls and direct WhatsApp inquiries from buyers."
            />
          </div>
        </section>
      </main>

      <Footer />

      {/* LOGIN POPUP */}
      {showLogin && <LoginModal close={() => setShowLogin(false)} />}
    </div>
  );
}

function StepCard({ number, icon: IconComponent, title, desc }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition text-center relative group">
      <span className="text-3xl font-black text-indigo-100 group-hover:text-indigo-200 transition-colors absolute top-4 right-6">
        {number}
      </span>
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
        <IconComponent className="w-7 h-7" />
      </div>
      <h3 className="font-bold text-base text-slate-900 mb-2">{title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}
