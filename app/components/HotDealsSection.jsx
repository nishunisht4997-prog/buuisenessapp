"use client";

import { useEffect, useState } from "react";
import { Flame, Clock, Tag, Sparkles, MessageCircle, QrCode, ShieldCheck, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HotDealsSection() {
  const router = useRouter();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDealModal, setSelectedDealModal] = useState(null);

  useEffect(() => {
    fetch("/api/deals/list")
      .then((r) => r.json())
      .then((d) => setDeals(d.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleClaimWhatsApp = (deal) => {
    const text = `Hi ${deal.merchantName}! I want to claim the coupon code *${deal.couponCode}* for *${deal.title}* (Deal Price: ${deal.dealPrice}) via ApnaBiz!`;
    const url = `https://wa.me/${deal.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 mb-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 border-b border-slate-800/80 pb-4">
        <div>
          <span className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
            <Flame size={14} className="text-amber-400 fill-amber-400 animate-pulse" /> Live Flash Discounts
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Hot Deals & Flash Coupons</span>
            <Sparkles size={22} className="text-amber-400" />
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
            Exclusive 24-hour flash offers & digital coupons from top local merchants
          </p>
        </div>

        <button
          onClick={() => router.push("/hot-deals")}
          className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-black text-xs px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-1.5 transition-colors shrink-0"
        >
          <span>View All Deals</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-slate-400 font-medium animate-pulse">
            Loading live flash deals...
          </div>
        ) : (
          deals.slice(0, 3).map((deal) => (
            <div
              key={deal.id}
              className="glass-card rounded-3xl p-5 border border-slate-800 shadow-xl flex flex-col justify-between group hover:border-amber-500/50 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Image & Badge */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 border border-slate-800">
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
                <h3 className="text-sm sm:text-base font-black text-white group-hover:text-amber-400 transition-colors line-clamp-2">
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
                    <span className="text-base font-black text-emerald-400">
                      {deal.dealPrice}
                    </span>
                  </div>

                  <span className="font-mono text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-lg font-black tracking-wider">
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
        )}
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

            {/* QR Placeholder / Coupon Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
              <span className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">Your Digital Coupon Code:</span>
              <span className="text-xl font-mono font-black text-amber-400 tracking-widest block bg-slate-900 border border-amber-500/40 py-2 rounded-xl">
                {selectedDealModal.couponCode}
              </span>
              <span className="text-[10px] text-emerald-400 font-extrabold block">
                Show this code or QR at the store counter to redeem!
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
    </div>
  );
}
