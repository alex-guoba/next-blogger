import pino, { LoggerOptions } from "pino";
import { env } from "@/env.mjs";

// We recommend against using pino-pretty in production and highly recommend installing pino-pretty as a development dependency.
// https://stackoverflow.com/questions/71938587/unable-to-determine-transport-target-for-pino-pretty
let options: LoggerOptions = {
  level: env.LOG_LEVEL,
  base: { pid: process.pid },
  // timestamp: pino.stdTimeFunctions.isoTime,
  timestamp: () => `,"time":"${new Date(Date.now()).toLocaleString()}"`,

  // transport: {
  //   target: "pino-pretty",
  //   options: {
  //     colorize: true,
  //     translateTime: "SYS:standard",
  //   },
  // },
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
