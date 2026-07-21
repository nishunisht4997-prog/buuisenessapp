"use client";
import { ArrowUpRight, ShieldCheck, Wrench, Building, Stethoscope, Briefcase } from "lucide-react";

const cards = [
  {
    title: "B2B Quotes",
    subtitle: "Bulk Manufacturers & Wholesale",
    icon: Briefcase,
    color: "from-amber-500 to-orange-600",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80",
    badge: "Fast Quotes",
  },
  {
    title: "Repairs & Services",
    subtitle: "Electricians, AC & Plumbers",
    icon: Wrench,
    color: "from-blue-600 to-indigo-700",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
    badge: "Near You",
  },
  {
    title: "Real Estate",
    subtitle: "Top Brokers & Commercial Plots",
    icon: Building,
    color: "from-emerald-600 to-teal-700",
    image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=600&q=80",
    badge: "Verified",
  },
  {
    title: "Doctors & Health",
    subtitle: "Book Appointments & Clinics",
    icon: Stethoscope,
    color: "from-rose-600 to-pink-700",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80",
    badge: "Book Instant",
  },
];

export default function RightCards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 h-[340px] sm:h-[380px]">
      {cards.map((card, i) => {
        const IconComponent = card.icon;
        return (
          <div
            key={i}
            className="group relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Background Image */}
            <img
              src={card.image}
              alt={card.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-3.5 flex flex-col justify-between" />

            {/* Top Badge & Arrow */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                {card.badge}
              </span>
              <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Bottom Info */}
            <div className="relative z-10">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                <IconComponent className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                {card.title}
              </h3>
              <p className="text-[11px] text-slate-300 font-medium line-clamp-1 leading-tight">
                {card.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
