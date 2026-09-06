"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FINDERS_FEE_PERCENT } from "@/lib/config";

export type SellFormState = {
  status: "idle" | "error";
  message?: string;
};

async function filesToPhotoUrls(formData: FormData): Promise<string[]> {
  const files = formData
    .getAll("photos")
    .filter((f): f is File => f instanceof File && f.size > 0);

  const urls: string[] = [];
  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    urls.push(`data:${file.type};base64,${buffer.toString("base64")}`);
  }
  return urls;
}

function readListingFields(formData: FormData) {
  return {
    title: String(formData.get("title") || "").trim(),
    price: Number(formData.get("price") || 0),
    description: String(formData.get("description") || "").trim(),
    city: String(formData.get("city") || "").trim(),
    county: String(formData.get("county") || "").trim(),
    zipCode: String(formData.get("zipCode") || "").trim(),
    latitude: Number(formData.get("latitude") || 0),
    longitude: Number(formData.get("longitude") || 0),
    mileage: formData.get("mileage")
      ? Number(formData.get("mileage"))
      : null,
    isAdaAccessible: formData.get("isAdaAccessible") === "on",
    hasSeatBelts: formData.get("hasSeatBelts") === "on",
    hasTVs: formData.get("hasTVs") === "on",
    hasPASystem: formData.get("hasPASystem") === "on",
    hasWorkingRadio: formData.get("hasWorkingRadio") === "on",
    hasBluetooth: formData.get("hasBluetooth") === "on",
    hasUSBPorts: formData.get("hasUSBPorts") === "on",
    hasWorkingBathroom: formData.get("hasWorkingBathroom") === "on",
    isOperable: formData.get("isOperable") === "on",
    fleetStatus:
      formData.get("fleetStatus") === "ACTIVE_FLEET"
        ? "ACTIVE_FLEET"
        : "PARKED",
  };
}

export async function createListing(
  _prevState: SellFormState,
  formData: FormData
): Promise<SellFormState> {
  const fields = readListingFields(formData);

  if (!fields.title || !fields.city || !fields.price) {
    return {
      status: "error",
      message: "Title, city, and price are required.",
    };
  }

  const photoUrls = await filesToPhotoUrls(formData);

  const listing = await prisma.listing.create({
    data: {
      ...fields,
      isMigrated: false,
      photos: { create: photoUrls.map((url, order) => ({ url, order })) },
    },
  });

  redirect(`/listing/${listing.id}`);
}

// "Migrate an existing posting": the dealer's URL and any of their contact
// details (phone, email, dealer name) are intentionally never read from the
// form into the database - only vehicle data is stored, with the price
// marked up by FINDERS_FEE_PERCENT.
export async function createMigratedListing(
  _prevState: SellFormState,
  formData: FormData
): Promise<SellFormState> {
  const fields = readListingFields(formData);

  if (!fields.title || !fields.city || !fields.price) {
    return {
      status: "error",
      message: "Title, city, and price are required.",
    };
  }

  const adjustedPrice = Math.round(
    fields.price * (1 + FINDERS_FEE_PERCENT / 100)
  );

  const photoUrls = await filesToPhotoUrls(formData);

  const listing = await prisma.listing.create({
    data: {
      ...fields,
      price: adjustedPrice,
      isMigrated: true,
      photos: { create: photoUrls.map((url, order) => ({ url, order })) },
    },
  });

  redirect(`/listing/${listing.id}`);
}
