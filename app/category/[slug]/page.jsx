"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Star, MapPin, Phone, MessageSquare, ShieldCheck, Sparkles, Filter, CheckCircle2, ChevronRight, Calendar, Building, Search } from "lucide-react";

export default function CategoryPage() {
  const { slug } = useParams();

  let content = <DefaultCategory slug={slug} />;
  if (slug === "restaurants") content = <RestaurantsCategory />;
  if (slug === "hotels") content = <HotelsCategory />;
  if (slug === "beauty-spa") content = <BeautyCategory />;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1">{content}</main>
      <Footer />
    </div>
  );
}

/* =========================
   🍽️ RESTAURANTS CATEGORY
========================= */
function RestaurantsCategory() {
  return (
    <div>
      {/* BANNER */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
          alt="Restaurants"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-12">
          <div className="max-w-7xl mx-auto w-full">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-widest mb-3">
              🍽️ Dining Collections
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Best Restaurants & Cafes
            </h1>
            <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-xl">
              Discover top-rated dining spots, family restaurants, multi-cuisine cafes, and food delivery joints near you.
            </p>
          </div>
        </div>
      </div>

      {/* COLLECTIONS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CollectionCard
            title="Indian Flavours"
            icon="🍛"
            items={["Gujarati Thali", "South Indian Tiffin", "Pure Veg Dining", "North Indian Gravies"]}
          />
          <CollectionCard
            title="Global Cuisines"
            icon="🍕"
            items={["Italian & Pizza", "Middle Eastern Shawarma", "Greek Salads", "Chinese & Asian Bistro"]}
          />
          <CollectionCard
            title="Nightlife & Pubs"
            icon="🍸"
            items={["Microbreweries", "Gastropubs", "Night Clubs", "Rooftop Lounges"]}
          />
          <CollectionCard
            title="Quick Bites & Cafes"
            icon="☕"
            items={["Artisanal Bakeries", "Coffee Roasters", "Fast Food Hubs", "Burger & Sandwich Bars"]}
          />
          <CollectionCard
            title="Sweet Tooth"
            icon="🍰"
            items={["Custom Cake Shops", "Ice Cream Parlours", "Traditional Mithai", "Waffle Outlets"]}
          />
          <CollectionCard
            title="Trending Foodie Spots"
            icon="🔥"
            items={["Wood-Fired Pizza", "Tandoori Specialties", "Street Food Corners", "Seafood Restos"]}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================
   🏨 HOTELS CATEGORY
========================= */
function HotelsCategory() {
  const [filter, setFilter] = useState("All");
  const filters = ["All Deals", "Top Rated 4.5+", "Budget Stays", "Luxury Hotels", "Same Day Booking"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* HEADER */}
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Hotel Finder</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
          Top Hotels & Resorts in City
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Compare room prices, check verified ratings, and book rooms with zero hidden convenience fees.
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filter === f
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* LISTINGS & LEAD FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hotel Cards List */}
        <div className="lg:col-span-2 space-y-6">
          <HotelCard
            name="S Convention & Luxury Hotel"
            price="₹1,561"
            rating="4.6"
            reviews="34 Ratings"
            location="Ghangapatana Kantabad, Bhubaneswar"
            img="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
          />
          <HotelCard
            name="Hotel S J Pride & Executive Suites"
            price="₹1,960"
            rating="4.8"
            reviews="1,656 Ratings"
            location="BDA Colony Patrapada, Bhubaneswar"
            img="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80"
          />
          <HotelCard
            name="Grand Tulip Resort & Spa"
            price="₹3,250"
            rating="4.9"
            reviews="840 Ratings"
            location="Infocity Avenue, Jayadev Vihar, Bhubaneswar"
            img="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80"
          />
        </div>

        {/* Sticky Lead Request Box */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-md h-fit sticky top-24">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-base text-slate-900">
              Get Best Hotel Deals
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Send custom inquiry and receive direct discounted quotes on your mobile in under 2 minutes.
          </p>

          <div className="space-y-3">
            <div>
              <input
                className="w-full bg-slate-50 border border-slate-200 text-xs font-semibold p-3 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition"
                placeholder="Your Name"
              />
            </div>
            <div>
              <input
                className="w-full bg-slate-50 border border-slate-200 text-xs font-semibold p-3 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition"
                placeholder="Mobile Number"
              />
            </div>
            <div>
              <input
                type="date"
                className="w-full bg-slate-50 border border-slate-200 text-xs font-semibold p-3 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition text-slate-600"
              />
            </div>

            <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs py-3 rounded-xl shadow-md shadow-indigo-600/20 transition flex items-center justify-center gap-2">
              <span>Get Free Quotes Now</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   💄 BEAUTY & SPA CATEGORY
========================= */
function BeautyCategory() {
  return (
    <div>
      <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80"
          alt="Beauty & Spa"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-12">
          <div className="max-w-7xl mx-auto w-full">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500 text-white font-bold text-xs uppercase tracking-widest mb-3">
              💅 Beauty & Wellness Hub
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Top Salons & Luxury Spas
            </h1>
            <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-xl">
              Book appointments at premier beauty parlours, Ayurvedic wellness spas, and professional makeup studios.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CollectionCard
            title="Popular Salon Services"
            icon="💇‍♀️"
            items={["Hair Cuts & Styling", "Facials & Cleanup", "Manicure & Pedicure", "Hair Keratin & Coloring"]}
          />
          <CollectionCard
            title="Top Spas & Wellness"
            icon="💆‍♂️"
            items={["Luxury Unisex Spas", "Ayurvedic Massages", "Deep Tissue Therapy", "Thai Spa Retreats"]}
          />
          <CollectionCard
            title="Specialized Bridal"
            icon="👰"
            items={["Bridal HD Makeup", "Pre-Bridal Packages", "Party Styling", "Saree Draping"]}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================
   DEFAULT FALLBACK CATEGORY
========================= */
function DefaultCategory({ slug }) {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-4">
        <Building className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 capitalize">
        {slug ? slug.replace("-", " ") : "Category"} Directory
      </h2>
      <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">
        We are fetching verified listings for this section. Check back soon or browse other active categories.
      </p>
    </div>
  );
}

/* =========================
   REUSABLE COMPONENTS
========================= */
function CollectionCard({ title, icon, items }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
      </div>
      <ul className="space-y-2 text-xs font-medium text-slate-600">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HotelCard({ name, price, rating, reviews, location, img }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row gap-5">
      <div className="w-full sm:w-52 h-40 rounded-xl overflow-hidden shrink-0 relative">
        <img src={img} alt={name} className="w-full h-full object-cover" />
        <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5">
          <ShieldCheck className="w-3 h-3" /> Verified
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 hover:text-indigo-600 transition">
              {name}
            </h2>
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md text-xs font-bold shrink-0">
              <Star className="w-3.5 h-3.5 fill-emerald-600" />
              <span>{rating}</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{location}</span>
          </p>

          <p className="text-emerald-700 font-extrabold text-lg mt-3">
            {price} <span className="text-xs text-slate-400 font-normal">/ night</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-slate-100">
          <button className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition">
            <Phone className="w-3.5 h-3.5" /> Call
          </button>
          <button className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition">
            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
          </button>
          <button className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition ml-auto">
            Get Best Deal
          </button>
        </div>
      </div>
    </div>
  );
}
