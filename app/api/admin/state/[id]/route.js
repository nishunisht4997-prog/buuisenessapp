import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";

// GET SINGLE STATE
export async function GET(req, { params }) {
  const { id } = await params;

  const state = await prisma.state.findUnique({
    where: { id: Number(id) },
  });

  return NextResponse.json(state);
}

// UPDATE STATE
export async function PUT(req, { params }) {
  const { id } = await params;
  const { name, status } = await req.json();

  const updated = await prisma.state.update({
    where: { id: Number(id) },
    data: {
      ...(name && { name }),
      ...(status !== undefined && { status }),
    },
  });

  return NextResponse.json(updated);
}

// DELETE STATE
export async function DELETE(req, { params }) {
  const { id } = await params;

  await prisma.state.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ success: true });
}
