"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "vptv:favorites";

function readFavorites(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeFavorites(ids: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // localStorage unavailable (private browsing, etc.) - ignore
  }
}

export default function FavoriteButton({ listingId }: { listingId: string }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(readFavorites().includes(listingId));
  }, [listingId]);

  function toggle() {
    const current = readFavorites();
    const next = current.includes(listingId)
      ? current.filter((id) => id !== listingId)
      : [...current, listingId];
    writeFavorites(next);
    setIsFavorite(next.includes(listingId));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={
        isFavorite
          ? "flex items-center gap-2 rounded-full border border-red-600 bg-red-600 px-4 py-2 text-sm font-medium text-white"
          : "flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-black hover:border-red-600 hover:text-red-600 dark:border-white/20 dark:text-zinc-50"
      }
    >
      <span aria-hidden>{isFavorite ? "♥" : "♡"}</span>
      {isFavorite ? "Saved" : "Save"}
    </button>
  );
}
