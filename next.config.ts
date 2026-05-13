import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/products", destination: "/configurable-solutions", permanent: true },
      { source: "/products/:path*", destination: "/configurable-solutions", permanent: true },
      { source: "/ai-configurator", destination: "/mission-solution-builder", permanent: true },
    ];
  },
};

export default nextConfig;
