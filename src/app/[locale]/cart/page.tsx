"use client";

import { Suspense } from "react";

// components
import Navbar from "@/components/navbar/Navbar";
import LayoutContainer from "@/components/LayoutContainer";
import Cart from "@/components/cart/Cart";
import CartUserProfile from "@/components/cart/CartUserProfile";
import Footer from "@/components/footer/Footer";

const Page = () => {
  return (
    <>
      <LayoutContainer>
        <Navbar />
        <div>
          <div className={`grid h-full max-w-xl gap-6 mx-auto bg-gray-100 xs:p-4 sm:p-8 md:max-w-xl lg:max-w-5xl xl:gap-8 lg:grid-cols-2 xl:grid-cols-5 lg:rounded-md xl:max-w-7xl`}>
            <Cart />
            <Suspense fallback={null}>
              <CartUserProfile />
            </Suspense>
          </div>
        </div>
        <Footer />
      </LayoutContainer>
    </>
  )
}

export default Page