import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const business = await prisma.business.findUnique({
      where: { id },
    });

    if (!business) {
      return NextResponse.json(
        { success: false, error: 'Business not found' },
        { status: 404 }
      );
    }

    // Determine if business is open now
    let isOpen = false;
    if (business.operatingHours) {
      const now = new Date();
      const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      const currentTime = now.toTimeString().slice(0, 5); // HH:mm format
      
      const hours = business.operatingHours[currentDay];
      if (hours) {
        const [open, close] = hours.split('-');
        isOpen = currentTime >= open && currentTime <= close;
      }
    }

    // Format address
    const address = {
      street: business.address || '',
      area: business.area || '',
      district: business.district || '',
      state: business.state || '',
      pincode: business.pincode || '',
    };

    return NextResponse.json({
      success: true,
      data: {
        id: business.id,
        name: business.name,
        category: business.category,
        subCategory: business.subCategory,
        rating: business.averageRating || 0,
        reviewCount: business.totalReviews || 0,
        operatingHours: business.operatingHours,
        amenities: business.amenities || [],
        address,
        location: {
          lat: business.locationLat,
          lng: business.locationLng,
        },
        photos: business.photos || [],
        phone: business.phone,
        isOpen,
        isVerified: business.isVerified,
        description: business.description,
      },
    });
  } catch (error) {
    console.error('Error fetching business quick view:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch business details' },
      { status: 500 }
    );
  }
}
