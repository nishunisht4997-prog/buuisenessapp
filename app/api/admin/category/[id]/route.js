import { NextResponse } from "next/server";
import prisma  from "@/lib/prisma";

/* -------------------------------
   GET Single Category
-------------------------------- */
export async function GET(req, { params }) {
  try {
    const { id } = await params; // ✅ FIXED

    if (!id) {
      return NextResponse.json({ message: "ID missing" }, { status: 400 });
    }

    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("GET CATEGORY ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch category" },
      { status: 500 }
    );
  }
}

/* -------------------------------
   UPDATE Category
-------------------------------- */
export async function PUT(req, { params }) {
  try {
    const { id } = await params; // ✅ FIX
    const { name, status } = await req.json();

    const updated = await prisma.category.update({
      where: { id: Number(id) },
      data: {
        ...(name && { name }),
        ...(status !== undefined && { status }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json(
      { message: "Failed to update category" },
      { status: 500 }
    );
  }
}


/* -------------------------------
   DELETE Category
-------------------------------- */
export async function DELETE(req, { params }) {
  try {
    const { id } = await params; // ✅ FIX

    await prisma.category.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { message: "Failed to delete category" },
      { status: 500 }
    );
  }
}
