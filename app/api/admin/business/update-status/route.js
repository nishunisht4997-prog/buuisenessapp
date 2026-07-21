import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST: Admin → Update business status
export async function POST(req) {
  try {
    const body = await req.json();
    const { businessId, status } = body;

    if (!businessId || !status) {
      return NextResponse.json(
        { success: false, message: "Business ID and status are required" },
        { status: 400 }
      );
    }

    // ✅ Allowed statuses (MATCH YOUR UI)
    const allowedStatuses = ["PENDING", "APPROVED", "REJECTED", "BLOCKED"];

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status value" },
        { status: 400 }
      );
    }

    // 🔄 Update status
    const updatedBusiness = await prisma.business.update({
      where: {
        id: Number(businessId),
      },
      data: {
        status,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Business status updated successfully",
      data: updatedBusiness,
    });
  } catch (error) {
    console.error("ADMIN UPDATE BUSINESS STATUS ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update business status" },
      { status: 500 }
    );
  }
}
