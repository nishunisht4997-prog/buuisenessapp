"use client";

import { useRouter } from "next/navigation";
import { Megaphone, PlusCircle, HelpCircle } from "lucide-react";

export default function RightButtons() {
  const router = useRouter();

  return (
    <aside className="fixed right-4 bottom-8 z-40 flex flex-col gap-3">
      {/* Advertise Button */}
      <button
        onClick={() => router.push("/free-listing")}
        className="group relative flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white shadow-xl shadow-amber-500/30 hover:scale-110 active:scale-95 transition-all duration-300"
        title="Advertise Business"
      >
        <Megaphone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        
        {/* Tooltip Label */}
        <span className="absolute right-14 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap">
          Advertise With Us
        </span>
      </button>

      {/* Free Listing Button */}
      <button
        onClick={() => router.push("/free-listing")}
        className="group relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl shadow-indigo-600/30 hover:scale-110 active:scale-95 transition-all duration-300"
        title="Free Business Listing"
      >
        <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        
        {/* Pulsing indicator dot */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />

        {/* Tooltip Label */}
        <span className="absolute right-14 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap">
          Add Free Listing
        </span>
      </button>
    </aside>
  );
}
