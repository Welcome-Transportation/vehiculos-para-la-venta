"use client";

import { useEffect, useState } from "react";
import type { Listing, Photo } from "@prisma/client";
import ListingCard from "@/components/ListingCard";

const STORAGE_KEY = "vptv:favorites";

export default function FavoritesPage() {
  const [listings, setListings] = useState<(Listing & { photos: Photo[] })[]>(
    []
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let ids: string[] = [];
    try {
      ids = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      ids = [];
    }

    if (ids.length === 0) {
      setLoaded(true);
      return;
    }

    fetch(`/api/listings?ids=${ids.join(",")}`)
      .then((res) => res.json())
      .then((data) => setListings(data))
      .finally(() => setLoaded(true));
  }, []);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-zinc-50">
        Your Favorites
      </h1>

      {!loaded ? (
        <p className="text-zinc-500">Loading...</p>
      ) : listings.length === 0 ? (
        <p className="rounded-xl border border-dashed border-black/10 p-8 text-center text-zinc-500 dark:border-white/10">
          You haven&apos;t saved any listings yet. Browse listings and tap
          &quot;Save&quot; to add them here.
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
