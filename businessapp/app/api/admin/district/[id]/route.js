import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";

// GET SINGLE
export async function GET(req, { params }) {
  const { id } = await params;

  const district = await prisma.district.findUnique({
    where: { id: Number(id) },
  });

  return NextResponse.json(district);
}

// UPDATE
export async function PUT(req, { params }) {
  const { id } = await params;
  const { name, stateId } = await req.json();

  const updated = await prisma.district.update({
    where: { id: Number(id) },
    data: { name, stateId },
  });

  return NextResponse.json(updated);
}

// DELETE
export async function DELETE(req, { params }) {
  const { id } = await params;

  await prisma.district.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ success: true });
}
