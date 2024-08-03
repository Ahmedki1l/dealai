/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30, // force page caching for 30s
    },
    serverComponentsExternalPackages: ["@node-rs/argon2"],
  },
};

export default nextConfig;
