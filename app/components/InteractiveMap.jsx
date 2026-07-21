"use client";

import { useState } from "react";
import {
  MapPin,
  Navigation,
  Compass,
  Star,
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  Building2,
  X,
  Sparkles
} from "lucide-react";

const MAP_PINS = [
  {
    id: 1,
    name: "S Convention & Luxury Stay",
    category: "Hotel / Banquet",
    rating: "4.8",
    reviews: "340+",
    distance: "1.2 km",
    address: "Patia Square, Bhubaneswar",
    phone: "+919876543210",
    top: "35%",
    left: "40%",
  },
  {
    id: 2,
    name: "Mayfair Food Court & Restro",
    category: "Restaurant",
    rating: "4.9",
    reviews: "820+",
    distance: "2.4 km",
    address: "Jaydev Vihar, Bhubaneswar",
    phone: "+919876543211",
    top: "55%",
    left: "65%",
  },
  {
    id: 3,
    name: "Toni & Guy Unisex Salon",
    category: "Beauty & Spa",
    rating: "4.7",
    reviews: "210+",
    distance: "3.1 km",
    address: "Saheed Nagar, Bhubaneswar",
    phone: "+919876543212",
    top: "25%",
    left: "70%",
  },
  {
    id: 4,
    name: "Gold's Gym & Fitness Hub",
    category: "Gym & Fitness",
    rating: "4.8",
    reviews: "450+",
    distance: "0.8 km",
    address: "KIIT Road, Bhubaneswar",
    phone: "+919876543213",
    top: "60%",
    left: "30%",
  },
];

export default function InteractiveMap({ onClose = () => {} }) {
  const [selectedPin, setSelectedPin] = useState(MAP_PINS[0]);
  const [radius, setRadius] = useState("5km");

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative my-6">
      {/* Map Header Bar */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 z-10 relative">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow">
            <Compass size={18} className="animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
              <span>Interactive Map & Radius Search</span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">Live</span>
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">Bhubaneswar & Surrounding Areas</p>
          </div>
        </div>

        {/* Radius Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 px-2 flex items-center gap-1">
            <Navigation size={12} className="text-amber-400" /> Radius:
          </span>
          {["2km", "5km", "10km", "Entire City"].map((r) => (
            <button
              key={r}
              onClick={() => setRadius(r)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all ${
                radius === r
                  ? "bg-amber-500 text-slate-950 shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Simulated Map Visual Container */}
      <div className="relative h-80 sm:h-96 w-full bg-slate-950 overflow-hidden bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
        {/* Map Grid Roads Visualization */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/3 left-0 w-full h-2 bg-indigo-500/40" />
          <div className="absolute top-2/3 left-0 w-full h-3 bg-amber-500/30" />
          <div className="absolute top-0 left-1/2 w-3 h-full bg-emerald-500/30" />
          <div className="absolute top-0 left-1/4 w-2 h-full bg-blue-500/30" />
        </div>

        {/* Map Pins */}
        {MAP_PINS.map((pin) => {
          const isSelected = selectedPin?.id === pin.id;
          return (
            <button
              key={pin.id}
              onClick={() => setSelectedPin(pin)}
              style={{ top: pin.top, left: pin.left }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group ${
                isSelected ? "z-30 scale-125" : "z-20 hover:scale-110"
              }`}
            >
              <div
                className={`p-2 rounded-2xl flex items-center gap-1.5 shadow-xl border backdrop-blur-md transition-colors ${
                  isSelected
                    ? "bg-amber-500 text-slate-950 border-amber-400 font-extrabold ring-4 ring-amber-500/30 animate-bounce"
                    : "bg-slate-900/90 text-white border-slate-700 hover:border-amber-400"
                }`}
              >
                <MapPin size={16} className={isSelected ? "text-slate-950" : "text-amber-400"} />
                <span className="text-[11px] font-bold whitespace-nowrap">{pin.distance}</span>
              </div>
            </button>
          );
        })}

        {/* Selected Pin Popup Card */}
        {selectedPin && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-700 p-4 rounded-2xl shadow-2xl z-40 animate-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/30 inline-flex items-center gap-1">
                  <ShieldCheck size={11} /> Verified Partner
                </span>
                <h4 className="text-sm font-extrabold text-white mt-1">{selectedPin.name}</h4>
                <p className="text-[11px] text-indigo-400 font-semibold">{selectedPin.category}</p>
              </div>

              <button
                onClick={() => setSelectedPin(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
              <MapPin size={12} className="text-amber-400 shrink-0" />
              <span>{selectedPin.address} ({selectedPin.distance})</span>
            </p>

            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-800">
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                <Star size={13} className="fill-amber-400" />
                <span>{selectedPin.rating}</span>
                <span className="text-slate-400 font-normal text-[11px]">({selectedPin.reviews})</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedPin.phone}`}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1"
                >
                  <PhoneCall size={12} /> Call
                </a>
                <a
                  href={`https://wa.me/${selectedPin.phone?.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1"
                >
                  <MessageCircle size={12} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
