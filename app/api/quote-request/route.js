import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      businessId,
      customerId,
      customerName,
      phone,
      email,
      requirements,
      preferredDate,
      budget,
      additionalNotes,
    } = body;

    // Validate required fields
    if (!businessId || !customerName || !phone || !email || !requirements) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    // Create quote request
    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        businessId,
        customerId: customerId || null,
        customerName,
        phone,
        email,
        requirements,
        preferredDate: preferredDate ? new Date(preferredDate) : null,
        budget,
        additionalNotes,
      },
    });

    // Generate reference ID
    const referenceId = `QT-${quoteRequest.id.slice(0, 8).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      data: quoteRequest,
      referenceId,
    });
  } catch (error) {
    console.error('Error creating quote request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create quote request' },
      { status: 500 }
    );
  }
}
