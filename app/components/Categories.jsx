"use client";

import { useRouter } from "next/navigation";
import {
  Utensils,
  Hotel,
  Sparkles,
  Sofa,
  Heart,
  GraduationCap,
  Key,
  Hospital,
  HardHat,
  Dog,
  Home,
  Building,
  Smile,
  Dumbbell,
  Landmark,
  PartyPopper,
  Car,
  Package,
  Truck,
  Grid
} from "lucide-react";

const CATEGORIES = [
  { name: "Restaurants", icon: Utensils, slug: "restaurants", count: "14.2k+", color: "from-amber-500 to-orange-600" },
  { name: "Hotels", icon: Hotel, slug: "hotels", count: "8.5k+", color: "from-blue-600 to-indigo-700" },
  { name: "Beauty Spa", icon: Sparkles, slug: "beauty-spa", count: "11.1k+", color: "from-pink-500 to-rose-600" },
  { name: "Home Decor", icon: Sofa, slug: "home-decor", count: "6.3k+", color: "from-emerald-500 to-teal-600" },
  { name: "Wedding Planning", icon: Heart, slug: "wedding-planning", count: "9.8k+", color: "from-purple-500 to-indigo-600" },
  { name: "Education", icon: GraduationCap, slug: "education", count: "12.7k+", color: "from-cyan-500 to-blue-600" },
  { name: "Rent & Hire", icon: Key, slug: "rent-hire", count: "5.4k+", color: "from-amber-500 to-yellow-600" },
  { name: "Hospitals", icon: Hospital, slug: "hospitals", count: "4.9k+", color: "from-red-500 to-rose-600" },
  { name: "Contractors", icon: HardHat, slug: "contractors", count: "7.6k+", color: "from-slate-600 to-slate-800" },
  { name: "Pet Shops", icon: Dog, slug: "pet-shops", count: "3.2k+", color: "from-amber-600 to-orange-700" },
  { name: "PG / Hostels", icon: Home, slug: "pg-hostels", count: "6.8k+", color: "from-teal-500 to-emerald-600" },
  { name: "Estate Agent", icon: Building, slug: "estate-agent", count: "8.1k+", color: "from-indigo-600 to-blue-700" },
  { name: "Dentists", icon: Smile, slug: "dentists", count: "2.9k+", color: "from-sky-500 to-indigo-500" },
  { name: "Gym & Fitness", icon: Dumbbell, slug: "gym", count: "5.1k+", color: "from-violet-600 to-purple-800" },
  { name: "Loans & Finance", icon: Landmark, slug: "loans", count: "4.3k+", color: "from-emerald-600 to-green-700" },
  { name: "Event Organisers", icon: PartyPopper, slug: "event-organisers", count: "7.2k+", color: "from-fuchsia-500 to-pink-600" },
  { name: "Driving Schools", icon: Car, slug: "driving-schools", count: "3.8k+", color: "from-blue-600 to-cyan-600" },
  { name: "Packers & Movers", icon: Package, slug: "packers-movers", count: "6.1k+", color: "from-orange-600 to-red-600" },
  { name: "Courier Service", icon: Truck, slug: "courier-service", count: "4.7k+", color: "from-slate-700 to-indigo-900" },
  { name: "All Categories", icon: Grid, slug: "popular-categories", count: "500+ More", color: "from-amber-500 to-purple-600" },
];

export default function Categories() {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Explore Popular Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
            Discover verified local services & business listings near you
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.slug}
              onClick={() => router.push(`/category/${cat.slug}`)}
              className="glass-card glass-card-hover rounded-3xl p-4 cursor-pointer flex flex-col items-center text-center group border border-slate-800"
            >
              {/* Vibrant 3D Icon Box */}
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr ${cat.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white/10`}>
                <Icon size={26} />
              </div>

              {/* Label */}
              <p className="mt-3 text-xs sm:text-sm font-extrabold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                {cat.name}
              </p>

              {/* Count Badge */}
              <span className="mt-1 text-[10px] font-bold text-slate-400 bg-slate-950 px-2.5 py-0.5 rounded-full border border-slate-800">
                {cat.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
