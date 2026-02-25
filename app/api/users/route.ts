export const runtime = "nodejs";

import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST() {
  const user = await prisma.user.create({
    data: {
      email: `test-${Date.now()}@mail.com`,
      name: "Test",
    },
  });
  return NextResponse.json(user);
}
