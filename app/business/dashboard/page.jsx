"use client";

import { useEffect, useState } from "react";
import { Sparkles, TrendingUp, Users, Eye, Star, Layers, CheckCircle2, ArrowRight, Building2, MapPin, Phone } from "lucide-react";

export default function Dashboard() {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const businessId = localStorage.getItem("businessId");

    if (!businessId) {
      window.location.href = "/free-listing/register";
      return;
    }

    fetch(`/api/admin/business/get?id=${businessId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBusiness(data.data);
        } else {
          setBusiness(null);
        }
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        setBusiness(null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-500">Loading Business Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-rose-200 text-center max-w-lg mx-auto mt-10">
        <p className="text-rose-600 font-bold text-base">Business profile not found</p>
        <p className="text-xs text-slate-500 mt-1">Please complete registration or contact support.</p>
        <button
          onClick={() => (window.location.href = "/free-listing/register")}
          className="mt-4 bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
        >
          Go to Registration
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* WELCOME BANNER */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" /> Merchant Overview
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {business.name} 👋
          </h1>
          <p className="text-indigo-200 text-xs sm:text-sm mt-1 max-w-xl">
            Your business is active and visible to local customers in {business.district?.name || "your area"}.
          </p>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Active Categories" value="12+" icon={Layers} color="from-indigo-500 to-blue-600" growth="+2 new" />
        <StatCard title="Customer Leads" value="245+" icon={Users} color="from-emerald-500 to-teal-600" growth="+18% this month" />
        <StatCard title="Total Profile Views" value="1.2K" icon={Eye} color="from-amber-500 to-orange-600" growth="+24% vs last week" />
        <StatCard title="Average Rating" value="4.8 ⭐" icon={Star} color="from-purple-500 to-pink-600" growth="Based on 120 reviews" />
      </div>

      {/* TWO COLUMN CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Business Details Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600" />
              <span>Verified Business Info</span>
            </h2>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              {business.status || "Active"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-700">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[11px]">Business Name</span>
              <span className="font-bold text-slate-900 text-sm">{business.name}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[11px]">Primary Phone</span>
              <span className="font-bold text-slate-900 text-sm">{business.phone}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[11px]">Category</span>
              <span className="font-bold text-slate-900 text-sm">{business.category?.name || "General"}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[11px]">Location</span>
              <span className="font-bold text-slate-900 text-sm">
                {business.district?.name}, {business.state?.name}
              </span>
            </div>
          </div>
        </div>

        {/* Growth Checklist Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Why List Your Business?
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Maximize your customer reach with verified listing badges.
            </p>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Reach 5x local customers daily</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Direct WhatsApp & Call queries</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Get verified Trust Badge</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Manage products & website profile</span>
              </li>
            </ul>
          </div>

          <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2">
            <span>Upgrade Profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: IconComponent, color, growth }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>
          <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${color} text-white flex items-center justify-center shadow-xs`}>
            <IconComponent className="w-4 h-4" />
          </div>
        </div>
        <p className="text-2xl font-extrabold text-slate-900 tracking-tight">{value}</p>
      </div>
      <span className="mt-3 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md w-fit">
        {growth}
      </span>
    </div>
  );
}
