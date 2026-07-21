"use client";

import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";

export default function FreeListing() {
  const [showLogin, setShowLogin] = useState(false);

  // 🔐 AUTO REDIRECT IF ALREADY LOGGED IN
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const businessId = localStorage.getItem("businessId");

    // CASE 1 → USER + BUSINESS
    if (userId && businessId) {
      window.location.href = "/business/dashboard";
      return;
    }

    // CASE 2 → USER ONLY
    if (userId && !businessId) {
      window.location.href = "/free-listing/register";
    }

    // CASE 3 → NOT LOGGED IN → STAY HERE
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <div className="bg-indigo-100 py-16 px-10 text-center">
        <h1 className="text-4xl font-bold mb-3">List Your Business for FREE</h1>
        <p className="text-gray-600">Reach thousands of customers near you</p>

        <button
          onClick={() => setShowLogin(true)}
          className="bg-cyan-600 text-white px-8 py-2 rounded-lg text-lg"
        >
          Start Free Listing →
        </button>
      </div>

      {/* STEPS */}
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8 mt-5 px-6">
        <Step
          title="Step 1"
          desc="Enter your mobile number"
          img="/PhoneN.png"
        />
        <Step
          title="Step 2"
          desc="Verify OTP & add business details"
          img="/OTP.png"
        />
        <Step
          title="Step 3"
          desc="Get listed & grow your business"
          img="/Business.png"
        />
      </div>

      {/* LOGIN POPUP */}
      {showLogin && <LoginModal close={() => setShowLogin(false)} />}
    </div>
  );
}

function Step({ title, desc, img }) {
  return (
    <div className="text-center">
      <img src={img} className="w-48 mx-auto mb-4" />
      <h3 className="font-bold text-xl">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
