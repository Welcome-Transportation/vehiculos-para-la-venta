"use client";

import { useState } from "react";
import PublishForm from "@/components/PublishForm";
import MigrateForm from "@/components/MigrateForm";

export default function SellPage() {
  const [mode, setMode] = useState<"publish" | "migrate">("publish");

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-zinc-50">
        List a Vehicle
      </h1>

      <div className="mb-6 flex gap-2 rounded-full bg-zinc-100 p-1 dark:bg-zinc-900">
        <button
          type="button"
          onClick={() => setMode("publish")}
          className={
            mode === "publish"
              ? "flex-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow dark:bg-zinc-800 dark:text-white"
              : "flex-1 rounded-full px-4 py-2 text-sm font-medium text-zinc-500"
          }
        >
          Publish my vehicle
        </button>
        <button
          type="button"
          onClick={() => setMode("migrate")}
          className={
            mode === "migrate"
              ? "flex-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow dark:bg-zinc-800 dark:text-white"
              : "flex-1 rounded-full px-4 py-2 text-sm font-medium text-zinc-500"
          }
        >
          Migrate existing posting
        </button>
      </div>

      {mode === "publish" ? <PublishForm /> : <MigrateForm />}
    </main>
  );
}
