import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    // ✅ ALWAYS READ FORMDATA (because image upload exists)
    const formData = await req.formData();

    const userId = Number(formData.get("userId"));
    const phone = formData.get("phone");
    const businessName = formData.get("businessName");

    const categoryId = Number(formData.get("categoryId"));
    const subCategoryId = Number(formData.get("subCategoryId"));
    const stateId = Number(formData.get("stateId"));
    const districtId = Number(formData.get("districtId"));
    const areaId = Number(formData.get("areaId"));
    const address = formData.get("address");

    // 🛑 STRICT VALIDATION (CLEAR & SAFE)
    if (
      !userId ||
      !phone ||
      !businessName ||
      !categoryId ||
      !subCategoryId ||
      !stateId ||
      !districtId ||
      !areaId
    ) {
      console.log("Missing fields:", {
        userId,
        phone,
        businessName,
        categoryId,
        subCategoryId,
        stateId,
        districtId,
        areaId,
      });

      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 📸 IMAGE UPLOAD (OPTIONAL)
    let imagePath = null;
    const imageFile = formData.get("storeImage");

    if (imageFile && imageFile.name) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      const fileName = `${Date.now()}-${imageFile.name}`;
      await fs.writeFile(path.join(uploadDir, fileName), buffer);

      imagePath = `/uploads/${fileName}`;
    }

    // 🔍 CHECK EXISTING BUSINESS (BY PHONE)
    const existingBusiness = await prisma.business.findFirst({
      where: { phone },
    });

    // 🔄 UPDATE EXISTING
    if (existingBusiness) {
      const updated = await prisma.business.update({
        where: { id: existingBusiness.id },
        data: {
          name: businessName,
          categoryId,
          subCategoryId,
          stateId,
          districtId,
          areaId,
          address,
          ...(imagePath && { storeImage: imagePath }),
        },
      });

      return NextResponse.json({
        success: true,
        businessId: updated.id,
        message: "Business updated successfully",
      });
    }

    // ➕ CREATE NEW
    const business = await prisma.business.create({
      data: {
        businessCode: "BIZ" + Date.now(),
        userId,
        phone,
        name: businessName,
        categoryId,
        subCategoryId,
        stateId,
        districtId,
        areaId,
        address,
        storeImage: imagePath,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      businessId: business.id,
    });
  } catch (error) {
    console.error("❌ BUSINESS CREATE ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
