import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  // Demo admin login (replace with DB later)
  if (email === "admin@gmail.com" && password === "123456") {
    return NextResponse.json({
      success: true,
      token: "admin-token-123",
    });
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}
