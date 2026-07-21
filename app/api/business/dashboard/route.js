import  prisma  from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const business = await prisma.business.findUnique({
    where: { id: Number(id) },
    include: {
      category: true,
      subCategory: true,
      state: true,
      district: true,
      area: true,
    },
  });

  return NextResponse.json(business);
}
