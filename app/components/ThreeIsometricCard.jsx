"use client";

import { useState } from "react";
import {
  Star,
  ShieldCheck,
  Phone,
  MessageCircle,
  Wifi,
  Wind,
  Car,
  UtensilsCrossed,
  Sparkles,
  MapPin,
  Building
} from "lucide-react";
import QuoteRequestModal from "./QuoteRequestModal";

export default function ThreeIsometricCard({
  id = "iso-1",
  name = "S Convention Suites & Grand Banquet",
  category = "Banquet Halls & Hotels",
  area = "Patia, Bhubaneswar",
  rating = 4.9,
  reviews = 340,
  priceText = "₹45,000 / day",
  phone = "+919876543210",
  image = "https://images.pexels.com/photos/17206170/pexels-photo-17206170/free-photo-of-interior-design-of-banquet-hall.jpeg?auto=compress&cs=tinysrgb&w=600",
}) {
  const [rotateX, setRotateX] = useState(15);
  const [rotateY, setRotateY] = useState(-15);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setRotateX(-y * 0.08);
    setRotateY(x * 0.08);
  };

  const handleMouseLeave = () => {
    setRotateX(15);
    setRotateY(-15);
  };

  return (
    <>
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-card rounded-3xl p-5 border border-slate-800 shadow-2xl relative overflow-hidden group cursor-pointer transition-all duration-300"
        style={{ perspective: "1000px" }}
      >
        {/* Top Header info */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-black text-white group-hover:text-amber-400 transition-colors">
                {name}
              </h3>
              <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
            </div>
            <p className="text-xs text-indigo-400 font-bold mt-0.5">{category}</p>
            <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
              <MapPin size={12} className="text-amber-400 shrink-0" />
              <span>{area}</span>
            </p>
          </div>

          <span className="bg-amber-500/20 text-amber-400 font-black text-xs px-2.5 py-1 rounded-xl flex items-center gap-1 border border-amber-500/30 shrink-0">
            <Star size={12} className="fill-amber-400" />
            <span>{rating}</span>
          </span>
        </div>

        {/* 🏢 3D Isometric View Container */}
        <div className="relative w-full h-[180px] sm:h-[200px] my-3 rounded-2xl overflow-hidden flex items-center justify-center bg-slate-950/80 border border-slate-800">
          <div
            className="relative w-[85%] h-[85%] rounded-2xl transition-transform duration-200 ease-out shadow-2xl border border-white/10 overflow-hidden"
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Background Store/Venue Image */}
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* 3D Isometric Front Badge */}
            <div className="absolute bottom-3 left-3 z-10 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-700 text-amber-400 font-black text-xs flex items-center gap-1.5 shadow-lg">
              <Building size={14} />
              <span>3D Isometric Venue</span>
            </div>
          </div>

          {/* 📶 3D Floating Amenity Pins */}
          <div className="absolute top-2 left-2 z-20 flex flex-wrap gap-1.5 pointer-events-none">
            <span className="bg-slate-950/90 text-slate-200 border border-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-md">
              <Wifi size={11} className="text-amber-400" /> Free Wi-Fi
            </span>
            <span className="bg-slate-950/90 text-slate-200 border border-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-md">
              <Wind size={11} className="text-cyan-400" /> Central AC
            </span>
            <span className="bg-slate-950/90 text-slate-200 border border-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-md">
              <Car size={11} className="text-emerald-400" /> Parking
            </span>
          </div>
        </div>

        {/* Bottom Actions & Price */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Estimated Rate:</span>
            <span className="text-sm font-black text-emerald-400">{priceText}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${phone}`}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1 transition-colors"
            >
              <Phone size={13} />
              <span>Call</span>
            </a>
            <button
              onClick={() => setShowQuoteModal(true)}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl flex items-center gap-1 shadow-md shadow-orange-500/20 transition-all"
            >
              <MessageCircle size={13} />
              <span>Quote</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      {showQuoteModal && (
        <QuoteRequestModal
          isOpen={showQuoteModal}
          onClose={() => setShowQuoteModal(false)}
          businessId={id}
          businessName={name}
          vendorPhone={phone}
        />
      )}
    </>
  );
}
