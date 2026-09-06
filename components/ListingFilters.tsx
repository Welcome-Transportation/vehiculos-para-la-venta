"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";

export default function ListingFilters({ cities }: { cities: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");
  const [ada, setAda] = useState(searchParams.get("ada") === "1");
  const [bathroom, setBathroom] = useState(
    searchParams.get("bathroom") === "1"
  );
  const [bluetooth, setBluetooth] = useState(
    searchParams.get("bluetooth") === "1"
  );

  function applyFilters(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (ada) params.set("ada", "1");
    if (bathroom) params.set("bathroom", "1");
    if (bluetooth) params.set("bluetooth", "1");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form
      onSubmit={applyFilters}
      className="mb-8 flex flex-col gap-4 rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-950 sm:flex-row sm:flex-wrap sm:items-end"
    >
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          City
        </label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-zinc-900"
        >
          <option value="">All cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Min price
        </label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="$0"
          className="w-28 rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-zinc-900"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Max price
        </label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Any"
          className="w-28 rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-zinc-900"
        />
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-zinc-700 dark:text-zinc-300">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={ada}
            onChange={(e) => setAda(e.target.checked)}
          />
          ADA accessible
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={bathroom}
            onChange={(e) => setBathroom(e.target.checked)}
          />
          Working bathroom
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={bluetooth}
            onChange={(e) => setBluetooth(e.target.checked)}
          />
          Bluetooth / Wi-Fi
        </label>
      </div>

      <button
        type="submit"
        className="rounded-full bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Apply filters
      </button>
    </form>
  );
}
