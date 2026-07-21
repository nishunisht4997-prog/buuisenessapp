"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, ShieldCheck } from "lucide-react";

const SLIDES = [
  {
    title: "Grow Your Business Online",
    subtitle: "Get 100% verified customer leads in your city with ApnaBiz Premium",
    tag: "SPECIAL PROMO",
    badgeColor: "bg-amber-500",
    bgGradient: "from-indigo-900 via-purple-900 to-slate-900",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Top Rated Home Services",
    subtitle: "Book verified Electricians, Plumbers & AC Technicians in 60 seconds",
    tag: "POPULAR CATEGORY",
    badgeColor: "bg-emerald-500",
    bgGradient: "from-emerald-950 via-teal-900 to-slate-900",
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "B2B Bulk Quotes Portal",
    subtitle: "Connect directly with top manufacturers, wholesalers & suppliers",
    tag: "B2B EXCLUSIVE",
    badgeColor: "bg-blue-500",
    bgGradient: "from-blue-950 via-indigo-950 to-slate-900",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Grand Wedding Planning 2026",
    subtitle: "Discover best Banquet Halls, Caterers & Makeup Artists near you",
    tag: "TRENDING NOW",
    badgeColor: "bg-rose-500",
    bgGradient: "from-rose-950 via-purple-950 to-slate-900",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));

  return (
    <div className="relative h-[260px] sm:h-[320px] lg:h-[360px] w-full overflow-hidden rounded-2xl shadow-xl will-change group border border-slate-200/50">
      {/* Slides Container */}
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {SLIDES.map((slide, i) => (
          <div key={i} className="w-full h-full shrink-0 relative overflow-hidden">
            {/* Background Image */}
            <img
              src={slide.img}
              alt={slide.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-100 transition-transform duration-1000"
            />

            {/* Gradient Mask Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-85 mix-blend-multiply`} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

            {/* Slide Text Content */}
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10">
              <div className="flex items-center gap-2">
                <span className={`${slide.badgeColor} text-white font-extrabold text-[10px] sm:text-xs px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1`}>
                  <Sparkles size={12} /> {slide.tag}
                </span>
                <span className="bg-white/10 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck size={12} className="text-emerald-400" /> Verified
                </span>
              </div>

              <div className="max-w-xl">
                <h2 className="text-xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
                  {slide.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 mt-2 font-medium line-clamp-2 drop-shadow-sm">
                  {slide.subtitle}
                </p>
                <button className="mt-4 bg-white hover:bg-slate-100 text-slate-900 font-bold px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-1.5">
                  <span>Explore Now</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/40 hover:bg-slate-900/80 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/40 hover:bg-slate-900/80 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20"
        aria-label="Next Slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Progress Slide Dots */}
      <div className="absolute bottom-4 right-6 flex items-center gap-2 z-20">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index ? "w-7 bg-amber-400 shadow-md" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
