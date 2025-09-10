/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  ppr: "incremental",
};

module.exports = nextConfig;
