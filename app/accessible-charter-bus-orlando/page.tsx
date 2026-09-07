import type { Metadata } from "next";
import { getListings } from "@/lib/listings";
import ListingCard from "@/components/ListingCard";

export const metadata: Metadata = {
  title: "Accessible Charter Buses in Orlando, FL | BusBuy",
  description:
    "ADA-accessible charter buses and shuttle buses for sale in Orlando, Florida, with wheelchair lifts and accessible seating for paratransit and senior transportation fleets.",
};

export default async function AccessibleCharterBusOrlandoPage() {
  const listings = await getListings({ adaOnly: true });

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-zinc-50">
        Accessible Charter Buses in Orlando, Florida
      </h1>
      <p className="mb-8 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Every listing on this page includes a wheelchair lift or ramp and
        ADA-compliant securement positions. These vehicles are well suited
        for paratransit routes, senior living communities, school districts,
        and tour operators who need to serve every rider.
      </p>

      {listings.length === 0 ? (
        <p className="text-zinc-500">
          No ADA-accessible listings right now - check back soon or browse
          all listings.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </main>
  );
}
