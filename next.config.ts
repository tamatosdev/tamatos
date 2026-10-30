import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    qualities: [75, 80, 100],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    const securityHeaders = {
      source: "/:path*",
      headers: [
        // HTTPS only for a year. Subdomains are left out in case any still serve HTTP.
        { key: "Strict-Transport-Security", value: "max-age=31536000" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    };

    // Dev chunk names aren't content-hashed, so long-lived caching serves stale code.
    if (process.env.NODE_ENV !== "production") return [securityHeaders];
    return [
      securityHeaders,
      {
        // Immutable hashed build assets — safe to cache long-term.
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/:path(.*)\\.(ico|png|jpg|jpeg|gif|webp|avif|svg|woff2|mp4)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
