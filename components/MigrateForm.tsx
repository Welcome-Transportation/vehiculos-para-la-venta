"use client";

import { useActionState, useState } from "react";
import { createMigratedListing, type SellFormState } from "@/app/sell/actions";
import { fetchListingFromUrl, type ScrapeState } from "@/app/sell/scrape";
import VehicleFields, { type VehicleFieldDefaults } from "./VehicleFields";
import PhotoUploadPreview from "./PhotoUploadPreview";
import { FINDERS_FEE_PERCENT } from "@/lib/config";

const initialSellState: SellFormState = { status: "idle" };
const initialScrapeState: ScrapeState = { status: "idle" };

export default function MigrateForm() {
  const [sellState, formAction, pending] = useActionState(
    createMigratedListing,
    initialSellState
  );
  const [scrapeState, scrapeAction, scraping] = useActionState(
    fetchListingFromUrl,
    initialScrapeState
  );

  const [sourceUrl, setSourceUrl] = useState("");
  const [sellerContactPrivate, setSellerContactPrivate] = useState("");
  const [fetchedPhotos, setFetchedPhotos] = useState<string[]>([]);

  const defaults: VehicleFieldDefaults | undefined =
    scrapeState.status === "success"
      ? {
          title: scrapeState.data.title,
          description: scrapeState.data.description,
          price: scrapeState.data.priceGuess ?? undefined,
          isAdaAccessible: scrapeState.data.features.isAdaAccessible,
          hasSeatBelts: scrapeState.data.features.hasSeatBelts,
          hasTVs: scrapeState.data.features.hasTVs,
          hasPASystem: scrapeState.data.features.hasPASystem,
          hasBluetooth: scrapeState.data.features.hasBluetooth,
          hasUSBPorts: scrapeState.data.features.hasUSBPorts,
          hasWorkingBathroom: scrapeState.data.features.hasWorkingBathroom,
        }
      : undefined;

  // Populate the private contact field / photo list once, right after a
  // successful fetch, without fighting the user's own subsequent edits.
  if (
    scrapeState.status === "success" &&
    fetchedPhotos.length === 0 &&
    scrapeState.data.photos.length > 0
  ) {
    setFetchedPhotos(scrapeState.data.photos);
  }
  if (
    scrapeState.status === "success" &&
    !sellerContactPrivate &&
    scrapeState.data.sellerContactGuess
  ) {
    setSellerContactPrivate(scrapeState.data.sellerContactGuess);
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
        A {FINDERS_FEE_PERCENT}% finder&apos;s fee is automatically added to
        the price below. The original URL and seller contact are kept{" "}
        <strong>private</strong> (never shown on the public listing) so you
        can follow up and broker the sale.
      </p>

      <form action={scrapeAction} className="flex flex-col gap-2">
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Paste the listing URL from the other site
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            name="sourceUrl"
            required
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            placeholder="https://example-dealer.com/listing/123"
            className="flex-1 rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-zinc-900"
          />
          <button
            type="submit"
            disabled={scraping || !sourceUrl}
            className="rounded-md border border-black/10 px-4 py-2 text-sm font-medium hover:border-red-600 hover:text-red-600 disabled:opacity-50 dark:border-white/20"
          >
            {scraping ? "Fetching..." : "Fetch details"}
          </button>
        </div>
        {scrapeState.status === "error" && (
          <p className="text-sm text-red-600">{scrapeState.message}</p>
        )}
        {scrapeState.status === "success" && (
          <p className="text-sm text-green-700 dark:text-green-400">
            Pulled {scrapeState.data.photos.length} photo(s) and pre-filled
            what we could find from {scrapeState.data.sourceHostname}. Review
            everything below before submitting.
          </p>
        )}
      </form>

      <form
        key={scrapeState.status === "success" ? scrapeState.data.title : "empty"}
        action={formAction}
        className="flex flex-col gap-3"
      >
        <input type="hidden" name="sourceUrl" value={sourceUrl} />
        <input
          type="hidden"
          name="fetchedPhotos"
          value={JSON.stringify(fetchedPhotos)}
        />

        <VehicleFields priceLabel="Original asking price (USD, before fee)" defaults={defaults} />

        {fetchedPhotos.length > 0 && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Photos pulled from the source page
            </label>
            <div className="flex flex-wrap gap-2">
              {fetchedPhotos.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="h-20 w-28 rounded-md object-cover"
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
            Add more photos manually (optional)
          </label>
          <PhotoUploadPreview />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
            Original seller contact (private - for your reference only, never
            shown publicly)
          </label>
          <textarea
            name="sellerContactPrivate"
            rows={2}
            value={sellerContactPrivate}
            onChange={(e) => setSellerContactPrivate(e.target.value)}
            placeholder="Phone, email, dealer name..."
            className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-zinc-900"
          />
        </div>

        {sellState.status === "error" && (
          <p className="text-sm text-red-600">{sellState.message}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 rounded-full bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
        >
          {pending ? "Migrating..." : "Migrate listing"}
        </button>
      </form>
    </div>
  );
}
