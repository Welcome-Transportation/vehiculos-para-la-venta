import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-black/10 bg-white dark:border-white/10 dark:bg-black">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-bus.png"
            alt="Vehículos Para La Venta"
            width={40}
            height={40}
            className="rounded-full object-cover ring-2 ring-red-600"
          />
          <span className="text-lg font-semibold tracking-tight text-black dark:text-zinc-50">
            Vehículos Para La Venta
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link href="/" className="hover:text-black dark:hover:text-white">
            Listings
          </Link>
          <Link
            href="/sell"
            className="hover:text-black dark:hover:text-white"
          >
            Sell / Migrate
          </Link>
          <Link
            href="/favorites"
            className="hover:text-black dark:hover:text-white"
          >
            Favorites
          </Link>
        </nav>
      </div>
    </header>
  );
}
