import type { Metadata } from "next";
import { getListings } from "@/lib/listings";
import ListingCard from "@/components/ListingCard";

export const metadata: Metadata = {
  title: "Affordable Charter Buses for Sale | BusBuy",
  description:
    "Shopping on a budget? Browse the most affordable charter buses and shuttle buses for sale in Orlando, Florida, sorted by price.",
};

const BUDGET_THRESHOLD = 70000;

export default async function AffordableCharterBusPage() {
  const listings = await getListings({ maxPrice: BUDGET_THRESHOLD });
  const sorted = [...listings].sort((a, b) => a.price - b.price);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-zinc-50">
        Affordable Charter Buses
      </h1>
      <p className="mb-8 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Not every fleet needs a brand-new coach. These listings are priced
        under ${BUDGET_THRESHOLD.toLocaleString()} - a mix of active-fleet
        vehicles and parked units priced for buyers doing their own
        maintenance. Each listing is upfront about mileage and operable
        condition so there are no surprises.
      </p>

      {sorted.length === 0 ? (
        <p className="text-zinc-500">
          No listings under this price right now - check the full listings
          page for everything currently available.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </main>
  );
}
