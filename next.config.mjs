/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    outputFileTracingRoot: undefined,
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
