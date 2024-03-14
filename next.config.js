/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["tsx", "mdx", "ts", "js"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
      {
        protocol: "https",
        hostname: "www.notion.so",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "gravatar.com",
      },
      {
        protocol: "https",
        hostname: "*.s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "radix-ui.com",
      },
      {
        protocol: "https",
        hostname: "*.medium.com",
      },
    ],
    // unoptimized: true,
  },

  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },

  // This will build the project as a standalone app inside the Docker image.
  //output: "standalone",
};

module.exports = nextConfig;
