import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";

// GET ALL STATES
export async function GET() {
  const states = await prisma.state.findMany({
    orderBy: { id: "desc" },
  });

  return NextResponse.json(states);
}

// CREATE STATE
export async function POST(req) {
  const { name } = await req.json();

  if (!name) {
    return NextResponse.json(
      { message: "State name is required" },
      { status: 400 }
    );
  }

  const state = await prisma.state.create({
    data: {
      name,
      status: true,
    },
  });

  return NextResponse.json(state);
}
