import pino, { LoggerOptions } from "pino";
import { env } from "@/env.mjs";

// We recommend against using pino-pretty in production and highly recommend installing pino-pretty as a development dependency.
// https://stackoverflow.com/questions/71938587/unable-to-determine-transport-target-for-pino-pretty

const options: LoggerOptions = {
  //  NextJS middleware runs in the edge runtime,
  browser: {
    asObject: true,
    write: (msg) => {
      console.log(JSON.stringify(msg));
    },
  },

  level: env.LOG_LEVEL,
  // pid not supported in NextJS runtime
  // base: { pid: process.pid },

  // timestamp: pino.stdTimeFunctions.isoTime,
  timestamp: () => `,"time":"${new Date(Date.now()).toLocaleString()}"`,
};

export const logger = pino(options);
