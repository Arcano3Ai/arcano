const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : process.env.GITHUB_ACTIONS
    ? "/arcano"
    : "";

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
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;
