import prisma from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const businessId = Number(formData.get("businessId"));
    const websiteUrl = formData.get("websiteUrl");
    const email = formData.get("email");
    const facebook = formData.get("facebook");
    const instagram = formData.get("instagram");

    let logoPath = null;
    const logo = formData.get("logo");

    if (logo && logo.name) {
      const bytes = await logo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      const fileName = `${Date.now()}-${logo.name}`;
      await fs.writeFile(path.join(uploadDir, fileName), buffer);

      logoPath = `/uploads/${fileName}`;
    }

    await prisma.business.update({
      where: { id: businessId },
      data: {
        websiteUrl,
        email,
        facebook,
        instagram,
        ...(logoPath && { storeImage: logoPath }),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
