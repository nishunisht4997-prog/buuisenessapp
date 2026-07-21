import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/* ================================
   GET BUSINESS PROFILE
================================ */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Business ID missing" },
        { status: 400 }
      );
    }

    const business = await prisma.business.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
        subCategory: true,
      },
    });

    if (!business) {
      return NextResponse.json(
        { message: "Business not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: business.id,
      name: business.name,
      categoryId: business.categoryId,
      subCategoryId: business.subCategoryId,
      area: business.area,
      address: business.address,
      displayNumber: business.phone, // ✅ from DB
      whatsappNumber: business.phone, // ✅ default
      phone: business.phone,
      status: business.status,
      category: business.category,
      subCategory: business.subCategory,
    });
  } catch (error) {
    console.error("PROFILE GET ERROR:", error);
    return NextResponse.json(
      { message: "Failed to load profile" },
      { status: 500 }
    );
  }
}

/* ================================
   UPDATE BUSINESS PROFILE
================================ */
export async function PUT(req) {
  try {
    const body = await req.json();

    const {
      id,
      name,
      categoryId,
      subCategoryId,
      area,
      address,
      displayNumber,
      whatsappNumber,
    } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Business ID required" },
        { status: 400 }
      );
    }

    const updated = await prisma.business.update({
      where: { id: Number(id) },
      data: {
        name,
        categoryId: Number(categoryId),
        subCategoryId: Number(subCategoryId),
        area,
        address,
        phone: displayNumber, // store display number
        whatsappNumber,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("PROFILE UPDATE ERROR:", error);
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}
