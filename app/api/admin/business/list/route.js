import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET: Admin → Get all businesses (Dashboard + Listing)
export async function GET() {
  try {
    const businesses = await prisma.business.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        businessCode: true,
        status: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            phone: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: businesses,
    });
  } catch (error) {
    console.error("ADMIN BUSINESS LIST ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load businesses" },
      { status: 500 }
    );
  }
}
