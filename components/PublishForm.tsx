"use client";

import { useActionState } from "react";
import { createListing, type SellFormState } from "@/app/sell/actions";
import VehicleFields from "./VehicleFields";
import PhotoUploadPreview from "./PhotoUploadPreview";

const initialState: SellFormState = { status: "idle" };

export default function PublishForm() {
  const [state, formAction, pending] = useActionState(
    createListing,
    initialState
  );

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <VehicleFields />

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
        {pending ? "Publishing..." : "Publish listing"}
      </button>
    </form>
  );
}
