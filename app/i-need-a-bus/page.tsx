import type { Metadata } from "next";
import Link from "next/link";
import { getListings } from "@/lib/listings";
import ListingCard from "@/components/ListingCard";

export const metadata: Metadata = {
  title: "I Need a Bus | Vehículos Para La Venta",
  description:
    "Need a bus fast? See what's currently available in Orlando, Florida - from active-fleet coaches ready to drive off the lot to parked units priced to move.",
};

export default async function INeedABusPage() {
  const active = await getListings();
  const readyNow = active.filter((l) => l.fleetStatus === "ACTIVE_FLEET");

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-zinc-50">
        I Need a Bus
      </h1>
      <p className="mb-6 max-w-2xl text-zinc-600 dark:text-zinc-400">
        If you need a vehicle in service soon, look for listings marked{" "}
        <strong>Active Fleet</strong> below - those buses are currently
        operating and can typically be inspected and driven the same week.
        Every listing includes seller-reported condition details so you know
        exactly what you&apos;re getting before you make the trip out.
      </p>
      <p className="mb-8 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Looking for something wheelchair-accessible instead? See our{" "}
        <Link
          href="/accessible-charter-bus-orlando"
          className="font-medium text-red-600"
        >
          accessible charter buses in Orlando
        </Link>
        .
      </p>

      {readyNow.length === 0 ? (
        <p className="text-zinc-500">
          No active-fleet vehicles are listed right now - check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {readyNow.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </main>
  );
}
