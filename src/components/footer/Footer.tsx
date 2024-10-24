import { useTranslations } from "next-intl";
import { getCurrentYear } from "@/functions/common";
import { footerLinksList } from "@/settings/const";

// components
import FooterTitleSection from "@/components/footer/FooterTitleSection";
import FooterLink from "@/components/footer/FooterLink";

const Footer = () => {
  const currentYear = getCurrentYear();
  const t = useTranslations();

  return (
    <>
      <footer className="w-full mx-auto mt-32 bg-white border-t select-none">
        <div className="grid gap-8 px-6 grid-cols text-start xl:px-20 py-14 md:grid-cols-3 md:text-center">
          {footerLinksList.map((linksArray, arrayIndex) => (
            <div
              key={arrayIndex}
              className="flex justify-center w-full md:w-auto"
            >
              <div className="w-52">
                <FooterTitleSection>
                  {t(`components.footer.footerLinks.${linksArray[0]}`)}
                </FooterTitleSection>
                <ul className="text-gray-800">
                  {linksArray.slice(1).map((link, index) => (
                    <FooterLink key={`footerLink_KEY_${index}`}>
                      {t(`components.footer.footerLinks.${link}`)}
                    </FooterLink>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="px-16 py-6 text-center bg-gray-100">
          <span className="text-sm text-gray-900 sm:text-center">
            &copy; {currentYear}
            <span className="pl-1 pr-2">JustEat&trade;.</span>
            {t("components.footer.allRightsReserved")}
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
