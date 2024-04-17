import createMiddleware from "next-intl/middleware";
import { AllLocales, LocaleConfig } from "./config/locale";

export default createMiddleware({
  locales: AllLocales,
  defaultLocale: LocaleConfig.defaultLocale,
  localePrefix: "as-needed",
});

export const config = {
  // Match only internationalized pathnames
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
