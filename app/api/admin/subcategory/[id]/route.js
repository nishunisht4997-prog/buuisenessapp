import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/* ========================
   GET SINGLE SUBCATEGORY
======================== */
export async function GET(req, { params }) {
  const { id } = params;

  const data = await prisma.subCategory.findUnique({
    where: { id: Number(id) },
    include: {
      category: true, // ✅ REQUIRED
    },
  });

  return NextResponse.json(data);
}

/* ========================
   UPDATE SUBCATEGORY
======================== */
export async function PUT(req, { params }) {
  const { id } = params;
  const { name, categoryId, status } = await req.json();

  const updated = await prisma.subCategory.update({
    where: { id: Number(id) },
    data: {
      name,
      categoryId: Number(categoryId), // ✅ FIX
      status: Boolean(status),
    },
    include: {
      category: true, // ✅ IMPORTANT
    },
  });

  return NextResponse.json(updated);
}

/* ========================
   DELETE SUBCATEGORY
======================== */
export async function DELETE(req, { params }) {
  const { id } = params;

  await prisma.subCategory.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ success: true });
}
