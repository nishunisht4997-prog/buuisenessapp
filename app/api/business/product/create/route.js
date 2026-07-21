import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const businessId = Number(formData.get("businessId"));
    const name = formData.get("name");
    const description = formData.get("description");
    const quantity = Number(formData.get("quantity"));
    const costPerPiece = Number(formData.get("costPerPiece"));
    const totalCost = Number(formData.get("totalCost"));

    if (!businessId || !name || !quantity || !costPerPiece) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // IMAGE UPLOAD
    let imagePath = null;
    const image = formData.get("image");

    if (image && image.name) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      const fileName = `${Date.now()}-${image.name}`;
      await fs.writeFile(path.join(uploadDir, fileName), buffer);

      imagePath = `/uploads/${fileName}`;
    }

    const product = await prisma.product.create({
      data: {
        businessId,
        name,
        description,
        quantity,
        costPerPiece,
        totalCost,
        image: imagePath,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
