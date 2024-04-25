import { CacheHandler } from "@neshca/cache-handler";
import createLruHandler from "@neshca/cache-handler/local-lru";
import createRedisHandler from "@neshca/cache-handler/redis-strings";
import { createClient } from "redis";

CacheHandler.onCreation(async (context) => {
  let client;

  if (process.env.REDIS_URL) {
    try {
      // Create a Redis client.
      client = createClient({
        url: process.env.REDIS_URL,
      });

      // Redis won't work without error handling.
      client.on("error", (err) => {
        console.warn("Redis client error:", err);
      });

      console.info("Connecting Redis client...");

      // Wait for the client to connect.
      // Caveat: This will block the server from starting until the client is connected.
      // And there is no timeout. Make your own timeout if needed.
      await client.connect();
      console.info("Redis client connected.");
    } catch (error) {
      console.warn("Failed to connet Redis client:", error);

      if (client) {
        client
          .disconnect()
          .then(() => {
            console.warn("Redis client disconnected.");
          })
          .catch(() => {
            console.warn("Failed to quit the Redis client after failing to connect.");
          });
      }
    }
  }

  /** @type {import("@neshca/cache-handler").Handler | null} */
  let handler;

  if (client?.isReady) {
    // Create the `redis-stack` Handler if the client is available and connected.
    handler = await createRedisHandler({
      client,
      keyPrefix: "nb:",
      timeoutMs: 2000,
    });
  } else {
    // Fallback to LRU handler if Redis client is not available.
    // The application will still work, but the cache will be in memory only and not shared.
    handler = createLruHandler({
      maxItemSizeBytes: 100 * 1024 * 1024,
    });
    console.warn("Falling back to LRU handler because Redis client is not available.");
  }

  console.info("Cache handler created. serverDistDir:", context.serverDistDir);

  return {
    handlers: [handler],
    // see: https://github.com/caching-tools/next-shared-cache/discussions/489#discussioncomment-9214207
    ttl: { estimateExpireAge: (staleAge) => process.env.NEXT_DATACACHE_SWR_EXPIRE || staleAge * 10},
  };
});

export default CacheHandler;
