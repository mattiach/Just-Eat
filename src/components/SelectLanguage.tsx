import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { supportedLanguages } from "@/settings/const";
import { changeLanguageFunction } from "@/functions/common";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const SelectLanguage = () => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const handleLanguageChange = changeLanguageFunction(locale, router);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative top-1">
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <Image
              src={`/assets/img/flags/${locale}.svg`}
              alt={locale}
              width={22}
              height={22}
              className="aspect-auto"
              loading="eager"
              placeholder="empty"
            />
          </div>
          <span className="bg-transparent shadow-none border-none">
            {t(`languages.${locale}`)}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[1] bg-gray-50 p-2 shadow w-44 rounded-md">
        <DropdownMenuSeparator />
        {supportedLanguages.map((language) => (
          <DropdownMenuItem
            key={language}
            onClick={() => handleLanguageChange(language)}
            className="hover:bg-gray-200 w-full"
          >
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                src={`/assets/img/flags/${language}.svg`}
                alt={language}
                width={22}
                height={22}
                className="aspect-auto"
                loading="lazy"
              />
              {t(`languages.${language}`)}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SelectLanguage;
