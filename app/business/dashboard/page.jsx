"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  Eye,
  Users,
  Star,
  CheckCircle2,
  Building2,
  ArrowUpRight,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  PlusCircle,
  Clock
} from "lucide-react";

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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (!business) {
    return (
      <div className="p-8 bg-slate-950 border border-slate-800 rounded-2xl text-center max-w-md mx-auto my-12">
        <p className="text-rose-400 font-bold">Business info not found</p>
        <button
          onClick={() => (window.location.href = "/free-listing/register")}
          className="mt-4 bg-indigo-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
        >
          Register Business Now
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* 🔹 Welcome & Verification Status Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-950 to-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome back, {business.name} 👋
            </h1>
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck size={13} /> Verified Merchant
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 font-medium">
            Your business is active and visible to 50,000+ daily buyers in Odisha.
          </p>
        </div>

        <button
          onClick={() => (window.location.href = "/business/basic-profile")}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs shadow-md flex items-center gap-1.5 shrink-0"
        >
          <Sparkles size={15} /> Edit Profile
        </button>
      </div>

      {/* 🔹 Analytics Metric Cards with Growth Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Leads Received"
          value="245+"
          growth="+18% this month"
          icon={Users}
          iconColor="text-emerald-400"
          bgColor="bg-emerald-500/10"
        />
        <MetricCard
          title="Profile Impressions"
          value="1.2K"
          growth="+24% this week"
          icon={Eye}
          iconColor="text-indigo-400"
          bgColor="bg-indigo-500/10"
        />
        <MetricCard
          title="Average Star Rating"
          value="4.8 ⭐"
          growth="120+ Reviews"
          icon={Star}
          iconColor="text-amber-400"
          bgColor="bg-amber-500/10"
        />
        <MetricCard
          title="Active Categories"
          value="12+"
          growth="Top Ranking"
          icon={Building2}
          iconColor="text-purple-400"
          bgColor="bg-purple-500/10"
        />
      </div>

      {/* 🔹 Business Details & Action Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info Box */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-base font-extrabold text-white mb-4 flex items-center gap-2">
            <Building2 size={18} className="text-amber-400" />
            <span>Registered Business Overview</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 block font-medium">Business Name</span>
              <span className="text-slate-100 font-bold text-sm mt-0.5 block">{business.name}</span>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 block font-medium">Contact Phone</span>
              <span className="text-slate-100 font-bold text-sm mt-0.5 block">{business.phone}</span>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 block font-medium">Primary Category</span>
              <span className="text-indigo-400 font-bold text-sm mt-0.5 block">
                {business.category?.name || "Services"}
              </span>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 block font-medium">Listing Status</span>
              <span className="text-emerald-400 font-bold text-sm mt-0.5 block capitalize">
                {business.status || "Approved"}
              </span>
            </div>
          </div>
        </div>

        {/* Growth Checklist */}
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-base font-extrabold text-white mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-emerald-400" />
            <span>Optimization Checklist</span>
          </h3>

          <ul className="space-y-3 text-xs">
            <li className="flex items-center gap-2 text-slate-300 font-medium">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>Verify Business Phone Number</span>
            </li>
            <li className="flex items-center gap-2 text-slate-300 font-medium">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>Upload Storefront HD Photos</span>
            </li>
            <li className="flex items-center gap-2 text-slate-300 font-medium">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>Add Operating Hours & Address</span>
            </li>
            <li className="flex items-center gap-2 text-slate-400 font-medium opacity-70">
              <Clock size={16} className="text-amber-400 shrink-0" />
              <span>Add Special Coupons & Discounts</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, growth, icon: Icon, iconColor, bgColor }) {
  return (
    <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl shadow-md flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-xs font-semibold">{title}</p>
        <p className="text-2xl font-black text-white mt-1">{value}</p>
        <span className="text-[11px] font-bold text-emerald-400 mt-1 inline-flex items-center gap-0.5">
          <ArrowUpRight size={13} /> {growth}
        </span>
      </div>

      <div className={`w-12 h-12 rounded-xl ${bgColor} ${iconColor} flex items-center justify-center shrink-0`}>
        <Icon size={22} />
      </div>
    </div>
  );
}
