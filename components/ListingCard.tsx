import Image from "next/image";
import Link from "next/link";
import type { Listing, Photo } from "@prisma/client";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function ListingCard({
  listing,
}: {
  listing: Listing & { photos: Photo[] };
}) {
  const cover = listing.photos[0]?.url ?? "/listings/bus-fleet.jpg";

  return (
    <Link
      href={`/listing/${listing.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-zinc-950"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={cover}
          alt={listing.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs font-medium text-white">
          {listing.fleetStatus === "ACTIVE_FLEET" ? "Active Fleet" : "Parked"}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-black dark:text-zinc-50">
          {listing.title}
        </h3>
        <p className="text-lg font-bold text-red-600">
          {currency.format(listing.price)}
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {listing.city}, {listing.state} &middot; {listing.county}
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-500">
          {listing.mileage
            ? `${listing.mileage.toLocaleString()} miles`
            : "Mileage not listed"}
        </p>
      </div>
    </Link>
  );
}
