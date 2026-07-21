"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Sparkles,
  Send,
  Heart,
  Globe,
  ArrowRight
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* TOP NEWSLETTER & BRAND BANNER */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 mb-16 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-3">
              <Sparkles size={13} /> Stay Updated
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Get Exclusive Local Deals & Business Updates
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1.5 font-medium">
              Join 100,000+ subscribers getting weekly verified business recommendations and discounts in Odisha.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed successfully to ApnaBiz updates!");
            }}
            className="w-full lg:w-auto flex items-center bg-slate-950 border border-slate-800 rounded-2xl p-1.5 focus-within:border-indigo-500 transition-all max-w-md"
          >
            <Mail size={18} className="text-slate-500 ml-3 mr-2 shrink-0" />
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none w-full font-medium"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 shrink-0 transition-all"
            >
              <span>Subscribe</span>
              <Send size={14} />
            </button>
          </form>
        </div>

        {/* MAIN FOOTER LINKS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md">
                A
              </div>
              <h2 className="text-2xl font-black tracking-tight leading-none text-white">
                Apna<span className="text-amber-400">Biz</span>
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium max-w-sm">
              India's leading local search and business discovery portal. Connecting over 4.9 Crore businesses with verified buyers, instant quotes, and local services across Odisha and India.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl w-fit">
              <ShieldCheck size={16} />
              <span>100% Verified Business Directory</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Home Page</Link></li>
              <li><Link href="/free-listing" className="hover:text-amber-400 transition-colors">Free Business Listing</Link></li>
              <li><Link href="/business/dashboard" className="hover:text-amber-400 transition-colors">Merchant Dashboard</Link></li>
              <li><Link href="/admin-login" className="hover:text-amber-400 transition-colors">Admin Portal Sign In</Link></li>
              <li><Link href="/category/popular-categories" className="hover:text-amber-400 transition-colors">All Business Categories</Link></li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Top Categories</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              <li><Link href="/category/restaurants" className="hover:text-amber-400 transition-colors">Restaurants & Cafes</Link></li>
              <li><Link href="/category/hotels" className="hover:text-amber-400 transition-colors">Hotels & Resorts</Link></li>
              <li><Link href="/category/beauty-spa" className="hover:text-amber-400 transition-colors">Beauty Parlours & Spas</Link></li>
              <li><Link href="/category/wedding-planning" className="hover:text-amber-400 transition-colors">Wedding Banquet Halls</Link></li>
              <li><Link href="/category/packers-movers" className="hover:text-amber-400 transition-colors">Packers & Movers</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Contact & Support</h4>
            <ul className="space-y-3 text-xs font-medium text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <span>Patia InfoTech Zone, Bhubaneswar, Odisha 751024</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-amber-400 shrink-0" />
                <span>+91 98765 43210 / 1800-123-APNA</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-amber-400 shrink-0" />
                <span>support@apnabiz.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT & LEGAL */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <p className="flex items-center gap-1 text-center sm:text-left">
            © {new Date().getFullYear()} ApnaBiz Technologies Inc. Built with <Heart size={13} className="text-rose-500 fill-rose-500 inline" /> for Local Businesses.
          </p>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer transition">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer transition">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
