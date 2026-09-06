import { prisma } from "./prisma";

export type ListingFilters = {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  adaOnly?: boolean;
  bathroomOnly?: boolean;
  bluetoothOnly?: boolean;
};

export function getListings(filters: ListingFilters = {}) {
  return prisma.listing.findMany({
    where: {
      city: filters.city ? { contains: filters.city } : undefined,
      price: {
        gte: filters.minPrice ?? undefined,
        lte: filters.maxPrice ?? undefined,
      },
      isAdaAccessible: filters.adaOnly ? true : undefined,
      hasWorkingBathroom: filters.bathroomOnly ? true : undefined,
      hasBluetooth: filters.bluetoothOnly ? true : undefined,
    },
    include: { photos: { orderBy: { order: "asc" } } },
    orderBy: { createdAt: "desc" },
  });
}

export function getListingById(id: string) {
  return prisma.listing.findUnique({
    where: { id },
    include: { photos: { orderBy: { order: "asc" } } },
  });
}

export function getCities() {
  return prisma.listing
    .findMany({ select: { city: true }, distinct: ["city"] })
    .then((rows) => rows.map((r) => r.city).sort());
}
