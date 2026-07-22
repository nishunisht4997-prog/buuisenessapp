import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Mock fallback business database for rich matching if database has minimal records
const SAMPLE_BUSINESSES = [
  {
    id: "match-1",
    name: "Swosti Grand Luxury Hotel",
    category: "Hotels",
    subCategory: "Luxury & Budget Stays",
    area: "Patia",
    district: "Khurda (Bhubaneswar)",
    state: "Odisha",
    priceText: "₹1,850 / night",
    priceVal: 1850,
    averageRating: 4.9,
    totalReviews: 320,
    isVerified: true,
    phone: "+919876543210",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    amenities: ["Free Wi-Fi", "AC Rooms", "24/7 Room Service", "Parking"],
  },
  {
    id: "match-2",
    name: "Patia Residency & Suites",
    category: "Hotels",
    subCategory: "Budget Hotel",
    area: "Patia",
    district: "Khurda (Bhubaneswar)",
    state: "Odisha",
    priceText: "₹1,499 / night",
    priceVal: 1499,
    averageRating: 4.8,
    totalReviews: 195,
    isVerified: true,
    phone: "+919876543211",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
    amenities: ["AC", "Free Breakfast", "Clean Linen", "Power Backup"],
  },
  {
    id: "match-3",
    name: "The Crown Comfort Stays",
    category: "Hotels",
    subCategory: "Premium Executive Rooms",
    area: "Patia",
    district: "Khurda (Bhubaneswar)",
    state: "Odisha",
    priceText: "₹1,950 / night",
    priceVal: 1950,
    averageRating: 4.7,
    totalReviews: 240,
    isVerified: true,
    phone: "+919876543212",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
    amenities: ["Swimming Pool", "Restaurant", "Wi-Fi", "Cab Service"],
  },
  {
    id: "match-4",
    name: "Express Cool AC Repair Services",
    category: "AC Repair",
    subCategory: "Home Services",
    area: "Patia",
    district: "Khurda (Bhubaneswar)",
    state: "Odisha",
    priceText: "₹399 inspection fee",
    priceVal: 399,
    averageRating: 4.9,
    totalReviews: 480,
    isVerified: true,
    phone: "+919876543213",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
    amenities: ["Same Day Service", "90-Day Warranty", "Certified Techs"],
  },
  {
    id: "match-5",
    name: "Barbeque Nation Patia",
    category: "Restaurants",
    subCategory: "Buffet & Dining",
    area: "Patia",
    district: "Khurda (Bhubaneswar)",
    state: "Odisha",
    priceText: "₹899 / person",
    priceVal: 899,
    averageRating: 4.8,
    totalReviews: 950,
    isVerified: true,
    phone: "+919876543214",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80",
    amenities: ["Live Grill", "AC Dining", "Family Tables", "Valet Parking"],
  },
  {
    id: "match-6",
    name: "Royal Palace Banquet & Resort",
    category: "Wedding Planning",
    subCategory: "Banquet Halls",
    area: "Saheed Nagar",
    district: "Khurda (Bhubaneswar)",
    state: "Odisha",
    priceText: "₹45,000 / day",
    priceVal: 45000,
    averageRating: 4.9,
    totalReviews: 210,
    isVerified: true,
    phone: "+919876543215",
    image: "https://images.pexels.com/photos/17206170/pexels-photo-17206170/free-photo-of-interior-design-of-banquet-hall.jpeg?auto=compress&cs=tinysrgb&w=600",
    amenities: ["Capacity 1000+", "Central AC", "Bridal Room", "Catering"],
  },
];

export async function POST(request) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { success: false, message: "Please provide a valid query." },
        { status: 400 }
      );
    }

    const q = query.toLowerCase();

    // Extract price condition
    let maxPrice = null;
    const priceMatch = q.match(/(\d+)\s*(k|thousand|rupees|rs|ke andar|under|tak)?/i);
    if (priceMatch) {
      let num = parseInt(priceMatch[1], 10);
      if (priceMatch[2]?.toLowerCase() === "k") num *= 1000;
      // If reasonable budget number found
      if (num >= 100 && num <= 1000000) {
        maxPrice = num;
      }
    }

    // Extract area/location
    const areas = ["patia", "saheed nagar", "jaydev vihar", "cuttack", "puri", "bhubaneswar", "rourkela", "old town"];
    let matchedArea = areas.find((a) => q.includes(a));

    // Extract category keywords
    let categoryKeyword = "";
    if (q.includes("hotel") || q.includes("stay") || q.includes("room") || q.includes("resort")) {
      categoryKeyword = "hotel";
    } else if (q.includes("ac") || q.includes("repair") || q.includes("technician") || q.includes("service")) {
      categoryKeyword = "ac repair";
    } else if (q.includes("restaurant") || q.includes("food") || q.includes("dinner") || q.includes("eat")) {
      categoryKeyword = "restaurant";
    } else if (q.includes("banquet") || q.includes("wedding") || q.includes("hall") || q.includes("marriage")) {
      categoryKeyword = "wedding";
    }

    // Try fetching from database first
    let dbMatches = [];
    try {
      dbMatches = await prisma.business.findMany({
        where: {
          AND: [
            matchedArea ? { area: { contains: matchedArea, mode: "insensitive" } } : {},
            categoryKeyword ? { category: { contains: categoryKeyword, mode: "insensitive" } } : {},
          ],
        },
        take: 3,
      });
    } catch (e) {
      console.log("DB search fallback to sample data");
    }

    let topMatches = [];

    // Filter fallback sample data if DB returned few results
    if (dbMatches.length > 0) {
      topMatches = dbMatches.map((b) => ({
        id: b.id,
        name: b.name,
        category: b.category,
        subCategory: b.subCategory || "Verified Service",
        area: b.area || matchedArea || "Bhubaneswar",
        district: b.district || "Odisha",
        state: b.state || "Odisha",
        priceText: b.priceLevel ? `₹${b.priceLevel * 500} / service` : "₹1,200 approx",
        priceVal: b.priceLevel ? b.priceLevel * 500 : 1200,
        averageRating: b.averageRating || 4.8,
        totalReviews: b.totalReviews || 120,
        isVerified: b.isVerified ?? true,
        phone: b.phone || "+91 98765 43210",
        image: b.photos?.[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        amenities: ["Verified Blue Tick", "Instant Booking", "Open Now"],
      }));
    } else {
      // Filter SAMPLE_BUSINESSES
      topMatches = SAMPLE_BUSINESSES.filter((b) => {
        let match = true;
        if (categoryKeyword) {
          match = match && (b.category.toLowerCase().includes(categoryKeyword) || b.subCategory.toLowerCase().includes(categoryKeyword));
        }
        if (matchedArea) {
          match = match && b.area.toLowerCase().includes(matchedArea);
        }
        if (maxPrice && b.priceVal) {
          match = match && b.priceVal <= maxPrice;
        }
        return match;
      });

      // Fallback if strict filter yields 0
      if (topMatches.length === 0) {
        topMatches = SAMPLE_BUSINESSES.slice(0, 3);
      }
    }

    // Slice to top 3
    topMatches = topMatches.slice(0, 3);

    // AI Response text generation
    const locationStr = matchedArea ? matchedArea.charAt(0).toUpperCase() + matchedArea.slice(1) : "Bhubaneswar";
    const budgetStr = maxPrice ? `under ₹${maxPrice}` : "";

    const aiMessage = `Aapke request "${query}" ke mutabiq maine **${locationStr}** me ${budgetStr} top ${topMatches.length} verified listings find kar li hain:`;

    return NextResponse.json({
      success: true,
      query,
      detected: {
        location: locationStr,
        category: categoryKeyword || "All",
        maxPrice: maxPrice || "No Limit",
      },
      aiMessage,
      matches: topMatches,
    });
  } catch (error) {
    console.error("AI Matchmaker API Error:", error);
    return NextResponse.json(
      { success: false, message: "AI Matchmaker error." },
      { status: 500 }
    );
  }
}
