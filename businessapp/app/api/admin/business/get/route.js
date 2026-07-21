import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Business ID is required" },
        { status: 400 }
      );
    }

    const business = await prisma.business.findUnique({
      where: { id: Number(id) },
       include: {
        user: {
          select: {
            id: true,
            phone: true,
            isProfileCompleted: true,
          },
        },
        category: true,
        subCategory: true,
        state: true,
        district: true,
        area: true,
      },
    });

    if (!business) {
      return NextResponse.json(
        { success: false, message: "Business not found" },
        { status: 404 }
      );
    }

        return NextResponse.json({
      success: true,
      data: business,
    });
  } catch (error) {
    console.error("ADMIN BUSINESS GET ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load business details" },
      { status: 500 }
    );
  }
}
