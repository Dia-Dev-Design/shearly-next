/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    forceSwcTransforms: true,
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"]
  }
};
export default nextConfig;
