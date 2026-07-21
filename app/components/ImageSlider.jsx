"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Zap } from "lucide-react";

const slides = [
  {
    title: "Exclusive Business Offers",
    subtitle: "Up to 40% OFF on Top Rated Spa & Wellness Centers",
    tag: "SPECIAL DEAL",
    badgeBg: "bg-amber-500",
    gradient: "from-purple-900/90 via-indigo-900/70 to-transparent",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
    btnText: "Claim Offer",
  },
  {
    title: "Verified B2B Suppliers",
    subtitle: "Get Quick Bulk Quotes from Certified Manufacturers",
    tag: "B2B HUB",
    badgeBg: "bg-indigo-600",
    gradient: "from-blue-950/90 via-indigo-900/70 to-transparent",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
    btnText: "Request Quote",
  },
  {
    title: "Emergency Home Repairs",
    subtitle: "Electricians, Plumbers & AC Technicians at Your Doorstep in 30 Mins",
    tag: "FAST SERVICE",
    badgeBg: "bg-emerald-600",
    gradient: "from-slate-950/90 via-slate-900/70 to-transparent",
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    btnText: "Book Technician",
  },
  {
    title: "Premium Wedding Venues",
    subtitle: "Explore & Book Luxury Banquet Halls & Caterers in Your City",
    tag: "WEDDING 2026",
    badgeBg: "bg-rose-600",
    gradient: "from-rose-950/90 via-purple-950/70 to-transparent",
    img: "https://images.pexels.com/photos/17206170/pexels-photo-17206170/free-photo-of-interior-design-of-banquet-hall.jpeg?auto=compress&cs=tinysrgb&w=1200",
    btnText: "Explore Venues",
  },
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[340px] sm:h-[380px] w-full overflow-hidden rounded-2xl border border-slate-200/80 shadow-xl group">
      {/* Slides Container */}
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="min-w-full h-full relative overflow-hidden flex-shrink-0">
            {/* Background Image */}
            <img
              src={slide.img}
              alt={slide.title}
              loading="lazy"
              className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000"
            />

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} p-6 sm:p-10 flex flex-col justify-end text-white`} />

            {/* Content Overlay */}
            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between z-10">
              {/* Top Tag Badge */}
              <div>
                <span className={`inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-widest text-white px-3 py-1 rounded-full ${slide.badgeBg} shadow-md`}>
                  <Zap className="w-3 h-3" /> {slide.tag}
                </span>
              </div>

              {/* Bottom Info & CTA */}
              <div className="max-w-xl">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                  {slide.title}
                </h3>
                <p className="mt-2 text-slate-200 text-xs sm:text-sm font-medium leading-relaxed drop-shadow-xs">
                  {slide.subtitle}
                </p>
                <button className="mt-4 inline-flex items-center gap-2 bg-white text-slate-900 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg hover:bg-amber-400 hover:text-slate-950 transition-all hover:scale-105 active:scale-95">
                  <span>{slide.btnText}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/30 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 flex items-center justify-center transition opacity-0 group-hover:opacity-100 shadow-md"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/30 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 flex items-center justify-center transition opacity-0 group-hover:opacity-100 shadow-md"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 right-6 z-20 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === idx ? "w-7 bg-amber-400" : "w-2 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
