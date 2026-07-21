"use client";

import { Star, ShieldCheck, Sparkles, Phone, MessageSquare, ArrowRight } from "lucide-react";

const sections = [
  {
    title: "Wedding Requisites",
    tagline: "Planning your big day made effortless",
    items: [
      {
        name: "Banquet Halls",
        rating: "4.8",
        reviews: "320+",
        img: "https://images.pexels.com/photos/17206170/pexels-photo-17206170/free-photo-of-interior-design-of-banquet-hall.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "Bridal Wear & Makeup",
        rating: "4.9",
        reviews: "450+",
        img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Caterers & Food",
        rating: "4.7",
        reviews: "280+",
        img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    title: "Beauty & Spa",
    tagline: "Rejuvenate yourself at top salons",
    items: [
      {
        name: "Beauty Parlours",
        rating: "4.6",
        reviews: "510+",
        img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Spa & Massages",
        rating: "4.9",
        reviews: "620+",
        img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Unisex Salons",
        rating: "4.7",
        reviews: "390+",
        img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    title: "Repairs & Services",
    tagline: "Certified technicians available 24/7",
    items: [
      {
        name: "AC Repair & Servicing",
        rating: "4.8",
        reviews: "890+",
        img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Car Repair & Care",
        rating: "4.7",
        reviews: "410+",
        img: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Bike Servicing",
        rating: "4.6",
        reviews: "310+",
        img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    title: "Daily Essentials",
    tagline: "Everything you need for everyday life",
    items: [
      {
        name: "Multiplex Movies",
        rating: "4.9",
        reviews: "1.2k+",
        img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Grocery Supermarts",
        rating: "4.8",
        reviews: "950+",
        img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Electricians",
        rating: "4.7",
        reviews: "730+",
        img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
];

export default function FeaturedServices() {
  return (
    <section className="max-w-7xl mx-auto mt-14 px-4 sm:px-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Handpicked Recommendations</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Featured Collections & Services
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{section.title}</h3>
                <p className="text-xs text-slate-400 font-medium">{section.tagline}</p>
              </div>
              <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {section.items.map((item, i) => (
                <div key={i} className="group text-left cursor-pointer">
                  {/* Image Card */}
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] border border-slate-100 shadow-2xs mb-2">
                    <img
                      src={item.img}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-1.5 left-1.5 bg-slate-900/80 backdrop-blur-md text-amber-400 px-1.5 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-amber-400" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  {/* Title & Review */}
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {item.reviews} reviews
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
