"use client";

import { useState, useEffect } from "react";
import { Download, Smartphone, X, Sparkles, CheckCircle2 } from "lucide-react";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Service Worker Auto Registration
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(
          (reg) => console.log("[PWA SW] Registered successfully:", reg.scope),
          (err) => console.log("[PWA SW] Registration failed:", err)
        );
      });
    }

    // Capture beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Detect if already installed as standalone
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("To install ApnaBiz App:\n1. Tap browser menu (3 dots or share icon)\n2. Select 'Add to Home Screen' or 'Install App'");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setInstalled(true);
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  if (installed || !showBanner) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md bg-slate-900/95 border border-amber-500/50 text-white rounded-3xl p-4 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-300">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 text-slate-950 flex items-center justify-center font-black shadow-md shrink-0">
            <Smartphone size={22} />
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-black text-white flex items-center gap-1">
              <span>Install ApnaBiz App</span>
              <Sparkles size={13} className="text-amber-400" />
            </h4>
            <p className="text-[11px] text-slate-300 font-medium">
              Add to Home Screen for fast native app experience
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleInstallClick}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black px-3.5 py-2 rounded-xl text-xs flex items-center gap-1 shadow-lg shadow-orange-500/20 transition-all whitespace-nowrap"
          >
            <Download size={14} />
            <span>Install</span>
          </button>

          <button
            onClick={() => setShowBanner(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800"
            aria-label="Dismiss banner"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
