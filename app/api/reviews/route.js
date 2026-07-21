import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// POST - Submit a review
export async function POST(request) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    const body = await request.json();
    const { businessId, rating, title, comment, photos, categories } = body;

    if (!businessId || !rating || !title || !comment) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Check if user already reviewed this business
    const existingReview = await prisma.review.findUnique({
      where: {
        userId_businessId: {
          userId: decoded.userId,
          businessId,
        },
      },
    });

    if (existingReview) {
      return NextResponse.json(
        { success: false, error: "You have already reviewed this business" },
        { status: 400 }
      );
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        businessId,
        userId: decoded.userId,
        rating,
        title,
        comment,
        photos: photos || [],
        categories: categories || null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Update business average rating
    const allReviews = await prisma.review.findMany({
      where: { businessId },
      select: { rating: true },
    });

    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / allReviews.length;

    await prisma.business.update({
      where: { id: businessId },
      data: {
        averageRating,
        totalReviews: allReviews.length,
      },
    });

    return NextResponse.json({ 
      success: true, 
      data: review,
      message: "Review submitted successfully" 
    });
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit review" },
      { status: 500 }
    );
  }
}

// GET - Fetch reviews for a business
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get("businessId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const sortBy = searchParams.get("sortBy") || "newest";

    if (!businessId) {
      return NextResponse.json(
        { success: false, error: "Business ID is required" },
        { status: 400 }
      );
    }

    const skip = (page - 1) * limit;

    const orderBy = {
      newest: { createdAt: "desc" },
      highest: { rating: "desc" },
      lowest: { rating: "asc" },
      helpful: { helpfulVotes: "desc" },
    }[sortBy] || { createdAt: "desc" };

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: { businessId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.review.count({ where: { businessId } }),
    ]);

    return NextResponse.json({
      success: true,
      data: reviews,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
