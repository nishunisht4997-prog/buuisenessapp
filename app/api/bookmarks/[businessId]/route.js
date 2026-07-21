import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function DELETE(request, { params }) {
  try {
    const { businessId } = params;

    // For now, use dummy userId
    const userId = 'user-placeholder';

    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_businessId: {
          userId,
          businessId,
        },
      },
    });

    if (!bookmark) {
      return NextResponse.json(
        { success: false, error: 'Bookmark not found' },
        { status: 404 }
      );
    }

    await prisma.bookmark.delete({
      where: { id: bookmark.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete bookmark' },
      { status: 500 }
    );
  }
}
