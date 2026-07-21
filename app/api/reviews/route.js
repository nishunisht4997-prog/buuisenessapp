import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { businessId, userId, rating, title, comment, photos, categories } = body;

    // Validate required fields
    if (!businessId || !userId || !rating || !title || !comment) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Check if user already reviewed this business
    const existingReview = await prisma.review.findUnique({
      where: {
        businessId_userId: {
          businessId,
          userId,
        },
      },
    });

    if (existingReview) {
      return NextResponse.json(
        { success: false, error: 'You have already reviewed this business' },
        { status: 400 }
      );
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        businessId,
        userId,
        rating,
        title,
        comment,
        photos: photos || [],
        categories: categories || null,
      },
    });

    // Update business average rating and total reviews
    const allReviews = await prisma.review.findMany({
      where: { businessId },
    });

    const totalReviews = allReviews.length;
    const averageRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

    await prisma.business.update({
      where: { id: businessId },
      data: {
        averageRating,
        totalReviews,
      },
    });

    return NextResponse.json({ success: true, data: review });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create review' },
      { status: 500 }
    );
  }
}
