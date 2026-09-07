import type { PublicListing } from "@/lib/listings";

function Feature({ label, on }: { label: string; on: boolean }) {
  return (
    <li className="flex items-center gap-2 text-sm">
      <span
        className={
          on
            ? "flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
            : "flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600"
        }
        aria-hidden
      >
        {on ? "✓" : "✕"}
      </span>
      <span
        className={
          on
            ? "text-black dark:text-zinc-50"
            : "text-zinc-400 dark:text-zinc-600"
        }
      >
        {label}
      </span>
    </li>
  );
}

export default function FeatureList({ listing }: { listing: PublicListing }) {
  const features: [string, boolean][] = [
    ["ADA accessible", listing.isAdaAccessible],
    ["Seat belts", listing.hasSeatBelts],
    ["TVs on board", listing.hasTVs],
    ["PA system", listing.hasPASystem],
    ["Working radio", listing.hasWorkingRadio],
    ["Bluetooth", listing.hasBluetooth],
    ["USB ports", listing.hasUSBPorts],
    ["Working bathroom", listing.hasWorkingBathroom],
    ["Operable / runs and drives", listing.isOperable],
    [
      listing.fleetStatus === "ACTIVE_FLEET"
        ? "Currently in active fleet"
        : "Currently parked",
      true,
    ],
  ];

  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {features.map(([label, on]) => (
        <Feature key={label} label={label} on={on} />
      ))}
    </ul>
  );
}
