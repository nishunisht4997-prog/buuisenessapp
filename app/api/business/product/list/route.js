import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const businessId = searchParams.get("businessId");

    if (!businessId || isNaN(Number(businessId))) {
      return NextResponse.json([], { status: 200 });
    }

    const products = await prisma.product.findMany({
      where: { businessId: Number(businessId) },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("PRODUCT LIST ERROR:", error);
    return NextResponse.json([], { status: 200 });
  }
}
