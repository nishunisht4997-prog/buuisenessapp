import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// /api/auth/send-otp
export async function POST(req) {
  try {
    const { phone } = await req.json();

    const otp = "123456"; // Universal Master Demo OTP

    try {
      await prisma.otp.deleteMany({ where: { phone } });
      await prisma.otp.create({
        data: {
          phone,
          otp,
          used: false,
          expiresAt: new Date(Date.now() + 15 * 60 * 1000),
        },
      });
    } catch (e) {
      console.warn("DB OTP Save notice (Master Demo Active):", e.message);
    }

    return NextResponse.json({
      success: true,
      otp: "123456",
      message: "Demo OTP: 123456",
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      otp: "123456",
      message: "Demo OTP: 123456",
    });
  }
}
