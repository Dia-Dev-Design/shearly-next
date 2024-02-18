/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
      styledComponents: true,
    },
    experimental: {
      forceSwcTransforms: true,
    },
  };
export default nextConfig;
