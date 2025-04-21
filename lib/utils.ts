// import { siteMeta } from "@/config/meta";
import { env } from "@/env.mjs";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  }
) {
  return new Intl.DateTimeFormat("en-US", {
    ...options,
  }).format(new Date(date));
}

export function formatTime(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    // hour12: false,
  }
) {
  return new Intl.DateTimeFormat("en-US", {
    ...options,
  }).format(new Date(date));
}

// get current url for sever side
export function getCurrentUrl(headers: Headers) {
  const protocol = headers.get("x-forwarded-proto") || "https";
  const host = headers.get("x-forwarded-host") || headers.get("host");

  return `${protocol}://${host}`;
}

// headers: see doc from https://nextjs.org/docs/app/api-reference/functions/headers
export function absoluteUrl(path: string, headers: Headers | undefined = undefined) {
  let host = env.SITE_URL; // for page generate during build process.
  if (headers) {
    host = getCurrentUrl(headers);
  }

  const url = new URL(path, host);

  return url.toString();
}

export function safeURL(urlString: string) {
  try {
    return new URL(urlString);
  } catch (e) {
    return null;
  }
}
