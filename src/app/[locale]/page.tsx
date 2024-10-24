"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useMediaQuery } from "react-amazing-hooks";

// components
import { Button } from "@/components/ui/button";
import LayoutContainer from "@/components/LayoutContainer";
import Navbar from "@/components/navbar/Navbar";
import Header from "@/components/Header";
import Footer from "@/components/footer/Footer";
import Title from "@/components/typography/Title";
import Paragraph from "@/components/typography/Paragraph";

// assets
const headerImage1 = "/assets/img/bg_hero-wide.jpg";
const headerImage2 = "/assets/img/bg_hero-wide2.jpg";
const appStore = "/assets/img/app-store.png";
const appStoreMobile = "/assets/img/app-store-mobile.jpg";
const smartPhoneImage = "/assets/img/apps_promo-wide-je.png";

export default function HomePage() {
  const t = useTranslations();
  const isDesktop = useMediaQuery({ min: 992 });
  const isMobile = useMediaQuery({ max: 600 });
  const language = useLocale();
  const [bgSRC, setBgSRC] = useState<string>(headerImage1);
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    setBgSRC(Math.random() < 0.5 ? headerImage1 : headerImage2);

    const timer = setTimeout(() => {
      setShowImages(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LayoutContainer>
        <Navbar />
        <div className="w-full">
          <Header bgSRC={bgSRC} />
          <main className="fading-in-animation select-none">
            <div className="mt-10 text-center">
              <Title>{t("pages.home.title")}</Title>
            </div>
            <div className="mt-10 text-center">
              <Link href={`/${language}/orders`}>
                <Button
                  className={
                    "focus:outline-none bg-primary hover:bg-secondary text-white focus:ring-0 font-semibold text-xl rounded-lg py-3 px-4 mr-4 mb-4 min-h-[2.8125em] md:w-72"
                  }
                >
                  {t("pages.home.button")}
                </Button>
              </Link>
            </div>
            <div className="gap-6 mx-auto mt-20 xl:mt-28 xl:flex xl:justify-evenly max-w-7xl">
              <div className="flex justify-center mx-auto xl:block xl:mx-0">
                {showImages && (
                  <>
                    <Image
                      src={smartPhoneImage}
                      className={`${isMobile ? "w-52" : "w-80"}`}
                      width={`${isMobile ? 208 : 320}`}
                      height={`${isMobile ? 208 : 320}`}
                      alt="App JustEat"
                      title="App JustEat"
                      loading="lazy"
                    />
                  </>
                )}
              </div>
              <div className="text-center pt-14 md:pt-20 lg:pt-24">
                <Paragraph>
                  <span className="px-2">
                    {t("pages.home.paragraph1")}
                    <span className="inline-block pl-1 sm:block sm:pl-0">
                      {t("pages.home.paragraph2")}
                    </span>
                  </span>
                </Paragraph>
                <div className="flex justify-center mt-20 sm:mt-14">
                  {showImages && (
                    <>
                      <Image
                        src={isDesktop ? appStore : appStoreMobile}
                        width={`${isDesktop ? 384 : 160}`}
                        height={`${isDesktop ? 384 : 160}`}
                        alt="App JustEat"
                        title="App JustEat"
                        loading="lazy"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div >
        <Footer />
      </LayoutContainer >
    </>
  );
}
