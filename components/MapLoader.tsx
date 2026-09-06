"use client";

import dynamic from "next/dynamic";

const ListingMap = dynamic(() => import("./ListingMap"), {
  ssr: false,
  loading: () => (
    <div className="h-72 w-full animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-900" />
  ),
});

export default ListingMap;
