import { prisma } from "./prisma";

export type ListingFilters = {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  adaOnly?: boolean;
  bathroomOnly?: boolean;
  bluetoothOnly?: boolean;
};

// Explicitly excludes originalSourceUrl / originalSellerContact - those are
// admin-only fields for migrated listings (see lib/admin.ts) and must never
// reach the public site or its client components.
const PUBLIC_LISTING_SELECT = {
  id: true,
  title: true,
  price: true,
  description: true,
  city: true,
  county: true,
  state: true,
  zipCode: true,
  latitude: true,
  longitude: true,
  mileage: true,
  isAdaAccessible: true,
  hasSeatBelts: true,
  hasTVs: true,
  hasPASystem: true,
  hasWorkingRadio: true,
  hasBluetooth: true,
  hasUSBPorts: true,
  hasWorkingBathroom: true,
  isOperable: true,
  fleetStatus: true,
  isMigrated: true,
  createdAt: true,
  sellerName: true,
  sellerPhone: true,
  sellerCompany: true,
  photos: { orderBy: { order: "asc" as const } },
} as const;

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
    select: PUBLIC_LISTING_SELECT,
    orderBy: { createdAt: "desc" },
  });
}

export function getListingById(id: string) {
  return prisma.listing.findUnique({
    where: { id },
    select: PUBLIC_LISTING_SELECT,
  });
}

export function getListingsByIds(ids: string[]) {
  return prisma.listing.findMany({
    where: { id: { in: ids } },
    select: PUBLIC_LISTING_SELECT,
  });
}

export type PublicListing = NonNullable<
  Awaited<ReturnType<typeof getListingById>>
>;

export function getCities() {
  return prisma.listing
    .findMany({ select: { city: true }, distinct: ["city"] })
    .then((rows) => rows.map((r) => r.city).sort());
}
