"use client";

import { useState } from "react";
import { Star, ShieldCheck, Sparkles, Phone, MessageCircle, ArrowRight } from "lucide-react";
import QuoteRequestModal from "./QuoteRequestModal";

const SECTIONS = [
  {
    title: "Wedding & Celebrations",
    badge: "Most Booked",
    description: "Premium venues, catering & bridal makeup specialists",
    items: [
      {
        id: "feat-1",
        name: "Royal Palace Banquet",
        category: "Banquet Halls",
        rating: "4.9",
        reviews: "240+",
        phone: "+919876543210",
        img: "https://images.pexels.com/photos/17206170/pexels-photo-17206170/free-photo-of-interior-design-of-banquet-hall.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        id: "feat-2",
        name: "Glamour Bridal Studio",
        category: "Bridal Makeup",
        rating: "4.8",
        reviews: "180+",
        phone: "+919876543211",
        img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "feat-3",
        name: "Grand Feast Caterers",
        category: "Catering Services",
        rating: "4.7",
        reviews: "310+",
        phone: "+919876543212",
        img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    title: "Beauty & Wellness",
    badge: "Trending",
    description: "Top luxury spas, unisex salons & wellness centers",
    items: [
      {
        id: "feat-4",
        name: "Lotus Spa & Massage",
        category: "Luxury Spa",
        rating: "4.9",
        reviews: "290+",
        phone: "+919876543214",
        img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "feat-5",
        name: "Urban Cut Salon",
        category: "Unisex Salon",
        rating: "4.8",
        reviews: "450+",
        phone: "+919876543213",
        img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "feat-6",
        name: "Enrich Hair Studio",
        category: "Hair Styling",
        rating: "4.7",
        reviews: "520+",
        phone: "+919876543215",
        img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    title: "Home Repairs & Care",
    badge: "Instant Service",
    description: "Verified AC repair, car wash & electrical technicians",
    items: [
      {
        id: "feat-7",
        name: "CoolCare AC Experts",
        category: "AC Repair",
        rating: "4.9",
        reviews: "890+",
        phone: "+919876543216",
        img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "feat-8",
        name: "AutoShine Car Wash",
        category: "Car Detailing",
        rating: "4.8",
        reviews: "340+",
        phone: "+919876543217",
        img: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "feat-9",
        name: "ElectroFix Solutions",
        category: "Electrician",
        rating: "4.7",
        reviews: "610+",
        phone: "+919876543218",
        img: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
];

export default function FeaturedServices() {
  const [activeModalItem, setActiveModalItem] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 mb-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8 border-b border-slate-800/80 pb-4">
        <div>
          <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
            <Sparkles size={13} /> Verified Excellence
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Handpicked Featured Collections</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
            Top rated service collections verified by verified customer ratings in Odisha
          </p>
        </div>
      </div>

      {/* 3 Major Category Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SECTIONS.map((section, index) => (
          <div
            key={index}
            className="glass-card rounded-3xl p-5 border border-slate-800 shadow-xl flex flex-col justify-between"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
                <div>
                  <h3 className="text-lg font-black text-white">{section.title}</h3>
                  <p className="text-[11px] text-slate-400 font-medium">{section.description}</p>
                </div>
                <span className="text-[10px] font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0">
                  {section.badge}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3.5 p-2 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-amber-500/40 hover:bg-slate-900 transition-all duration-200 group cursor-pointer"
                  >
                    {/* Item Image */}
                    <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden shrink-0 border border-slate-800">
                      <img
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-1 left-1 bg-slate-950/90 text-amber-400 font-black text-[9px] px-1.5 py-0.5 rounded flex items-center gap-0.5 border border-amber-500/30">
                        <Star size={9} className="fill-amber-400" />
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-400 transition-colors truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-indigo-400 font-bold mt-0.5 truncate">
                        {item.category}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5 flex items-center gap-1">
                        <ShieldCheck size={11} className="text-emerald-400 shrink-0" />
                        <span>{item.reviews} Verified Reviews</span>
                      </p>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 mt-2">
                        <a
                          href={`tel:${item.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                        >
                          <Phone size={10} />
                          <span>Call</span>
                        </a>

                        <button
                          onClick={() => setActiveModalItem(item)}
                          className="bg-amber-500/20 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/30 text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                        >
                          <MessageCircle size={10} />
                          <span>Quote</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quote Modal Popup */}
      {activeModalItem && (
        <QuoteRequestModal
          isOpen={!!activeModalItem}
          onClose={() => setActiveModalItem(null)}
          businessId={activeModalItem.id}
          businessName={activeModalItem.name}
          vendorPhone={activeModalItem.phone}
        />
      )}
    </div>
  );
}
