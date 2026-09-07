import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = "https://vehiculos-para-la-venta.netlify.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const listings = await prisma.listing.findMany({
    select: { id: true, createdAt: true },
  });

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/sell`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/favorites`, changeFrequency: "monthly", priority: 0.3 },
    {
      url: `${BASE_URL}/i-want-to-buy-a-bus`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/i-need-a-bus`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/affordable-charter-bus`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/accessible-charter-bus-orlando`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const listingPages: MetadataRoute.Sitemap = listings.map((listing) => ({
    url: `${BASE_URL}/listing/${listing.id}`,
    lastModified: listing.createdAt,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticPages, ...listingPages];
}
