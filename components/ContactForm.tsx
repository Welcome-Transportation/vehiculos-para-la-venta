"use client";

import { useActionState } from "react";
import { sendContactMessage, type ContactFormState } from "@/app/listing/[id]/actions";

const initialState: ContactFormState = { status: "idle" };

export default function ContactForm({ listingId }: { listingId: string }) {
  const action = sendContactMessage.bind(null, listingId);
  const [state, formAction, pending] = useActionState(action, initialState);

  if (state.status === "success") {
    return (
      <p className="rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-300">
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Your name
        </label>
        <input
          name="name"
          required
          className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-zinc-900"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Your email
        </label>
        <input
          type="email"
          name="email"
          required
          className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-zinc-900"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="I'm interested in this vehicle. Is it still available?"
          className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-zinc-900"
        />
      </div>
      {state.status === "error" && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
      >
        {pending ? "Sending..." : "Contact seller"}
      </button>
    </form>
  );
}
