import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // react-leaflet's MapContainer can't cleanly tear down and recreate its
  // underlying Leaflet map instance across React 19 Strict Mode's dev-only
  // double-mount, which throws "iconUrl not set" / "_leaflet_events"
  // errors. Production builds don't double-invoke, so this only affects
  // local dev noise, not behavior.
  reactStrictMode: false,
  // The SQLite file and Prisma's query-engine binary are opened at runtime
  // by file path, not via require()/import, so Next's file tracer can't
  // discover them on its own - they have to be listed explicitly or the
  // deployed function won't have the database or engine bundled with it.
  outputFileTracingIncludes: {
    "/**/*": [
      "./prisma/dev.db",
      "./node_modules/.prisma/client/**",
      "./node_modules/@prisma/client/**",
    ],
  },
};

export default nextConfig;
