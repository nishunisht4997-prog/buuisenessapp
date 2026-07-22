"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bot,
  X,
  Send,
  Sparkles,
  Phone,
  MessageCircle,
  Star,
  ShieldCheck,
  MapPin,
  Loader2,
  RefreshCw,
  Zap
} from "lucide-react";
import QuoteRequestModal from "./QuoteRequestModal";

const QUICK_PROMPTS = [
  "Mujhe Patia me 2000 ke andar hotel chahiye",
  "Saheed Nagar me best AC Repair technician",
  "Patia me 1000 ke andar buffet restaurant",
  "Wedding hall under 50000 near Bhubaneswar",
];

export default function AIChatbotModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Namaste! Main **ApnaBiz AI Smart Matchmaker** hun. 🤖\n\nAap mujhe kuch bhi natural language me puch sakte hain. Example: *'Mujhe Patia me 2000 ke andar hotel chahiye'*",
      matches: [],
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSend = async (queryText) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || loading) return;

    // Add user message
    const userMsg = { sender: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-matchmaker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: textToSend }),
      });

      const data = await res.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: data.aiMessage,
            matches: data.matches || [],
            detected: data.detected,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "Sorry, main match complete nahi kar paaya. Kripya dushra search try karein.",
            matches: [],
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "ApnaBiz AI Server busy hai. Kripya thodi der baad try karein.",
          matches: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Main Chat Modal Container */}
      <div className="relative bg-slate-900 border border-slate-800 text-white rounded-3xl shadow-2xl w-full max-w-2xl h-[90vh] sm:h-[650px] flex flex-col overflow-hidden z-10">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 text-slate-950 flex items-center justify-center font-black shadow-lg">
                <Bot size={22} className="text-slate-950" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-950 animate-pulse" />
            </div>

            <div>
              <h2 className="text-base font-extrabold tracking-tight flex items-center gap-1.5">
                <span>ApnaBiz AI Smart Matchmaker</span>
                <span className="text-[10px] font-black bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Zap size={11} /> AI 3.0
                </span>
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">
                Instant Top 3 Matched Recommendations in Odisha
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat Message Scroll Body */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-950/60 no-scrollbar">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              {/* Message Bubble */}
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm font-medium leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold rounded-tr-none shadow-lg"
                    : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-md"
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {/* AI Detected Criteria Chips */}
                {msg.detected && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800 flex flex-wrap gap-1.5">
                    <span className="text-[10px] bg-slate-950 text-amber-400 px-2 py-0.5 rounded-md font-extrabold border border-slate-800">
                      📍 {msg.detected.location}
                    </span>
                    <span className="text-[10px] bg-slate-950 text-indigo-400 px-2 py-0.5 rounded-md font-extrabold border border-slate-800">
                      🏷️ {msg.detected.category}
                    </span>
                    {msg.detected.maxPrice !== "No Limit" && (
                      <span className="text-[10px] bg-slate-950 text-emerald-400 px-2 py-0.5 rounded-md font-extrabold border border-slate-800">
                        💰 Max ₹{msg.detected.maxPrice}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Match Cards Showcase */}
              {msg.matches && msg.matches.length > 0 && (
                <div className="mt-3 w-full max-w-lg space-y-3">
                  <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider block">
                    🌟 Top 3 AI Recommended Matches:
                  </span>
                  <div className="grid grid-cols-1 gap-3">
                    {msg.matches.map((item) => (
                      <div
                        key={item.id}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 shadow-xl hover:border-amber-500/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 rounded-xl object-cover border border-slate-800 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-xs sm:text-sm font-extrabold text-white line-clamp-1">
                                {item.name}
                              </h4>
                              {item.isVerified && (
                                <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 font-semibold mt-0.5 flex items-center gap-1">
                              <MapPin size={11} className="text-amber-400 shrink-0" />
                              <span>{item.area}, {item.district}</span>
                            </p>

                            <div className="flex items-center gap-2 mt-1.5">
                              <span className="bg-amber-500/20 text-amber-400 font-black text-[10px] px-2 py-0.5 rounded flex items-center gap-0.5">
                                <Star size={10} className="fill-amber-400" /> {item.averageRating}
                              </span>
                              <span className="text-emerald-400 font-extrabold text-[11px]">
                                {item.priceText}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                          <a
                            href={`tel:${item.phone}`}
                            className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-3 py-2 rounded-xl flex items-center justify-center gap-1 transition-colors"
                          >
                            <Phone size={13} />
                            <span>Call</span>
                          </a>
                          <button
                            onClick={() => {
                              setSelectedBusiness(item);
                              setShowQuoteModal(true);
                            }}
                            className="flex-1 sm:flex-none bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs px-3 py-2 rounded-xl flex items-center justify-center gap-1 transition-all"
                          >
                            <MessageCircle size={13} />
                            <span>Quote</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold p-3.5 rounded-2xl w-fit">
              <Loader2 size={16} className="animate-spin" />
              <span>AI is searching Patia, Saheed Nagar & Bhubaneswar directory...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Prompts Bar */}
        <div className="p-3 bg-slate-950/90 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider shrink-0">
              Suggestions:
            </span>
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="text-[11px] font-bold text-slate-300 hover:text-amber-400 bg-slate-900 hover:bg-slate-800 px-3 py-1 rounded-xl border border-slate-800 transition-colors shrink-0 whitespace-nowrap"
              >
                ⚡ {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your request (e.g. Patia me 2000 ke andar hotel)..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none focus:border-amber-500 font-medium"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !inputQuery.trim()}
            className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black p-3.5 rounded-2xl shadow-lg disabled:opacity-50 transition-all shrink-0"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Quote Modal Integration */}
      {showQuoteModal && selectedBusiness && (
        <QuoteRequestModal
          isOpen={showQuoteModal}
          onClose={() => setShowQuoteModal(false)}
          businessId={selectedBusiness.id}
          businessName={selectedBusiness.name}
          vendorPhone={selectedBusiness.phone}
        />
      )}
    </div>
  );
}
