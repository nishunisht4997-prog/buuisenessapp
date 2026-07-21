import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const keyword = searchParams.get("keyword") || "";
    const location = searchParams.get("location") || "";
    const minRating = searchParams.get("minRating");
    const verifiedOnly = searchParams.get("verifiedOnly") === "true";
    const openNow = searchParams.get("openNow") === "true";
    const sortBy = searchParams.get("sortBy");

    // Build where clause
    const where = {
      AND: [],
    };

    // Keyword search
    if (keyword) {
      where.AND.push({
        OR: [
          { name: { contains: keyword, mode: "insensitive" } },
          { category: { contains: keyword, mode: "insensitive" } },
          { subCategory: { contains: keyword, mode: "insensitive" } },
          { description: { contains: keyword, mode: "insensitive" } },
        ],
      });
    }

    // Location search
    if (location) {
      where.AND.push({
        OR: [
          { area: { contains: location, mode: "insensitive" } },
          { district: { contains: location, mode: "insensitive" } },
          { state: { contains: location, mode: "insensitive" } },
        ],
      });
    }

    // Rating filter
    if (minRating) {
      where.AND.push({
        averageRating: { gte: parseFloat(minRating) },
      });
    }

    // Verified filter
    if (verifiedOnly) {
      where.AND.push({ isVerified: true });
    }

    // Open Now filter
    if (openNow) {
      const now = new Date();
      const day = now.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      
      // This is a simplified check - in production, you'd need to parse operatingHours properly
      where.AND.push({
        operatingHours: {
          not: null,
        },
      });
    }

    // Build orderBy clause
    let orderBy = {};
    switch (sortBy) {
      case "highestRated":
        orderBy = { averageRating: "desc" };
        break;
      case "mostReviewed":
        orderBy = { totalReviews: "desc" };
        break;
      case "priceLow":
        orderBy = { priceLevel: "asc" };
        break;
      case "priceHigh":
        orderBy = { priceLevel: "desc" };
        break;
      case "nearest":
        // In production, this would use geospatial calculations
        orderBy = { area: "asc" };
        break;
      default:
        orderBy = { createdAt: "desc" };
    }

    const businesses = await prisma.business.findMany({
      where: where.AND.length > 0 ? where : {},
      orderBy,
      take: 50, // Limit results for performance
    });

    const results = businesses.map((b) => ({
      id: b.id,
      name: b.name,
      category: b.category,
      subCategory: b.subCategory,
      location: {
        area: b.area,
        district: b.district,
        state: b.state,
      },
      description: b.description?.trim() || "No description available",
      phone: b.phone,
      averageRating: b.averageRating,
      totalReviews: b.totalReviews,
      isVerified: b.isVerified,
      photos: b.photos,
      operatingHours: b.operatingHours,
      amenities: b.amenities,
      locationLat: b.locationLat,
      locationLng: b.locationLng,
      priceLevel: b.priceLevel,
    }));

    return NextResponse.json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
