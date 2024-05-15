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

  // webpack: (config) => {
  //   config.resolve.alias.canvas = false;
  //   return config;
  // },
  // see https://nextjs.org/docs/app/building-your-application/optimizing/memory-usage#disable-webpack-cache
  webpack: (config, { dev }) => {
    if (config.cache && !dev) {
      config.cache = Object.freeze({
        type: "memory",
      });
      config.cache.maxMemoryGenerations = 0;
    }
    config.resolve.alias.canvas = false;
    // Important: return the modified config
    return config;
  },

  // Next.js does not use the cache in development mode. Use production mode to enable caching.
  cacheHandler: process.env.NODE_ENV === "production" ? require.resolve("./lib/cache-handler.mjs") : undefined,
  // cacheMaxMemorySize: 400000000, // disable default in-memory caching

  //cacheMaxMemorySize: 0, // disable default in-memory caching

  // This will build the project as a standalone app inside the Docker image.
  //output: "standalone",

  experimental: {
    instrumentationHook: true,
    serverSourceMaps: false,
  },
  // see https://nextjs.org/docs/app/building-your-application/optimizing/memory-usage#disable-source-maps
  productionBrowserSourceMaps: false,

  // reactStrictMode: false,

  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // see: https://nextjs.org/docs/app/building-your-application/deploying#streaming-and-suspense
  async headers() {
    return [
      {
        source: "/:path*{/}?",
        headers: [
          {
            key: "X-Accel-Buffering",
            value: "no",
          },
        ],
      },
    ];
  },
});

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
