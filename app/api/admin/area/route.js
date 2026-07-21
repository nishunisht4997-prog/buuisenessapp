import { NextResponse } from "next/server";
import prisma  from "@/lib/prisma";

export async function GET() {
  const areas = await prisma.area.findMany({
    include: {
      district: {
        include: { state: true },
      },
    },
    orderBy: { id: "desc" },
  });

  return NextResponse.json(areas);
}

export async function POST(req) {
  const { name, districtId } = await req.json();

  if (!name || !districtId) {
    return NextResponse.json(
      { message: "District & Area required" },
      { status: 400 }
    );
  }

  const area = await prisma.area.create({
    data: {
      name,
      districtId: Number(districtId),
    },
  });

  return NextResponse.json(area);
}
