import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { id: "desc" },
  });

  return Response.json(categories);
}

export async function POST(req) {
  const { name } = await req.json();

  if (!name) {
    return Response.json({ message: "Name is required" }, { status: 400 });
  }

  const category = await prisma.category.create({
    data: { name },
  });

  return Response.json(category);
}
