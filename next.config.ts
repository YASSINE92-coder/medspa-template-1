import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * Pin the Turbopack root to this project. Without it, Next walks up looking
   * for a lockfile and finds a stray C:\package-lock.json outside the repo,
   * which it then warns about on every build.
   */
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
