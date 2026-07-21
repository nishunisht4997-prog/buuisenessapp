import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// GET - Fetch user's bookmarks
export async function GET(request) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    
    if (!token) {
      // Return bookmarks from localStorage (guest) - just return empty for now
      return NextResponse.json({ success: true, data: [] });
    }

    const decoded = verifyToken(token);
    
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: decoded.userId },
      include: {
        business: {
          select: {
            id: true,
            name: true,
            category: true,
            subCategory: true,
            area: true,
            district: true,
            state: true,
            phone: true,
            averageRating: true,
            totalReviews: true,
            photos: true,
            isVerified: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ 
      success: true, 
      data: bookmarks.map(b => b.business) 
    });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookmarks" },
      { status: 500 }
    );
  }
}

// POST - Add or remove bookmark
export async function POST(request) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const body = await request.json();
    const { businessId } = body;

    if (!businessId) {
      return NextResponse.json(
        { success: false, error: "Business ID is required" },
        { status: 400 }
      );
    }

    // If no token, return success for localStorage handling
    if (!token) {
      return NextResponse.json({ 
        success: true, 
        message: "Use localStorage for guest bookmarks",
        requiresLocalStorage: true 
      });
    }

    const decoded = verifyToken(token);

    // Check if bookmark already exists
    const existing = await prisma.bookmark.findUnique({
      where: {
        userId_businessId: {
          userId: decoded.userId,
          businessId,
        },
      },
    });

    if (existing) {
      // Remove bookmark
      await prisma.bookmark.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ 
        success: true, 
        action: "removed",
        message: "Bookmark removed" 
      });
    } else {
      // Add bookmark
      const bookmark = await prisma.bookmark.create({
        data: {
          userId: decoded.userId,
          businessId,
        },
      });
      return NextResponse.json({ 
        success: true, 
        action: "added",
        message: "Bookmark added",
        data: bookmark 
      });
    }
  } catch (error) {
    console.error("Error managing bookmark:", error);
    return NextResponse.json(
      { success: false, error: "Failed to manage bookmark" },
      { status: 500 }
    );
  }
}
