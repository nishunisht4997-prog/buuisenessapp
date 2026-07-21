"use client";

import { useRouter } from "next/navigation";
import { Megaphone, PlusCircle, MessageSquare, PhoneCall, Sparkles } from "lucide-react";

export default function RightButtons() {
  const router = useRouter();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      {/* Floating Action 1: Free Listing */}
      <div className="group relative flex items-center">
        {/* Tooltip */}
        <span className="mr-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap hidden sm:block">
          List Your Business Free
        </span>
        <button
          onClick={() => router.push("/free-listing")}
          className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 text-white flex items-center justify-center shadow-lg hover:shadow-orange-500/40 hover:scale-110 transition-all duration-300 group"
          aria-label="Free Listing"
        >
          <PlusCircle size={22} />
          {/* Pulse Glow Ring */}
          <span className="absolute -inset-1 rounded-full bg-orange-500/30 animate-ping pointer-events-none" />
        </button>
      </div>

      {/* Floating Action 2: Advertise */}
      <div className="group relative flex items-center">
        {/* Tooltip */}
        <span className="mr-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap hidden sm:block">
          Advertise with Us
        </span>
        <button
          onClick={() => router.push("/business/dashboard")}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-900 via-purple-900 to-indigo-950 text-white flex items-center justify-center shadow-lg hover:shadow-indigo-900/40 hover:scale-110 transition-all duration-300"
          aria-label="Advertise with Us"
        >
          <Megaphone size={20} className="text-amber-400" />
        </button>
      </div>
    </div>
  );
}
