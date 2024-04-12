import pino, { LoggerOptions } from "pino";

import { env } from "@/env.mjs";

let options: LoggerOptions = {
  level: env.LOG_LEVEL,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
    },
  },
};

// if (env.NODE_ENV == "production") {
//   options = {
//     base: { pid: process.pid },
//     timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
//     level: "info",
//     transport: {
//       target: "pino-pretty",
//       options: {
//         colorize: true,
//       },
//     },
//   };
// } else {
//   options = {
//     level: "debug",
//     timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
//     transport: {
//       target: "pino-pretty",
//       options: {
//         colorize: true,
//       },
//     },
//   };
// }

export const logger = pino(options);
