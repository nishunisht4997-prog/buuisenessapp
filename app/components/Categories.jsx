"use client";

import { useRouter } from "next/navigation";
import { Utensils, Hotel, Sparkles, Sofa, Heart, GraduationCap, Key, Hospital, HardHat, Dog, Home, Building2, Stethoscope, Dumbbell, Wallet, PartyPopper, Car, Package, Truck, Star, ArrowRight } from "lucide-react";

export default function Categories() {
  const router = useRouter();

  const categories = [
    { name: "Restaurants", icon: Utensils, slug: "restaurants", count: "4.2k+", gradient: "from-amber-500 to-orange-500" },
    { name: "Hotels", icon: Hotel, slug: "hotels", count: "1.8k+", gradient: "from-blue-500 to-cyan-500" },
    { name: "Beauty Spa", icon: Sparkles, slug: "beauty-spa", count: "3.1k+", gradient: "from-pink-500 to-rose-500" },
    { name: "Home Decor", icon: Sofa, slug: "home-decor", count: "950+", gradient: "from-emerald-500 to-teal-500" },
    { name: "Wedding Planning", icon: Heart, slug: "wedding-planning", count: "1.4k+", gradient: "from-rose-500 to-purple-500" },
    { name: "Education", icon: GraduationCap, slug: "education", count: "2.3k+", gradient: "from-indigo-500 to-blue-600" },
    { name: "Rent & Hire", icon: Key, slug: "rent-hire", count: "820+", gradient: "from-violet-500 to-purple-600" },
    { name: "Hospitals", icon: Hospital, slug: "hospitals", count: "650+", gradient: "from-red-500 to-pink-600" },
    { name: "Contractors", icon: HardHat, slug: "contractors", count: "1.1k+", gradient: "from-amber-600 to-yellow-500" },
    { name: "Pet Shops", icon: Dog, slug: "pet-shops", count: "430+", gradient: "from-lime-500 to-emerald-600" },
    { name: "PG / Hostels", icon: Home, slug: "pg-hostels", count: "1.6k+", gradient: "from-cyan-500 to-blue-500" },
    { name: "Estate Agent", icon: Building2, slug: "estate-agent", count: "2.8k+", gradient: "from-slate-700 to-slate-900" },
    { name: "Dentists", icon: Stethoscope, slug: "dentists", count: "540+", gradient: "from-teal-500 to-cyan-600" },
    { name: "Gym & Fitness", icon: Dumbbell, slug: "gym", count: "890+", gradient: "from-orange-500 to-red-500" },
    { name: "Loans & Finance", icon: Wallet, slug: "loans", count: "720+", gradient: "from-emerald-600 to-green-600" },
    { name: "Event Organisers", icon: PartyPopper, slug: "event-organisers", count: "1.3k+", gradient: "from-fuchsia-500 to-pink-500" },
    { name: "Driving Schools", icon: Car, slug: "driving-schools", count: "380+", gradient: "from-blue-600 to-indigo-700" },
    { name: "Packers & Movers", icon: Package, slug: "packers-movers", count: "1.9k+", gradient: "from-amber-500 to-orange-600" },
    { name: "Courier Service", icon: Truck, slug: "courier-service", count: "850+", gradient: "from-indigo-600 to-violet-700" },
    { name: "Popular Hubs", icon: Star, slug: "popular-categories", count: "5.0k+", gradient: "from-purple-600 to-indigo-600" },
  ];

  return (
    <section className="max-w-7xl mx-auto mt-12 px-4 sm:px-6">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-8 border-b border-slate-200/80 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Browse By Sector</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Explore Popular Categories
          </h2>
        </div>
        <button 
          onClick={() => router.push("/category/popular-categories")}
          className="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition group"
        >
          <span>View All Categories</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <div
              key={cat.slug}
              onClick={() => router.push(`/category/${cat.slug}`)}
              className="group cursor-pointer bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1"
            >
              {/* Icon Container */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${cat.gradient} text-white flex items-center justify-center shadow-md shadow-slate-200 group-hover:scale-110 transition-transform duration-300 mb-3`}>
                <IconComponent className="w-7 h-7 stroke-[2.2]" />
              </div>

              {/* Label & Stats */}
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                {cat.name}
              </h3>
              <span className="mt-1 text-[11px] font-medium text-slate-400">
                {cat.count} listings
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
