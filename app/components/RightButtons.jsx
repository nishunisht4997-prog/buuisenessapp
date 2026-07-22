"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Megaphone, PlusCircle, Bot, Sparkles } from "lucide-react";
import AIChatbotModal from "./AIChatbotModal";

export default function RightButtons() {
  const router = useRouter();
  const [showAiBot, setShowAiBot] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
        {/* Floating Action 0: AI Smart Matchmaker Chatbot */}
        <div className="group relative flex items-center">
          {/* Tooltip */}
          <span className="mr-3 px-3 py-1.5 bg-slate-900 text-amber-400 text-xs font-black rounded-xl border border-slate-800 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap hidden sm:flex items-center gap-1">
            <Sparkles size={13} /> Ask AI Smart Matchmaker
          </span>
          <button
            onClick={() => setShowAiBot(true)}
            className="relative w-13 h-13 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 text-slate-950 flex items-center justify-center shadow-xl hover:shadow-amber-500/50 hover:scale-110 transition-all duration-300 group border-2 border-white/20"
            aria-label="AI Smart Matchmaker Chatbot"
            title="AI Smart Matchmaker Chatbot"
          >
            <Bot size={24} className="text-slate-950" />
            {/* Pulse Glow Ring */}
            <span className="absolute -inset-1 rounded-full bg-amber-500/40 animate-ping pointer-events-none" />
          </button>
        </div>

        {/* Floating Action 1: Free Listing */}
        <div className="group relative flex items-center">
          <span className="mr-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap hidden sm:block">
            List Your Business Free
          </span>
          <button
            onClick={() => router.push("/free-listing")}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 text-slate-950 flex items-center justify-center shadow-lg hover:shadow-orange-500/40 hover:scale-110 transition-all duration-300"
            aria-label="Free Listing"
          >
            <PlusCircle size={22} />
          </button>
        </div>

        {/* Floating Action 2: Advertise */}
        <div className="group relative flex items-center">
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

      {/* 🤖 AI Matchmaker Chatbot Modal */}
      {showAiBot && (
        <AIChatbotModal isOpen={showAiBot} onClose={() => setShowAiBot(false)} />
      )}
    </>
  );
}
