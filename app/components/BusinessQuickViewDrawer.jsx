"use client";

import { useState, useEffect } from "react";
import {
  X,
  MapPin,
  Phone,
  Star,
  Clock,
  Wifi,
  Car,
  CreditCard,
  Navigation,
  Heart,
  Share2,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  MessageCircle
} from "lucide-react";

export default function BusinessQuickViewDrawer({ isOpen, onClose, businessId }) {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    if (isOpen && businessId) {
      fetchBusinessDetails();
    }
  }, [isOpen, businessId]);

  const fetchBusinessDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/business/${businessId}/quick-view`);
      if (response.ok) {
        const data = await response.json();
        setBusiness(data.data);
      } else {
        // Fallback demo object
        setBusiness({
          id: businessId,
          name: "S Convention & Luxury Hotel",
          category: "Hotels & Banquet",
          subCategory: "Luxury Stay",
          rating: 4.8,
          reviewCount: 340,
          isOpen: true,
          phone: "+919876543210",
          description: "Top rated banquet hall and luxury stay in Patia, Bhubaneswar. Full AC, Wi-Fi, and 24x7 room service.",
          amenities: ["wifi", "parking", "cards", "home_delivery"],
          operatingHours: {
            monday: "09:00 - 22:00",
            tuesday: "09:00 - 22:00",
            wednesday: "09:00 - 22:00",
            thursday: "09:00 - 22:00",
            friday: "09:00 - 23:00",
            saturday: "09:00 - 23:00",
            sunday: "09:00 - 23:00",
          },
          photos: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
          ],
          address: {
            street: "Plot 142, KIIT Road",
            area: "Patia",
            district: "Bhubaneswar",
            state: "Odisha",
            pincode: "751024",
          },
        });
      }
    } catch (error) {
      console.error("Error fetching business details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
      wifi: Wifi,
      parking: Car,
      cards: CreditCard,
      home_delivery: Navigation,
    };
    const Icon = icons[amenity] || Wifi;
    return <Icon size={16} />;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xl bg-slate-900 border-l border-slate-800 text-slate-100 h-full shadow-2xl overflow-y-auto z-10 flex flex-col justify-between">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
              <Sparkles size={16} />
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">Business Quick-View</h2>
              <p className="text-[11px] text-slate-400 font-medium">Full details & amenities</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 flex-1">
          {loading ? (
            <div className="text-center py-12 text-slate-400 font-medium">Loading business details...</div>
          ) : !business ? (
            <div className="text-center py-12 text-slate-400 font-medium">Business not found</div>
          ) : (
            <div className="space-y-6">
              {/* Header Title */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck size={12} /> Verified Partner
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                    business.isOpen ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-slate-800 text-slate-400"
                  }`}>
                    {business.isOpen ? "● Open Now" : "Closed"}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white">{business.name}</h3>
                <p className="text-xs text-indigo-400 font-semibold mt-1">
                  {business.category} {business.subCategory && `• ${business.subCategory}`}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800/80 w-fit">
                <Star className="fill-amber-400 text-amber-400" size={18} />
                <span className="font-extrabold text-sm text-white">{business.rating || 4.8}</span>
                <span className="text-xs text-slate-400 font-medium">({business.reviewCount || 120} reviews)</span>
              </div>

              {/* Photo Gallery */}
              {business.photos && business.photos.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">Photo Gallery</h4>
                  <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-800">
                    <img
                      src={business.photos[currentPhotoIndex]}
                      alt={`${business.name} photo`}
                      className="w-full h-full object-cover"
                    />
                    {business.photos.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentPhotoIndex((prev) => (prev === 0 ? business.photos.length - 1 : prev - 1))}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-950/70 text-white p-2 rounded-full hover:bg-slate-950"
                        >
                          ←
                        </button>
                        <button
                          onClick={() => setCurrentPhotoIndex((prev) => (prev === business.photos.length - 1 ? 0 : prev + 1))}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-950/70 text-white p-2 rounded-full hover:bg-slate-950"
                        >
                          →
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Amenities */}
              {business.amenities && (
                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">Amenities Available</h4>
                  <div className="flex flex-wrap gap-2">
                    {business.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-300 font-semibold"
                      >
                        {getAmenityIcon(amenity)}
                        <span className="capitalize">{amenity.replace("_", " ")}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Address */}
              {business.address && (
                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MapPin size={16} className="text-amber-400" /> Location Address
                  </h4>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    {business.address.street}, {business.address.area}, {business.address.district}, {business.address.state} - {business.address.pincode}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Direct Actions */}
        {business && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 grid grid-cols-2 gap-3">
            <a
              href={`tel:${business.phone}`}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <PhoneCall size={16} /> Call Now
            </a>

            <a
              href={`https://wa.me/${business.phone?.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
