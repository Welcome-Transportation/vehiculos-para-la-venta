"use client";

import { useState } from "react";

export default function PhotoUploadPreview() {
  const [previews, setPreviews] = useState<string[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        name="photos"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="text-sm"
      />
      {previews.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {previews.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt=""
              className="h-20 w-28 rounded-md object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}
