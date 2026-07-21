"use client";

import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Palette, X, Check, Sparkles, Moon, Sun, Trees, Crown } from "lucide-react";

const THEME_OPTIONS = [
  {
    id: "dark",
    name: "Midnight Slate",
    subtitle: "Dark Slate with Amber Glow",
    icon: Moon,
    badgeBg: "bg-slate-900 border-indigo-500",
    accentColor: "bg-amber-500",
    colorPreview: ["bg-slate-950", "bg-slate-900", "bg-amber-500"],
  },
  {
    id: "light",
    name: "Clean Light",
    subtitle: "Crisp Modern Light Palette",
    icon: Sun,
    badgeBg: "bg-white border-orange-500",
    accentColor: "bg-orange-500",
    colorPreview: ["bg-slate-100", "bg-white", "bg-orange-500"],
  },
  {
    id: "emerald",
    name: "Emerald Ocean",
    subtitle: "Deep Teal & Emerald Green",
    icon: Trees,
    badgeBg: "bg-teal-950 border-emerald-500",
    accentColor: "bg-emerald-500",
    colorPreview: ["bg-teal-950", "bg-emerald-900", "bg-emerald-500"],
  },
  {
    id: "amber",
    name: "Luxury Gold",
    subtitle: "Royal Purple & Gold Gradient",
    icon: Crown,
    badgeBg: "bg-purple-950 border-amber-500",
    accentColor: "bg-amber-400",
    colorPreview: ["bg-purple-950", "bg-purple-900", "bg-amber-400"],
  },
];

export default function ThemeCustomizer() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Gear Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full bg-slate-900 border border-slate-700 text-amber-400 flex items-center justify-center shadow-2xl hover:scale-110 hover:border-amber-400 transition-all group"
        aria-label="Customize Theme Palette"
        title="Customize Theme Palette"
      >
        <Palette size={20} className="group-hover:rotate-45 transition-transform duration-300" />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 animate-ping" />
      </button>

      {/* Theme Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-full max-w-md bg-slate-900 border-l border-slate-800 text-slate-100 h-full shadow-2xl p-6 overflow-y-auto z-10 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold tracking-tight">Theme Customizer</h2>
                    <p className="text-[11px] text-slate-400 font-medium">Select your preferred color palette</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Theme Options */}
              <div className="space-y-3.5">
                {THEME_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = theme === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setTheme(opt.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between group ${
                        isSelected
                          ? "bg-slate-950 border-amber-500 ring-2 ring-amber-500/20 shadow-xl"
                          : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${opt.badgeBg} border flex items-center justify-center text-white shadow`}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <h3 className="text-sm font-extrabold text-white group-hover:text-amber-400 transition-colors">
                            {opt.name}
                          </h3>
                          <p className="text-[11px] text-slate-400 font-medium">{opt.subtitle}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Color Swatch Dots */}
                        <div className="flex items-center -space-x-1">
                          {opt.colorPreview.map((c, i) => (
                            <div key={i} className={`w-4 h-4 rounded-full border border-slate-900 ${c}`} />
                          ))}
                        </div>

                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                            <Check size={14} />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Notice */}
            <div className="pt-6 border-t border-slate-800 text-center">
              <p className="text-[11px] text-slate-400 font-semibold">
                Theme choice is automatically saved in your browser storage.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
