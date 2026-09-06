"use client";

import Image from "next/image";
import { useState } from "react";

export default function PhotoGallery({
  photos,
  title,
}: {
  photos: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const images = photos.length > 0 ? photos : ["/listings/bus-fleet.jpg"];

  return (
    <div className="flex flex-col gap-2">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={images[active]}
          alt={title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={
                i === active
                  ? "relative h-16 w-24 shrink-0 overflow-hidden rounded-md ring-2 ring-red-600"
                  : "relative h-16 w-24 shrink-0 overflow-hidden rounded-md opacity-70 hover:opacity-100"
              }
            >
              <Image src={src} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
