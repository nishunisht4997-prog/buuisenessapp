"use client";

import { Building2, Mail, Phone, MapPin, Heart, ShieldCheck, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                <span className="text-amber-500">Apna</span>Biz
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              ApnaBiz is India's leading local search directory connecting millions of local customers with verified businesses, service providers, and suppliers across 500+ cities.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-400 pt-2">
              <span className="inline-flex items-center gap-1 bg-slate-800 text-emerald-400 px-3 py-1 rounded-full font-semibold border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Verified Listings
              </span>
            </div>
          </div>

          {/* Column 1: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="/" className="hover:text-amber-400 transition">About ApnaBiz</a></li>
              <li><a href="/free-listing" className="hover:text-amber-400 transition">Free Business Listing</a></li>
              <li><a href="/business/dashboard" className="hover:text-amber-400 transition">Business Dashboard</a></li>
              <li><a href="/" className="hover:text-amber-400 transition">Investor Relations</a></li>
              <li><a href="/" className="hover:text-amber-400 transition">Media & News</a></li>
            </ul>
          </div>

          {/* Column 2: Top Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Top Categories</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="/category/restaurants" className="hover:text-amber-400 transition">Restaurants & Food</a></li>
              <li><a href="/category/hotels" className="hover:text-amber-400 transition">Hotels & Stays</a></li>
              <li><a href="/category/beauty-spa" className="hover:text-amber-400 transition">Beauty & Spa</a></li>
              <li><a href="/category/hospitals" className="hover:text-amber-400 transition">Hospitals & Clinics</a></li>
              <li><a href="/category/estate-agent" className="hover:text-amber-400 transition">Real Estate Agents</a></li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Stay Updated</h4>
            <p className="text-xs text-slate-400">
              Subscribe to get exclusive business insights and local offer alerts.
            </p>
            <div className="flex items-center gap-1 bg-slate-800 p-1.5 rounded-xl border border-slate-700">
              <input
                type="email"
                placeholder="Enter email address"
                className="bg-transparent text-xs text-white placeholder-slate-500 px-2 py-1 outline-none w-full"
              />
              <button className="bg-amber-500 hover:bg-amber-600 text-slate-950 p-1.5 rounded-lg transition font-bold">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ApnaBiz Technologies Pvt Ltd. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Indian Businesses
          </p>
        </div>
      </div>
    </footer>
  );
}
