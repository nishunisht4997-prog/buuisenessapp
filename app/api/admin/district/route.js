import { NextResponse } from "next/server";
import prisma  from "@/lib/prisma";

// GET ALL DISTRICTS
export async function GET() {
  const districts = await prisma.district.findMany({
    include: { state: true },
    orderBy: { id: "desc" },
  });

  return NextResponse.json(districts);
}

// CREATE DISTRICT
export async function POST(req) {
  const { name, stateId } = await req.json();

  if (!name || !stateId) {
    return NextResponse.json(
      { message: "State & District required" },
      { status: 400 }
    );
  }

  const district = await prisma.district.create({
    data: {
      name,
      stateId: Number(stateId),
    },
  });

  return NextResponse.json(district);
}
