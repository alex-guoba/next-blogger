import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("production"),
      IFRAMELY_URI: z.string().optional(),
      IFRAMELY_API_KEY: z.string().optional(),
      NOTION_TOKEN: z.string(),
      NOTION_DATABASE_ID: z.string().trim().min(1),
      NOTION_API_LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("warn"),
      POST_PAGE_SIZES: z.coerce.number().default(8),
      REVALIDATE_PAGES: z.coerce.number().default(600),
      NEXT_ANALYTICS_UMAMI_ID: z.string().default(''),
      NEXT_DATACACHE_EXPIRE: z.coerce.number().default(1600),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_APP_URL: z.string().url(),
    // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
    // NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    IFRAMELY_URI: process.env.IFRAMELY_URI,
    IFRAMELY_API_KEY: process.env.IFRAMELY_KEY,
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    NOTION_API_LOG_LEVEL: process.env.NOTION_API_LOG_LEVEL,
    POST_PAGE_SIZES: process.env.POST_PAGE_SIZES,
    REVALIDATE_PAGES: process.env.NEXT_REVALIDATE_PAGES,
    NEXT_ANALYTICS_UMAMI_ID: process.env.NEXT_ANALYTICS_UMAMI_ID,
    NEXT_DATACACHE_EXPIRE: process.env.NEXT_DATACACHE_EXPIRE,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
})
