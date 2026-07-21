import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { id } = await req.json();

    await prisma.business.update({
      where: { id: Number(id) },
      data: { status: "APPROVED" },
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { message: "Failed to approve business" },
      { status: 500 }
    );
  }
}
