// functions
import { getCurrentYear } from "../../functions/getCurrentYear";

// data
import { footerLinks } from "../../data/footerLinks";

// components
import FooterLink from "./FooterLink";
import FooterTitleSection from "./FooterTitleSection";

const Footer = () => {
    const currentYear = getCurrentYear();

    // footer links
    const firstArray = footerLinks[0];
    const secondArray = footerLinks[1];
    const thirdArray = footerLinks[2];

    return (
        <>
            <footer className="bg-white mt-32 mx-auto border-t select-none">
                <div>
                    <div className="grid grid-cols text-start gap-8 px-6 xl:px-20 py-14 md:grid-cols-3 md:text-center">
                        <div className="flex justify-center w-full md:w-auto">
                            <div className="w-52">
                                <FooterTitleSection>{firstArray[0]}</FooterTitleSection>
                                <ul className="text-gray-800">
                                    {firstArray.slice(1).map((link, index) => (
                                        <FooterLink {...link} key={index}>{link}</FooterLink>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="flex justify-center w-full md:w-auto">
                            <div className="w-52">
                                <FooterTitleSection>{secondArray[0]}</FooterTitleSection>
                                <ul className="text-gray-800">
                                    {secondArray.slice(1).map((link, index) => (
                                        <FooterLink {...link} key={index}>{link}</FooterLink>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="flex justify-center w-full md:w-auto">
                            <div className="w-52">
                                <FooterTitleSection>
                                    {thirdArray[0]}
                                </FooterTitleSection>
                                <ul className="text-gray-800">
                                    {thirdArray.slice(1).map((link, index) => (
                                        <FooterLink {...link} key={index}>{link}</FooterLink>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="px-16 py-6 bg-gray-100 text-center">
                        <span className="text-sm text-gray-900 sm:text-center">
                            &copy; {currentYear}
                            <span className="pl-1 pr-2">
                                JustEat&trade;.
                            </span>
                            All Rights Reserved.
                        </span>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer