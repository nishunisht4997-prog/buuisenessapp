"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RightButtons from "../components/RightButtons";
import { Flame, Clock, Tag, Sparkles, MessageCircle, QrCode, ShieldCheck, Search, CheckCircle2 } from "lucide-react";

const CATEGORY_TABS = [
  { id: "all", label: "🔥 All Hot Deals" },
  { id: "restaurants", label: "🍽️ Restaurants" },
  { id: "beauty-spa", label: "💆 Beauty & Spa" },
  { id: "home-services", label: "🔧 Home Repairs" },
  { id: "hotels", label: "🏨 Hotels & Stays" },
  { id: "gym", label: "🏋️ Gym & Fitness" },
];

export default function HotDealsPage() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDealModal, setSelectedDealModal] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/deals/list?category=${activeCategory}`)
      .then((r) => r.json())
      .then((d) => setDeals(d.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const handleClaimWhatsApp = (deal) => {
    const text = `Hi ${deal.merchantName}! I want to claim the coupon code *${deal.couponCode}* for *${deal.title}* (Deal Price: ${deal.dealPrice}) via ApnaBiz!`;
    const url = `https://wa.me/${deal.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const filteredDeals = deals.filter((d) =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        {/* Header Hero Banner */}
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 border border-slate-800 p-6 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-3 shadow-lg">
              <Flame size={15} className="fill-slate-950 animate-bounce" /> Live Flash Discounts Marketplace
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Exclusive Flash Offers & Digital Coupons
            </h1>
            <p className="text-slate-300 text-xs sm:text-base mt-2 font-medium">
              Save big on local restaurants, spas, AC servicing, hotels & fitness centers in Odisha. Claim digital QR coupons instantly via WhatsApp!
            </p>
          </div>
        </div>

        {/* Category Filters & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`text-xs font-black px-4 py-2.5 rounded-xl border transition-all whitespace-nowrap shrink-0 ${
                  activeCategory === tab.id
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg scale-105"
                    : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 w-full md:w-80 focus-within:border-amber-500 transition-all shrink-0">
            <Search size={16} className="text-slate-500 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search offer or merchant name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-white placeholder:text-slate-500 outline-none w-full font-medium"
            />
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-20 text-center text-slate-400 font-medium animate-pulse">
              Loading hot deals & coupons...
            </div>
          ) : filteredDeals.length > 0 ? (
            filteredDeals.map((deal) => (
              <div
                key={deal.id}
                className="glass-card rounded-3xl p-5 border border-slate-800 shadow-2xl flex flex-col justify-between group hover:border-amber-500/50 transition-all duration-300 relative overflow-hidden"
              >
                {/* Top Image & Badges */}
                <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4 border border-slate-800">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                  {/* Discount Badge */}
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs px-3 py-1 rounded-xl shadow-lg uppercase tracking-wider">
                    {deal.discountBadge}
                  </span>

                  {/* Expiry Badge */}
                  <span className="absolute top-3 right-3 bg-slate-950/90 text-amber-400 border border-amber-500/40 text-[10px] font-black px-2.5 py-1 rounded-xl flex items-center gap-1">
                    <Clock size={11} className="animate-spin text-amber-400" />
                    <span>{deal.expiresInHours}h Left</span>
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
                    <span className="text-slate-300 font-medium flex items-center gap-1">
                      <ShieldCheck size={13} className="text-emerald-400" /> {deal.merchantName}
                    </span>
                  </div>
                </div>

                {/* Deal Content */}
                <div className="space-y-2 mb-4">
                  <h3 className="text-base font-black text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                    {deal.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Tag size={12} className="text-amber-400 shrink-0" />
                    <span>{deal.area}</span>
                  </p>

                  {/* Pricing & Coupon Code */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <div>
                      <span className="text-xs text-slate-400 line-through mr-2 font-medium">
                        {deal.originalPrice}
                      </span>
                      <span className="text-lg font-black text-emerald-400">
                        {deal.dealPrice}
                      </span>
                    </div>

                    <span className="font-mono text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-lg font-black tracking-wider">
                      {deal.couponCode}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedDealModal(deal)}
                    className="w-1/2 bg-slate-900 hover:bg-slate-800 text-slate-200 font-extrabold text-xs py-2.5 rounded-xl border border-slate-800 flex items-center justify-center gap-1 transition-colors"
                  >
                    <QrCode size={14} className="text-amber-400" />
                    <span>QR Coupon</span>
                  </button>

                  <button
                    onClick={() => handleClaimWhatsApp(deal)}
                    className="w-1/2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs py-2.5 rounded-xl flex items-center justify-center gap-1 shadow-md shadow-orange-500/20 transition-all"
                  >
                    <MessageCircle size={14} />
                    <span>Claim Coupon</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-slate-400 font-medium">
              No flash deals found in this category.
            </div>
          )}
        </div>
      </div>

      {/* QR Coupon Modal */}
      {selectedDealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl relative">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto font-black">
              <QrCode size={24} />
            </div>

            <div>
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                {selectedDealModal.discountBadge} DIGITAL COUPON
              </span>
              <h3 className="text-base font-black text-white mt-2">{selectedDealModal.title}</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">{selectedDealModal.merchantName}</p>
            </div>

            {/* QR Code Placeholder Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
              <span className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">Your Digital Coupon Code:</span>
              <span className="text-xl font-mono font-black text-amber-400 tracking-widest block bg-slate-900 border border-amber-500/40 py-2 rounded-xl">
                {selectedDealModal.couponCode}
              </span>
              <span className="text-[10px] text-emerald-400 font-extrabold block">
                Show this code or QR at store counter to redeem!
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedDealModal(null)}
                className="w-1/2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs py-2.5 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleClaimWhatsApp(selectedDealModal);
                  setSelectedDealModal(null);
                }}
                className="w-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs py-2.5 rounded-xl shadow-md"
              >
                WhatsApp Claim
              </button>
            </div>
          </div>
        </div>
      )}

      <RightButtons />
      <Footer />
    </main>
  );
}
