import type { Metadata } from "next";
import Link from "next/link";
import { getListings } from "@/lib/listings";
import ListingCard from "@/components/ListingCard";

export const metadata: Metadata = {
  title: "I Want to Buy a Bus | Vehículos Para La Venta",
  description:
    "Buying a bus in Orlando, Florida? Browse charter buses, shuttle buses, and motorcoaches for sale, or list your own vehicle in minutes.",
};

export default async function BuyABusPage() {
  const listings = await getListings();

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-zinc-50">
        I Want to Buy a Bus
      </h1>
      <p className="mb-6 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Whether you&apos;re starting a shuttle company, expanding a tour
        fleet, or replacing an aging coach, Vehículos Para La Venta lists
        commercial buses for sale directly from Orlando-area operators. Every
        listing shows real mileage, working condition, ADA accessibility,
        and onboard amenities up front - no guesswork, no dealer
        markup games.
      </p>
      <p className="mb-8 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Not sure where to start? Filter listings by city and price on the{" "}
        <Link href="/" className="font-medium text-red-600">
          full listings page
        </Link>
        , or check out our{" "}
        <Link
          href="/affordable-charter-bus"
          className="font-medium text-red-600"
        >
          most affordable charter buses
        </Link>
        .
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {listings.slice(0, 6).map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </main>
  );
}
