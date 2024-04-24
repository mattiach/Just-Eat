import { useTranslation } from 'react-i18next';
import { getCurrentYear } from "@functions/getCurrentYear";
import { footerLinks } from "@data/footerLinks";

// components
import FooterLink from "@components/footer/FooterLink";
import FooterTitleSection from "@components/footer/FooterTitleSection";

const Footer = () => {
    const currentYear = getCurrentYear();
    const { t } = useTranslation();

    return (
        <>
            <footer className="bg-white mt-32 mx-auto border-t select-none">
                <div className="grid grid-cols text-start gap-8 px-6 xl:px-20 py-14 md:grid-cols-3 md:text-center">
                    {footerLinks.map((linksArray, arrayIndex) => (
                        <div key={arrayIndex} className="flex justify-center w-full md:w-auto">
                            <div className="w-52">
                                <FooterTitleSection>{t(`components.footer.footerLinks.${linksArray[0]}`)}</FooterTitleSection>
                                <ul className="text-gray-800">
                                    {linksArray.slice(1).map((link, index) => (
                                        <FooterLink {...link} key={`footerLink_KEY_${index}`}>
                                            {t(`components.footer.footerLinks.${link}`)}
                                        </FooterLink>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="px-16 py-6 bg-gray-100 text-center">
                    <span className="text-sm text-gray-900 sm:text-center">
                        &copy; {currentYear}
                        <span className="pl-1 pr-2">
                            JustEat&trade;.
                        </span>
                        {t('components.footer.allRightsReserved')}
                    </span>
                </div>
            </footer>
        </>
    )
}
export default Footer
