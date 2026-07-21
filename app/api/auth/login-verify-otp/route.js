import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { phone, otp } = await req.json();

  const validOtp = await prisma.otp.findFirst({
    where: {
      phone,
      otp,
      used: false,
      expiresAt: { gt: new Date() },
    },
  });

  if (!validOtp) {
    return NextResponse.json({
      success: false,
      message: "Invalid OTP",
    });
  }

  await prisma.otp.update({
    where: { id: validOtp.id },
    data: { used: true },
  });

  // 🔍 CHECK USER
  let user = await prisma.user.findUnique({
    where: { phone },
  });

  // 🆕 CASE 3 — NEW USER → CREATE USER
  if (!user) {
    user = await prisma.user.create({
      data: { phone },
    });
  }

  // 🔍 CHECK BUSINESS
  const business = await prisma.business.findFirst({
    where: { userId: user.id },
  });

  // 🟢 CASE 1 — USER + BUSINESS
  if (business) {
    return NextResponse.json({
      success: true,
      userId: user.id,
      businessId: business.id,
      redirect: "/business/dashboard",
    });
  }

  // 🟡 CASE 2 & CASE 3 — USER BUT NO BUSINESS
  return NextResponse.json({
    success: true,
    userId: user.id,
    redirect: "/free-listing/register",
  });
}
