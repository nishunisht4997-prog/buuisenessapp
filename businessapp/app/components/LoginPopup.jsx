"use client";
import { useState } from "react";

export default function LoginModal({ close }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const sendOtp = async () => {
    if (!phone) return alert("Enter mobile number");

    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    const data = await res.json();
    setOtp(data.otp); // dev only
    setStep(2);
  };

  const verifyOtp = async () => {
    const res = await fetch("/api/auth/login-verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp }),
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    // 🔥 CLEAN OLD SESSION (MANDATORY)
    localStorage.removeItem("userId");
    localStorage.removeItem("businessId");
    localStorage.removeItem("phone");

    if (data.userId) {
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("phone", phone);
    }

    if (data.businessId) {
      localStorage.setItem("businessId", data.businessId);
    }

    window.location.href = data.redirect;
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-6 rounded-xl relative">
        <button onClick={close} className="absolute right-3 top-3 text-xl">
          ✕
        </button>

        {step === 1 && (
          <>
            <input
              className="w-full border p-3 rounded mb-3"
              placeholder="Mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              onClick={sendOtp}
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Continue
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              className="w-full border p-3 rounded mb-3"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              Verify & Login
            </button>
          </>
        )}

        <p
          className="text-center mt-4 text-sm text-blue-600 cursor-pointer"
          onClick={() => (window.location.href = "/admin-login")}
        >
          Login as Admin
        </p>
      </div>
    </div>
  );
}
