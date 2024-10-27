"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import LayoutContainer from "@/components/LayoutContainer";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const Page = () => {
  const t = useTranslations();

  return (
    <LayoutContainer>
      <Navbar />
      <div className="relative mt-10 text-center">
        <div>
          <p className="text-2xl md:text-3xl font-bold tracking-tight relative top-2">
            {t('common.orderCompleted')}!
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src={'/assets/img/order-completed.png'}
            alt='order-completed.png'
            loading='eager'
            width={320}
            height={320}
            className='w-80 xs:w-96 md:w-[34rem] mx-auto relative bottom-5'
          />
        </div>
        <div className='relative bottom-8 md:bottom-12'>
          <p className='tracking-tight text-center text-balance opacity-90 p-1.5 text-sm sm:text-md md:text-base'>
            {t('pages.orderCompleted.paragraph')}
          </p>
        </div>
      </div>
      <Footer />
    </LayoutContainer>
  );
}

export default Page;
