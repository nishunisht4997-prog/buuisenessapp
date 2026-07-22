import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      id,
      name,
      phone,
      address,
      categoryId,
      subCategoryId,
      stateId,
      districtId,
      areaId,
      storeImage,
      operatingHours,
      priceLevel,
      status,
      isVerified,
    } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "Business ID is required" }, { status: 400 });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (subCategoryId !== undefined) updateData.subCategoryId = subCategoryId;
    if (stateId !== undefined) updateData.stateId = stateId;
    if (districtId !== undefined) updateData.districtId = districtId;
    if (areaId !== undefined) updateData.areaId = areaId;
    if (storeImage !== undefined) updateData.storeImage = storeImage;
    if (operatingHours !== undefined) updateData.operatingHours = operatingHours;
    if (priceLevel !== undefined) updateData.priceLevel = priceLevel;
    if (status !== undefined) updateData.status = status;
    if (isVerified !== undefined) updateData.isVerified = isVerified;

    const updated = await prisma.business.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Business listing updated successfully!",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating business listing:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to update business listing",
      error: error.message,
    }, { status: 500 });
  }
}
