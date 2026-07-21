import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// /api/auth/send-otp
export async function POST(req) {
  const { phone } = await req.json();

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await prisma.otp.deleteMany({ where: { phone } });

  await prisma.otp.create({
    data: {
      phone,
      otp,
      used: false,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    },
  });

  return NextResponse.json({
    success: true,
    otp, // DEV only
  });
}
