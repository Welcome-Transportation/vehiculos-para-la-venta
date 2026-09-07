import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
