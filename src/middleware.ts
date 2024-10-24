import createMiddleware from "next-intl/middleware";
import { defaultLanguage, supportedLanguages } from "./settings/const";

export default createMiddleware({
  locales: supportedLanguages,
  defaultLocale: defaultLanguage,
  localePrefix: "always",
  localeCookie: true,
});

export const config = {
  // matcher: ['/((?!api|_next|.*\\..*).*)']
  matcher: ['/', '/(de|en|it|fr|es)/:path*']
};
