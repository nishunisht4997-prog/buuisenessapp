import { NextResponse } from "next/server";

const MOCK_DEALS = [
  {
    id: "deal-1",
    title: "Flat 30% OFF on Luxury Spa & Full Body Massage",
    discountBadge: "30% OFF",
    couponCode: "APNASPA30",
    category: "beauty-spa",
    categoryName: "Beauty & Spa",
    originalPrice: "₹2,500",
    dealPrice: "₹1,750",
    merchantName: "Lotus Spa & Massage",
    area: "Patia, Bhubaneswar",
    phone: "+919876543214",
    expiresInHours: 6,
    claimedCount: 42,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "deal-2",
    title: "Buy 1 Get 1 Free Unlimited Buffet Lunch",
    discountBadge: "BOGO FREE",
    couponCode: "BUFFETBOGO",
    category: "restaurants",
    categoryName: "Restaurants",
    originalPrice: "₹1,200",
    dealPrice: "₹600",
    merchantName: "Barbeque Nation & Fine Dining",
    area: "Saheed Nagar, Bhubaneswar",
    phone: "+919876543212",
    expiresInHours: 4,
    claimedCount: 88,
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "deal-3",
    title: "Flat ₹500 OFF on Complete AC Servicing & Gas Refill",
    discountBadge: "₹500 OFF",
    couponCode: "ACCOOL500",
    category: "home-services",
    categoryName: "Home Services",
    originalPrice: "₹1,499",
    dealPrice: "₹999",
    merchantName: "CoolCare AC Experts",
    area: "Jaydev Vihar, Bhubaneswar",
    phone: "+919876543216",
    expiresInHours: 8,
    claimedCount: 124,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "deal-4",
    title: "Flat 25% OFF Deluxe Hotel Room Stay",
    discountBadge: "25% OFF",
    couponCode: "STAY25",
    category: "hotels",
    categoryName: "Hotels & Stays",
    originalPrice: "₹3,200",
    dealPrice: "₹2,400",
    merchantName: "The Crown Suites & Executive Lounge",
    area: "Cuttack Road, Bhubaneswar",
    phone: "+919876543211",
    expiresInHours: 12,
    claimedCount: 35,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "deal-5",
    title: "50% OFF Annual Gym Membership + Free Trainer",
    discountBadge: "50% OFF",
    couponCode: "GYMFIT50",
    category: "gym",
    categoryName: "Gym & Fitness",
    originalPrice: "₹12,000",
    dealPrice: "₹6,000",
    merchantName: "Gold Standard Fitness Studio",
    area: "Khandagiri, Bhubaneswar",
    phone: "+919876543219",
    expiresInHours: 10,
    claimedCount: 67,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
  },
];

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let filtered = MOCK_DEALS;
    if (category && category !== "all") {
      filtered = MOCK_DEALS.filter((d) => d.category === category);
    }

    return NextResponse.json({
      success: true,
      data: filtered,
    });
  } catch (error) {
    console.error("Error fetching deals:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch deals" },
      { status: 500 }
    );
  }
}
