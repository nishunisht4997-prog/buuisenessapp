import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";

// GET ALL
export async function GET() {
  const data = await prisma.subCategory.findMany({
    include: { category: true },
    orderBy: { id: "desc" },
  });

  return NextResponse.json(data);
}

// CREATE
export async function POST(req) {
  const { name, categoryId, status } = await req.json();

  if (!name || !categoryId) {
    return NextResponse.json(
      { message: "Required fields missing" },
      { status: 400 }
    );
  }

  const sub = await prisma.subCategory.create({
    data: {
      name,
      categoryId: Number(categoryId),
      status,
    },
  });

  return NextResponse.json(sub);
}
