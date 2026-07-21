"use client";

import { Star, ShieldCheck, Quote, TrendingUp, Sparkles, UserCheck } from "lucide-react";

const REVIEWS = [
  {
    name: "Saurav Patnaik",
    role: "Local Customer (Bhubaneswar)",
    comment: "Found the best banquet hall for my sister's wedding in 5 minutes! Direct WhatsApp quote service is super fast.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    tag: "Verified Buyer",
  },
  {
    name: "Ramesh Chandra Mohanty",
    role: "Owner, S Convention Suites",
    comment: "ApnaBiz Merchant Dashboard brought us 245+ verified customer inquiries last month alone. Growth grew by +18%!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    tag: "Merchant Partner",
  },
  {
    name: "Priyanka Rout",
    role: "Local Customer (Cuttack)",
    comment: "The Blue Tick KYC verification gives complete peace of mind. All electrician and AC technician quotes were 100% genuine.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    tag: "Verified Buyer",
  },
];

export default function Testimonials() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 my-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1 mb-2">
            <Sparkles size={13} /> Trust & Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Loved by 100,000+ Customers & Local Merchants
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((rev, index) => (
          <div
            key={index}
            className="glass-card rounded-3xl p-6 border border-slate-800 flex flex-col justify-between relative shadow-xl hover:border-slate-700 transition-colors"
          >
            <Quote size={32} className="text-slate-800 absolute top-4 right-4" />

            <div className="relative z-10">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={15} className="fill-amber-400" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-5 mt-4 border-t border-slate-800/80 z-10">
              <img
                src={rev.avatar}
                alt={rev.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-700"
              />
              <div>
                <h4 className="text-xs font-extrabold text-white flex items-center gap-1">
                  <span>{rev.name}</span>
                  <ShieldCheck size={13} className="text-emerald-400" />
                </h4>
                <p className="text-[11px] text-slate-400 font-medium">{rev.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
