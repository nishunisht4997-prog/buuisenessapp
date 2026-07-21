import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const business = await prisma.business.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        category: true,
        subCategory: true,
        description: true,
        phone: true,
        email: true,
        website: true,
        area: true,
        district: true,
        state: true,
        pincode: true,
        isVerified: true,
        operatingHours: true,
        amenities: true,
        photos: true,
        locationLat: true,
        locationLng: true,
        averageRating: true,
        totalReviews: true,
        priceLevel: true,
      },
    });

    if (!business) {
      return NextResponse.json(
        { success: false, error: "Business not found" },
        { status: 404 }
      );
    }

    // Determine if currently open
    const isOpenNow = () => {
      if (!business.operatingHours) return false;
      
      const now = new Date();
      const day = now.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      
      const hours = business.operatingHours[day];
      if (!hours) return false;
      
      const [open, close] = hours.split("-").map(h => {
        const [hours, mins] = h.trim().split(":").map(Number);
        return hours * 60 + mins;
      });
      
      return currentTime >= open && currentTime <= close;
    };

    return NextResponse.json({
      success: true,
      data: {
        ...business,
        isOpen: isOpenNow(),
      },
    });
  } catch (error) {
    console.error("Error fetching business quick view:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch business details" },
      { status: 500 }
    );
  }
}
