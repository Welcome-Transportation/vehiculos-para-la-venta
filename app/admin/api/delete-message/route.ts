import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET-based admin utility (protected by the same /admin/:path* Basic Auth
// middleware) so a message can be removed with a plain authenticated curl
// request, without fighting a browser's Basic Auth + fetch/Server Action
// interaction.
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await prisma.contactMessage.delete({ where: { id } });
  return NextResponse.json({ deleted: id });
}
