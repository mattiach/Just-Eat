import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { supportedLanguages } from "@/settings/const";

export default getRequestConfig(async ({ locale }) => {
  if (!supportedLanguages.includes(locale as any)) notFound();
  return {
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});