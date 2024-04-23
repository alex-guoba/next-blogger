// import "server-only";

import createMiddleware from "next-intl/middleware";
import { AllLocales, LocaleConfig } from "./config/locale";

import { withLogging } from "./middleware/withLogging";

const intl = createMiddleware({
  locales: AllLocales,
  defaultLocale: LocaleConfig.defaultLocale,
  localePrefix: "as-needed",
});

export default withLogging(intl);

export const config = {
  // Match only internationalized pathnames
  // matcher: "/((?!api|static|.*\\..*|_next).*)",
  matcher: "/((?!api|static|_next/static|_next/image|favicon.ico).*)",
};
