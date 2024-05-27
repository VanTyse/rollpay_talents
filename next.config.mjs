/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fmm-storage.s3.us-east-1.amazonaws.com",
        pathname: "/rollpay/**",
      },
    ],
  },
}

export default nextConfig
