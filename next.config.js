// import createNextIntlPlugin from 'next-intl/plugin';

// const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');
const withNextIntl = require("next-intl/plugin")("./lib/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
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
      {
        protocol: "https",
        hostname: "*.tumblr.com",
      },
    ],
    // unoptimized: true,
  },

  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },

  // cacheHandler: require.resolve('./lib/cache-handler.js'),
  cacheMaxMemorySize: 400000000, // disable default in-memory caching
  //cacheMaxMemorySize: 0, // disable default in-memory caching

  // This will build the project as a standalone app inside the Docker image.
  //output: "standalone",

  experimental: {
    instrumentationHook: true,
  },
});

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
