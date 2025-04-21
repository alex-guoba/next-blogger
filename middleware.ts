// import "server-only";

import createMiddleware from "next-intl/middleware";
import { AllLocales, LocaleConfig } from "./config/locale";

import { logger } from "./lib/logger";
import { updateSession } from "./lib/supabase/middleware";
import { NextRequest } from "next/server";
import { getCurrentUrl } from "./lib/utils";

const intl = createMiddleware({
  locales: AllLocales,
  defaultLocale: LocaleConfig.defaultLocale,
  localePrefix: "as-needed",
});

// export default withLogging(intl);
export async function middleware(request: NextRequest) {
  // log request
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(/, /)[0] : "";
  const hostname = getCurrentUrl(request.headers);
  logger.info(`[${request.method}] [${ip}] [${hostname}] ${request.url}`);

  // intl request
  const response = await intl(request);

  // auth request
  const rsp = updateSession(request, response);

  return rsp;
}

export const config = {
  // Match only internationalized pathnames
  // matcher: "/((?!api|static|.*\\..*|_next).*)",
  matcher: "/((?!api|static|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};
