import { getContactMessages } from "@/lib/admin";

export const dynamic = "force-dynamic";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const dateFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default async function AdminPage() {
  const messages = await getContactMessages();

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6">
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-black dark:text-zinc-50">
        Buyer Inquiries
      </h1>
      <p className="mb-6 text-sm text-zinc-500">
        Private - not linked from the site. Each row is a message from a
        buyer through a listing&apos;s contact form. For migrated listings,
        the original seller&apos;s info (never shown publicly) is included so
        you can broker the sale.
      </p>

      {messages.length === 0 ? (
        <p className="rounded-xl border border-dashed border-black/10 p-8 text-center text-zinc-500 dark:border-white/10">
          No buyer messages yet.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-950"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <a
                  href={`/listing/${msg.listing.id}`}
                  className="font-semibold text-red-600"
                  target="_blank"
                >
                  {msg.listing.title}
                </a>
                <span className="text-xs text-zinc-500">
                  {dateFormat.format(msg.createdAt)}
                </span>
              </div>
              <p className="mt-1 text-sm text-zinc-500">
                Listed at {currency.format(msg.listing.price)}
                {msg.listing.isMigrated ? " · migrated listing" : ""}
              </p>

              <div className="mt-3 rounded-lg bg-zinc-50 p-3 text-sm dark:bg-zinc-900">
                <p className="font-medium text-black dark:text-zinc-50">
                  From: {msg.name} &lt;{msg.email}&gt;
                </p>
                <p className="mt-1 whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
                  {msg.message}
                </p>
              </div>

              {msg.listing.isMigrated && (
                <div className="mt-3 rounded-lg bg-amber-50 p-3 text-sm dark:bg-amber-900/30">
                  <p className="font-medium text-amber-900 dark:text-amber-300">
                    Original seller (private)
                  </p>
                  {msg.listing.originalSourceUrl && (
                    <p className="mt-1 break-all">
                      <a
                        href={msg.listing.originalSourceUrl}
                        target="_blank"
                        className="text-amber-800 underline dark:text-amber-300"
                      >
                        {msg.listing.originalSourceUrl}
                      </a>
                    </p>
                  )}
                  {msg.listing.originalSellerContact && (
                    <p className="mt-1 text-amber-800 dark:text-amber-300">
                      {msg.listing.originalSellerContact}
                    </p>
                  )}
                  {!msg.listing.originalSourceUrl &&
                    !msg.listing.originalSellerContact && (
                      <p className="mt-1 text-amber-800 dark:text-amber-300">
                        No contact info was captured for this listing.
                      </p>
                    )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
