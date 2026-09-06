"use client";

import { useActionState } from "react";
import { createMigratedListing, type SellFormState } from "@/app/sell/actions";
import VehicleFields from "./VehicleFields";
import PhotoUploadPreview from "./PhotoUploadPreview";
import { FINDERS_FEE_PERCENT } from "@/lib/config";

const initialState: SellFormState = { status: "idle" };

export default function MigrateForm() {
  const [state, formAction, pending] = useActionState(
    createMigratedListing,
    initialState
  );

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <p className="rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
        A {FINDERS_FEE_PERCENT}% finder&apos;s fee is automatically added to
        the price you enter below. The original posting&apos;s URL and any
        dealer contact details (phone, email, dealer name) are{" "}
        <strong>never saved</strong> - only the vehicle&apos;s own details are
        stored.
      </p>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Original posting URL (for your reference only - not saved)
        </label>
        <input
          type="url"
          placeholder="https://example-dealer.com/listing/123"
          className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-zinc-900"
        />
      </div>

      <VehicleFields priceLabel="Original asking price (USD, before fee)" />

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Photos
        </label>
        <PhotoUploadPreview />
      </div>

      {state.status === "error" && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-full bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
      >
        {pending ? "Migrating..." : "Migrate listing"}
      </button>
    </form>
  );
}
