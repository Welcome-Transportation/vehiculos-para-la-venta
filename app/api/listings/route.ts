import { NextRequest, NextResponse } from "next/server";
import { getListingsByIds } from "@/lib/listings";

export async function GET(request: NextRequest) {
  const ids = request.nextUrl.searchParams.get("ids");
  if (!ids) return NextResponse.json([]);

  const listings = await getListingsByIds(ids.split(",").filter(Boolean));

  return NextResponse.json(listings);
}
