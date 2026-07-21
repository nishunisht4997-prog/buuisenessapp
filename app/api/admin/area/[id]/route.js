import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";

export async function GET(req, { params }) {
  const { id } = params;

  const area = await prisma.area.findUnique({
    where: { id: Number(id) },
  });

  return NextResponse.json(area);
}

export async function PUT(req, { params }) {
  const { id } = params;
  const { name, districtId } = await req.json();

  const updated = await prisma.area.update({
    where: { id: Number(id) },
    data: { name, districtId },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  const { id } = params;

  await prisma.area.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ success: true });
}
