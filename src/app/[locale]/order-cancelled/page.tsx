"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LayoutContainer from '@/components/LayoutContainer';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

const Page = () => {

  const router = useRouter();

  return (
    <LayoutContainer>
      <Navbar />
      <div className="relative mt-32 text-center">
        <div className="flex justify-center">
          <Image
            src={'/assets/img/order-cancelled.png'}
            alt='order-cancelled.png'
            loading='eager'
            width={250}
            height={250}
            className='w-80 xs:w-96 md:w-[25rem] mx-auto cursor-pointer fading-in-animation'
            onClick={() => router.push('/')}
          />
        </div>
      </div>
      <Footer />
    </LayoutContainer>
  )
}

export default Page