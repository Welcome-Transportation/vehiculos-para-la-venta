import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const ids = request.nextUrl.searchParams.get("ids");
  if (!ids) return NextResponse.json([]);

  const listings = await prisma.listing.findMany({
    where: { id: { in: ids.split(",").filter(Boolean) } },
    include: { photos: { orderBy: { order: "asc" } } },
  });

  return NextResponse.json(listings);
}
