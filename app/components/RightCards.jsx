"use client";

import { Briefcase, Wrench, Building2, Stethoscope, ArrowUpRight } from "lucide-react";

const SPOTLIGHT_CARDS = [
  {
    title: "B2B Market",
    subtitle: "Quick Wholesale Quotes",
    icon: Briefcase,
    color: "from-blue-600 to-indigo-700",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Repairs",
    subtitle: "Get Nearest Technician",
    icon: Wrench,
    color: "from-amber-500 to-orange-600",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Real Estate",
    subtitle: "Top Agents & Properties",
    icon: Building2,
    color: "from-emerald-500 to-teal-700",
    image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Doctors",
    subtitle: "Book Appointments",
    icon: Stethoscope,
    color: "from-purple-600 to-pink-700",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80",
  },
];

export default function RightCards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 h-[260px] sm:h-[320px] lg:h-[360px]">
      {SPOTLIGHT_CARDS.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={i}
            className="group relative rounded-3xl overflow-hidden shadow-xl card-tilt-hover cursor-pointer border border-slate-800 flex flex-col justify-end"
          >
            {/* Image with Scale */}
            <img
              src={card.image}
              alt={card.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            {/* Dark Mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

            {/* Top Icon Badge */}
            <div className="absolute top-3 left-3 z-10">
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-lg border border-white/10`}>
                <Icon size={16} />
              </div>
            </div>

            {/* Top Right Action Arrow */}
            <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-7 h-7 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-400 flex items-center justify-center border border-slate-700">
                <ArrowUpRight size={16} />
              </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 p-3 sm:p-4">
              <h3 className="text-white font-extrabold text-xs sm:text-sm lg:text-base leading-snug group-hover:text-amber-400 transition-colors">
                {card.title}
              </h3>
              <p className="text-slate-400 text-[11px] font-medium mt-0.5 line-clamp-1">
                {card.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
