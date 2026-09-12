/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;
