"use client";

import { useState } from "react";
import { X, MapPin, Star, Phone, Navigation, Clock, Wifi, Car, CreditCard, ChevronLeft, ChevronRight, ExternalLink, Heart, MessageSquare } from "lucide-react";
import BookmarkButton from "./BookmarkButton";
import QuoteRequestModal from "./QuoteRequestModal";

const amenityIcons = {
  wifi: { icon: Wifi, label: "Free Wi-Fi" },
  ac: { icon: Wifi, label: "AC" },
  parking: { icon: Car, label: "Parking" },
  cards: { icon: CreditCard, label: "Cards Accepted" },
  home_delivery: { icon: Navigation, label: "Home Delivery" },
  outdoor_seating: { icon: MapPin, label: "Outdoor Seating" },
  indoor_seating: { icon: MapPin, label: "Indoor Seating" },
};

export default function BusinessQuickViewDrawer({ isOpen, onClose, business }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  if (!isOpen || !business) return null;

  const photos = business.photos || [];
  const amenities = business.amenities || [];
  const operatingHours = business.operatingHours || {};

  // Check if business is currently open
  const isOpenNow = () => {
    const now = new Date();
    const day = now.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const hours = operatingHours[day];
    if (!hours) return false;
    
    const [open, close] = hours.split("-").map(h => {
      const [hours, mins] = h.trim().split(":").map(Number);
      return hours * 60 + mins;
    });
    
    return currentTime >= open && currentTime <= close;
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 animate-in slide-in-from-right duration-300 overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>

        {/* Photo Gallery */}
        {photos.length > 0 ? (
          <div className="relative h-64 bg-slate-100">
            <img
              src={photos[currentPhotoIndex]}
              alt={`${business.name} photo ${currentPhotoIndex + 1}`}
              className="w-full h-full object-cover"
            />
            {photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-600" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition"
                >
                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {photos.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition ${
                        idx === currentPhotoIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-8 h-8 text-indigo-600" />
              </div>
              <p className="text-sm font-semibold text-slate-600">No photos available</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900">{business.name}</h2>
              <p className="text-sm font-medium text-indigo-600 mt-1">
                {business.category}
                {business.subCategory && ` • ${business.subCategory}`}
              </p>
            </div>
            <BookmarkButton businessId={business.id} size="large" />
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                isOpenNow()
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                  : "bg-slate-100 text-slate-600 border border-slate-200"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              {isOpenNow() ? "Open Now" : "Closed"}
            </span>
            {business.isVerified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                Verified
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-5 h-5 fill-amber-400" />
              <span className="font-bold text-lg">{business.averageRating?.toFixed(1) || "4.5"}</span>
            </div>
            <span className="text-slate-400 text-sm">
              ({business.totalReviews || 120} reviews)
            </span>
          </div>

          {/* Operating Hours */}
          {Object.keys(operatingHours).length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                Operating Hours
              </h3>
              <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                  <div key={day} className="flex justify-between text-xs">
                    <span className="font-medium text-slate-600 capitalize">{day}</span>
                    <span className="text-slate-800">{operatingHours[day] || "Closed"}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Amenities */}
          {amenities.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {amenities.map((amenity) => {
                  const amenityConfig = amenityIcons[amenity.toLowerCase()];
                  const Icon = amenityConfig?.icon || MapPin;
                  return (
                    <div
                      key={amenity}
                      className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200"
                    >
                      <Icon className="w-4 h-4 text-indigo-600" />
                      <span className="text-xs font-medium text-slate-700">
                        {amenityConfig?.label || amenity}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Location & Map */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-600" />
              Location
            </h3>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p className="text-sm text-slate-700 mb-3">
                {business.area}, {business.district}, {business.state}
                {business.pincode && ` - ${business.pincode}`}
              </p>
              {business.locationLat && business.locationLng && (
                <div className="rounded-lg overflow-hidden h-40 bg-slate-200">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src={`https://maps.google.com/maps?q=${business.locationLat},${business.locationLng}&z=15&output=embed`}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${business.phone}`}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
            <button
              onClick={() => setShowQuoteModal(true)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 rounded-xl transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Get Quote</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <button className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl transition">
              <Navigation className="w-4 h-4" />
              <span>Directions</span>
            </button>
            {business.website && (
              <a
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 font-semibold py-3 rounded-xl transition"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Website</span>
              </a>
            )}
          </div>
        </div>

        {/* Quote Request Modal */}
        {showQuoteModal && (
          <QuoteRequestModal
            isOpen={showQuoteModal}
            onClose={() => setShowQuoteModal(false)}
            businessId={business.id}
            businessName={business.name}
          />
        )}
      </div>
    </>
  );
}
