import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// POST - Submit a quote request
export async function POST(request) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const body = await request.json();
    const {
      businessId,
      customerName,
      phone,
      email,
      requirements,
      preferredDate,
      budget,
      additionalNotes,
    } = body;

    if (!businessId || !customerName || !phone || !email || !requirements || !preferredDate || !budget) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify business exists
    const business = await prisma.business.findUnique({
      where: { id: businessId },
    });

    if (!business) {
      return NextResponse.json(
        { success: false, error: "Business not found" },
        { status: 404 }
      );
    }

    let customerId = null;

    // If user is logged in, get their ID
    if (token) {
      try {
        const decoded = verifyToken(token);
        customerId = decoded.userId;
      } catch (err) {
        // Token invalid, proceed as guest
        console.warn("Invalid token, proceeding as guest");
      }
    }

    // Create quote request
    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        businessId,
        customerId,
        customerName,
        phone,
        email,
        requirements,
        preferredDate: new Date(preferredDate),
        budget,
        additionalNotes,
      },
      include: {
        business: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    // TODO: Send email notification to business owner
    // This would require integrating with nodemailer or similar service

    return NextResponse.json({
      success: true,
      data: quoteRequest,
      message: "Quote request submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting quote request:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit quote request" },
      { status: 500 }
    );
  }
}

// GET - Fetch quote requests (for business owners/admins)
export async function GET(request) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get("businessId");
    const status = searchParams.get("status");

    // Build where clause
    const where = {};
    
    // If business owner, only show their business's requests
    if (businessId) {
      where.businessId = businessId;
    }
    
    // If customer, only show their requests
    if (decoded.role === "user") {
      where.customerId = decoded.userId;
    }
    
    if (status) {
      where.status = status;
    }

    const quoteRequests = await prisma.quoteRequest.findMany({
      where,
      include: {
        business: {
          select: {
            name: true,
            category: true,
          },
        },
        customer: customerId ? {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        } : false,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: quoteRequests,
    });
  } catch (error) {
    console.error("Error fetching quote requests:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch quote requests" },
      { status: 500 }
    );
  }
}
