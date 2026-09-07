import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getListingById } from "@/lib/listings";
import PhotoGallery from "@/components/PhotoGallery";
import FeatureList from "@/components/FeatureList";
import FavoriteButton from "@/components/FavoriteButton";
import ContactForm from "@/components/ContactForm";
import ListingMap from "@/components/MapLoader";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) return {};

  const title = `${listing.title} in ${listing.city}, ${listing.state}`;
  const description = `${currency.format(listing.price)} - ${listing.description.slice(0, 140)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: listing.photos[0] ? [listing.photos[0].url] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ListingPage({ params }: Props) {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: listing.title,
    description: listing.description,
    vehicleIdentificationNumber: undefined,
    mileageFromOdometer: listing.mileage
      ? { "@type": "QuantitativeValue", value: listing.mileage, unitCode: "SMI" }
      : undefined,
    offers: {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: listing.city,
      addressRegion: listing.state,
      postalCode: listing.zipCode,
      addressCountry: "US",
    },
  };

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <PhotoGallery
          photos={listing.photos.map((p) => p.url)}
          title={listing.title}
        />

        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-bold tracking-tight text-black dark:text-zinc-50">
              {listing.title}
            </h1>
            <FavoriteButton listingId={listing.id} />
          </div>
          <p className="text-3xl font-bold text-red-600">
            {currency.format(listing.price)}
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            {listing.city}, {listing.state} &middot; {listing.county}{" "}
            &middot; {listing.zipCode}
          </p>
          {listing.mileage && (
            <p className="text-sm text-zinc-500">
              {listing.mileage.toLocaleString()} miles
            </p>
          )}
          <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
            {listing.description}
          </p>

          <h2 className="mt-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Features
          </h2>
          <FeatureList listing={listing} />
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Location
          </h2>
          <ListingMap
            latitude={listing.latitude}
            longitude={listing.longitude}
            title={listing.title}
          />
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Contact seller
          </h2>
          {(listing.sellerName || listing.sellerCompany || listing.sellerPhone) && (
            <p className="mb-4 rounded-lg bg-zinc-100 p-3 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              {listing.sellerName && <>{listing.sellerName}</>}
              {listing.sellerCompany && <> &middot; {listing.sellerCompany}</>}
              {listing.sellerPhone && (
                <>
                  {" "}
                  &middot;{" "}
                  <a
                    href={`tel:${listing.sellerPhone.replace(/[^\d+]/g, "")}`}
                    className="font-medium text-red-600"
                  >
                    {listing.sellerPhone}
                  </a>
                </>
              )}
            </p>
          )}
          <ContactForm listingId={listing.id} />
        </div>
      </div>
    </main>
  );
}
