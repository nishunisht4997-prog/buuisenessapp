"use client";

import { Star, ShieldCheck, Sparkles, PhoneCall, MessageCircle } from "lucide-react";

const SECTIONS = [
  {
    title: "Wedding & Celebrations",
    badge: "Most Booked",
    items: [
      {
        name: "Banquet Halls",
        rating: "4.9",
        reviews: "240+",
        phone: "+919876543210",
        img: "https://images.pexels.com/photos/17206170/pexels-photo-17206170/free-photo-of-interior-design-of-banquet-hall.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        name: "Bridal Makeup",
        rating: "4.8",
        reviews: "180+",
        phone: "+919876543211",
        img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Catering Services",
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
    items: [
      {
        name: "Beauty Parlours",
        rating: "4.8",
        reviews: "450+",
        phone: "+919876543213",
        img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Luxury Spa & Massage",
        rating: "4.9",
        reviews: "290+",
        phone: "+919876543214",
        img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Unisex Salons",
        rating: "4.6",
        reviews: "520+",
        phone: "+919876543215",
        img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    title: "Home Repairs & Care",
    badge: "Instant Service",
    items: [
      {
        name: "AC Repair & Servicing",
        rating: "4.9",
        reviews: "890+",
        phone: "+919876543216",
        img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Car Detailing & Wash",
        rating: "4.7",
        reviews: "340+",
        phone: "+919876543217",
        img: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Plumbing & Electrician",
        rating: "4.8",
        reviews: "610+",
        phone: "+919876543218",
        img: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
];

export default function FeaturedServices() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 mb-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Handpicked Featured Collections</span>
            <Sparkles size={20} className="text-amber-400" />
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
            Top rated service collections verified by customer reviews
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {SECTIONS.map((section, index) => (
          <div
            key={index}
            className="glass-card rounded-3xl p-5 border border-slate-800 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-white">{section.title}</h3>
              <span className="text-[10px] font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full uppercase">
                {section.badge}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {section.items.map((item, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative rounded-2xl overflow-hidden aspect-video sm:h-28 shadow-md border border-slate-800">
                    <img
                      src={item.img}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute bottom-1.5 left-1.5 bg-slate-950/80 backdrop-blur-md text-amber-400 font-black text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <Star size={10} className="fill-amber-400" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  <p className="mt-2 text-xs font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {item.reviews} reviews
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
