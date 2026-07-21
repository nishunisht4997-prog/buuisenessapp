import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const keyword = searchParams.get("keyword") || "";
    const category = searchParams.get("category") || "";
    const location = searchParams.get("location") || "";
    
    // New filters
    const minRating = searchParams.get("minRating");
    const verifiedOnly = searchParams.get("verifiedOnly") === "true";
    const openNow = searchParams.get("openNow") === "true";
    const sortBy = searchParams.get("sortBy") || "relevance";
    const priceLevel = searchParams.get("priceLevel");

    // Build where clause
    const where = {
      AND: [],
    };

    // Keyword search
    if (keyword) {
      where.AND.push({
        OR: [
          { name: { contains: keyword, mode: "insensitive" } },
          { description: { contains: keyword, mode: "insensitive" } },
          { category: { contains: keyword, mode: "insensitive" } },
        ],
      });
    }

    // Category filter
    if (category) {
      where.AND.push({
        category: { contains: category, mode: "insensitive" },
      });
    }

    // Location filter
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

    // Verified only filter
    if (verifiedOnly) {
      where.AND.push({
        isVerified: true,
      });
    }

    // Price level filter
    if (priceLevel) {
      where.AND.push({
        priceLevel: parseInt(priceLevel),
      });
    }

    // Open now filter
    if (openNow) {
      const now = new Date();
      const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      const currentTime = now.toTimeString().slice(0, 5); // HH:mm format
      
      where.AND.push({
        operatingHours: {
          not: null,
        },
      });
    }

    // Build order by clause
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
        // Would require user location - for now use relevance
        orderBy = { createdAt: "desc" };
        break;
      default:
        orderBy = { createdAt: "desc" };
    }

    const businesses = await prisma.business.findMany({
      where: where.AND.length > 0 ? where : {},
      orderBy,
    });

    // Filter for open now after fetching (since it requires complex logic)
    let results = businesses;
    if (openNow) {
      const now = new Date();
      const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      const currentTime = now.toTimeString().slice(0, 5);
      
      results = businesses.filter((business) => {
        if (!business.operatingHours) return false;
        const hours = business.operatingHours[currentDay];
        if (!hours) return false;
        const [open, close] = hours.split('-');
        return currentTime >= open && currentTime <= close;
      });
    }

    const formattedResults = results.map((b) => ({
      id: b.id,
      name: b.name,
      category: b.category,
      subCategory: b.subCategory,
      area: b.area,
      district: b.district,
      state: b.state,
      description: b.description?.trim() || "No description available",
      averageRating: b.averageRating,
      totalReviews: b.totalReviews,
      isVerified: b.isVerified,
      priceLevel: b.priceLevel,
      phone: b.phone,
      photos: b.photos,
      amenities: b.amenities,
    }));

    return NextResponse.json({
      success: true,
      count: formattedResults.length,
      data: formattedResults,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
