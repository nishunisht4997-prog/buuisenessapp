import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { businessId } = body;

    // For now, we'll use a dummy userId since we don't have auth
    // In production, get userId from session/token
    const userId = 'user-placeholder'; 

    // Check if already bookmarked
    const existing = await prisma.bookmark.findUnique({
      where: {
        userId_businessId: {
          userId,
          businessId,
        },
      },
    });

    if (existing) {
      // If already bookmarked, remove it (toggle behavior)
      await prisma.bookmark.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ success: true, bookmarked: false });
    }

    // Create new bookmark
    const bookmark = await prisma.bookmark.create({
      data: {
        userId,
        businessId,
      },
    });

    return NextResponse.json({ success: true, bookmarked: true, bookmark });
  } catch (error) {
    console.error('Error creating bookmark:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create bookmark' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    // For now, use dummy userId
    const userId = 'user-placeholder';

    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
      include: {
        business: true,
      },
    });

    return NextResponse.json({ success: true, data: bookmarks });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookmarks' },
      { status: 500 }
    );
  }
}
