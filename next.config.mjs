const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : process.env.GITHUB_ACTIONS
    ? "/arcano"
    : "";

const isStaticExport = process.env.STATIC_EXPORT === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;
