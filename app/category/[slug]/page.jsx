"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  PhoneCall,
  MessageCircle,
  Star,
  MapPin,
  ShieldCheck,
  Filter,
  CheckCircle2,
  Sparkles,
  Map as MapIcon,
  Search,
  Send,
  Building2,
  ArrowRight
} from "lucide-react";
import InteractiveMap from "../../components/InteractiveMap";
import QuoteRequestModal from "../../components/QuoteRequestModal";

// Category Data Dictionary for all 20 categories
const CATEGORY_META = {
  restaurants: {
    name: "Restaurants & Fine Dining",
    tagline: "Explore top rated restaurants, cafes, food outlets and nightspots",
    banner: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    badge: "Food & Hospitality",
  },
  hotels: {
    name: "Hotels & Stays",
    tagline: "Discover best hotel deals, luxury resorts, and boutique stays",
    banner: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    badge: "Hospitality Deals",
  },
  "beauty-spa": {
    name: "Beauty Parlours & Spas",
    tagline: "Book unisex salons, ayurvedic spas, and bridal makeup artists",
    banner: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1600&q=80",
    badge: "Wellness & Care",
  },
  "home-decor": {
    name: "Home Decor & Furnishing",
    tagline: "Interior designers, furniture showrooms, and lighting experts",
    banner: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
    badge: "Interior & Lifestyle",
  },
  "wedding-planning": {
    name: "Wedding Planning & Banquet Halls",
    tagline: "Banquet halls, caterers, photographers, and wedding planners",
    banner: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
    badge: "Celebrations",
  },
  education: {
    name: "Education & Coaching Centers",
    tagline: "Top schools, IIT/NEET coaching institutes, and colleges",
    banner: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
    badge: "Academic Excellence",
  },
  "rent-hire": {
    name: "Car & Equipment Rent & Hire",
    tagline: "Self-drive cars, event equipment, and furniture rentals",
    banner: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1600&q=80",
    badge: "On-Demand Rentals",
  },
  hospitals: {
    name: "Hospitals & Multispecialty Clinics",
    tagline: "24x7 emergency care, multispecialty hospitals, and diagnostic centers",
    banner: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1600&q=80",
    badge: "Healthcare 24x7",
  },
  contractors: {
    name: "Building & Civil Contractors",
    tagline: "Architects, civil engineers, plumbers, and painting contractors",
    banner: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80",
    badge: "Construction",
  },
  "pet-shops": {
    name: "Pet Shops & Vet Clinics",
    tagline: "Pet supplies, dog grooming parlours, and veterinary doctors",
    banner: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1600&q=80",
    badge: "Pet Care",
  },
  "pg-hostels": {
    name: "PG & Student Hostels",
    tagline: "AC/Non-AC boys and girls hostels near educational hubs",
    banner: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1600&q=80",
    badge: "Student Accommodation",
  },
  "estate-agent": {
    name: "Real Estate Agents & Property Consultants",
    tagline: "Buy, sell, and rent residential plots, flats, and commercial offices",
    banner: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80",
    badge: "Property Experts",
  },
  dentists: {
    name: "Dental Clinics & Orthodontists",
    tagline: "Teeth whitening, root canal treatment, and dental implants",
    banner: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1600&q=80",
    badge: "Oral Care",
  },
  gym: {
    name: "Gyms & Fitness Centers",
    tagline: "Crossfit, weight training, yoga centers, and personal trainers",
    banner: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80",
    badge: "Health & Fitness",
  },
  loans: {
    name: "Loans & Financial Advisors",
    tagline: "Personal loans, home loans, business capital, and GST advisors",
    banner: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80",
    badge: "Financial Services",
  },
  "event-organisers": {
    name: "Event Organisers & Stage Decorators",
    tagline: "Corporate events, birthday parties, stage lighting, and sound systems",
    banner: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
    badge: "Event Management",
  },
  "driving-schools": {
    name: "Motor Driving Schools",
    tagline: "4-wheeler and 2-wheeler driving lessons with RTO license assistance",
    banner: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=80",
    badge: "Automobile Training",
  },
  "packers-movers": {
    name: "Packers & Movers",
    tagline: "Home shifting, vehicle transport, and office relocation services",
    banner: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    badge: "Relocation Experts",
  },
  "courier-service": {
    name: "Courier & Parcel Delivery Services",
    tagline: "Domestic and international express parcel dispatch and tracking",
    banner: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    badge: "Logistics",
  },
  "popular-categories": {
    name: "All Trending Categories",
    tagline: "Explore all 500+ local service categories and verified business listings",
    banner: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    badge: "Master Directory",
  },
};

// Demo Listing Generator per category
const GENERATE_LISTINGS = (slug) => [
  {
    id: `${slug}-1`,
    name: `Royal ${slug.replace("-", " ").toUpperCase()} Hub`,
    rating: "4.9",
    reviews: "420 Ratings",
    location: "Patia Square, Bhubaneswar",
    price: "₹1,200 Onwards",
    phone: "+919876543210",
    img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
    distance: "1.2 km",
  },
  {
    id: `${slug}-2`,
    name: `Grand ${slug.replace("-", " ").toUpperCase()} Center`,
    rating: "4.8",
    reviews: "280 Ratings",
    location: "Jaydev Vihar, Bhubaneswar",
    price: "Best Market Price",
    phone: "+919876543211",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
    distance: "2.5 km",
  },
  {
    id: `${slug}-3`,
    name: `Elite ${slug.replace("-", " ").toUpperCase()} Services`,
    rating: "4.7",
    reviews: "190 Ratings",
    location: "Saheed Nagar, Bhubaneswar",
    price: "Verified Quotes",
    phone: "+919876543212",
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
    distance: "3.8 km",
  },
];

export default function DynamicCategoryPage() {
  const { slug } = useParams();
  const meta = CATEGORY_META[slug] || {
    name: `${slug?.replace("-", " ")?.toUpperCase()} Listings`,
    tagline: `Find top rated ${slug?.replace("-", " ")} services in your city`,
    banner: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    badge: "Verified Local Directory",
  };

  const listings = GENERATE_LISTINGS(slug || "service");
  const [showMap, setShowMap] = useState(false);
  const [selectedQuoteBusiness, setSelectedQuoteBusiness] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredListings = listings.filter((l) =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* 🔹 DYNAMIC HERO BANNER */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900 border-b border-slate-800">
        <img
          src={meta.banner}
          alt={meta.name}
          className="w-full h-full object-cover opacity-40 transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-8 z-10">
          <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider w-fit mb-3 flex items-center gap-1.5 shadow-md">
            <Sparkles size={13} /> {meta.badge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight capitalize">
            {meta.name}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl font-medium leading-relaxed">
            {meta.tagline}
          </p>
        </div>
      </div>

      {/* 🔹 MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* FILTER & SEARCH CONTROL BAR */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-4 mb-8 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Field */}
          <div className="relative flex-1 flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 focus-within:border-amber-500 transition-all">
            <Search size={16} className="text-slate-500 mr-2 shrink-0" />
            <input
              type="text"
              placeholder={`Search ${meta.name}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-white placeholder:text-slate-500 outline-none w-full font-medium"
            />
          </div>

          {/* Quick Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowMap(!showMap)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all border ${
                showMap
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow"
                  : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700"
              }`}
            >
              <MapIcon size={14} />
              <span>{showMap ? "Hide Interactive Map" : "View on Interactive Map"}</span>
            </button>
          </div>
        </div>

        {/* INTERACTIVE MAP PREVIEW TOGGLE */}
        {showMap && <InteractiveMap onClose={() => setShowMap(false)} />}

        {/* LISTINGS & STICKY QUOTE FORM GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Business Cards Column */}
          <div className="lg:col-span-2 space-y-5">
            {filteredListings.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800/80 rounded-3xl p-5 shadow-xl hover:shadow-2xl hover:border-slate-700 transition-all flex flex-col sm:flex-row gap-5"
              >
                {/* Image Container */}
                <div className="w-full sm:w-48 h-40 rounded-2xl overflow-hidden shrink-0 relative">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-emerald-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                    <ShieldCheck size={12} /> Verified
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-base sm:text-lg font-black text-white">{item.name}</h2>
                      <span className="text-[11px] font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full shrink-0">
                        {item.distance}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs mt-1.5">
                      <span className="bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded flex items-center gap-1">
                        <Star size={12} className="fill-slate-950" /> {item.rating}
                      </span>
                      <span className="text-slate-400 font-medium">{item.reviews}</span>
                    </div>

                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5 font-medium">
                      <MapPin size={13} className="text-slate-500 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </p>

                    <p className="text-emerald-400 font-extrabold text-sm mt-2">
                      {item.price}
                    </p>
                  </div>

                  {/* Direct Action Buttons (Call, WhatsApp, Get Quote) */}
                  <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-800/80">
                    <a
                      href={`tel:${item.phone}`}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-md transition-colors"
                    >
                      <PhoneCall size={14} /> Call Now
                    </a>

                    <a
                      href={`https://wa.me/${item.phone?.replace("+", "")}?text=Hi,%20I'm%20interested%20in%20${encodeURIComponent(item.name)}%20services%20on%20ApnaBiz`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-md transition-colors"
                    >
                      <MessageCircle size={14} /> WhatsApp
                    </a>

                    <button
                      onClick={() => setSelectedQuoteBusiness(item)}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl transition-all shadow-md ml-auto flex items-center gap-1"
                    >
                      <Sparkles size={14} /> Get Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Side Form */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl sticky top-24">
              <h3 className="font-black text-base text-white flex items-center gap-2">
                <Sparkles size={18} className="text-amber-400" />
                <span>Need Instant Vendor Quotes?</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed">
                Send your requirement to top verified sellers in {meta.name} and receive WhatsApp quotes directly.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Quote request submitted! Vendors will contact you on WhatsApp.");
                }}
                className="space-y-3.5 mt-5"
              >
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-amber-500 transition-colors font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-amber-500 transition-colors font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Specific Requirements</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe what you need..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-amber-500 transition-colors resize-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black py-2.5 rounded-xl text-xs shadow-lg shadow-orange-500/20 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Send size={14} />
                  <span>Send WhatsApp Lead Inquiry</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Request Modal Popup Trigger */}
      {selectedQuoteBusiness && (
        <QuoteRequestModal
          isOpen={!!selectedQuoteBusiness}
          onClose={() => setSelectedQuoteBusiness(null)}
          businessId={selectedQuoteBusiness.id}
          businessName={selectedQuoteBusiness.name}
          phone={selectedQuoteBusiness.phone}
        />
      )}
    </div>
  );
}
