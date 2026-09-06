import { getCities, getListings } from "@/lib/listings";
import ListingCard from "@/components/ListingCard";
import ListingFilters from "@/components/ListingFilters";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;

  const [listings, cities] = await Promise.all([
    getListings({
      city: params.city || undefined,
      minPrice: params.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
      adaOnly: params.ada === "1",
      bathroomOnly: params.bathroom === "1",
      bluetoothOnly: params.bluetooth === "1",
    }),
    getCities(),
  ]);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-black dark:text-zinc-50">
        Buses & Charter Buses For Sale
      </h1>
      <p className="mb-6 text-zinc-600 dark:text-zinc-400">
        Browse commercial transport vehicles for sale across Utah.
      </p>

      <ListingFilters cities={cities} />

      {listings.length === 0 ? (
        <p className="rounded-xl border border-dashed border-black/10 p-8 text-center text-zinc-500 dark:border-white/10">
          No listings match your filters right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </main>
  );
}
