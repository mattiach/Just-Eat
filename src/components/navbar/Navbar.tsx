"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-amazing-hooks";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import Image from "next/image";

// components
import NavbarItem from "@/components/navbar/NavItem";
import Hamburger from "@/components/navbar/Hamburger";
import SelectLanguage from "@/components/SelectLanguage";

const Navbar = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations();
  const language = useLocale();
  const isLessThan640 = useMediaQuery({ max: 640 });
  const logoSize = isLessThan640 ? 24 : 36;
  const [isMounted, setIsMounted] = useState(false);

  const navigateFunction = (value: string) => {
    router.push(`/${language}/${value}`);
  };

  // function to calculate the total number of items in all carts
  const calculateTotalItems = () => {
    let totalItems = 0;

    // iterate over each cart
    cart.forEach((cartItem) => {
      // iterate over each product in the current cart and add the quantity to the total
      cartItem.products.forEach((product: any) => {
        totalItems += product.quantity;
      });
    });

    return totalItems;
  };

  // calculate the total number of items in all carts
  const totalItems = isMounted ? calculateTotalItems() : 0;

  // mobile menu
  const openMobileMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <nav className="bg-white dark:bg-white border-gray-200 sm:px-4 py-2.5 rounded select-none">
        <div className="flex flex-wrap items-center justify-between mx-auto px-4">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigateFunction("/")}
          >
            <Image
              src="/assets/img/logo.png"
              className="mr-2"
              alt="JustEat Logo"
              placeholder="empty"
              width={logoSize ?? 'auto'}
              height={logoSize ?? 'auto'}
            />
            <h1 className="self-center pt-1 text-2xl font-extrabold whitespace-nowrap text-primary">
              JustEat
            </h1>
          </div>
          <div className="flex md:order-2">
            <span className="hidden sm:inline relative top-1.5 right-1">
              <SelectLanguage />
            </span>
            <div
              className="px-5 py-2.5 sm:flex gap-2 cursor-pointer"
              onClick={() => navigateFunction("/cart")}
            >
              <FaShoppingCart fill="#fe7e00" size={23} />
              <span className="hidden sm:inline w-4 text-center">
                <span className={`${totalItems > 0 ? "" : "invisible"}`}>
                  {totalItems}
                </span>
              </span>
            </div>
            <Hamburger openFunction={openMobileMenu} />
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${open ? "block" : "hidden"
              }`}
          >
            <ul className="flex flex-col p-4 pt-5 mt-4 border border-gray-200 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
              <NavbarItem>
                <Link href={`/${language}/`}>Home</Link>
              </NavbarItem>
              <NavbarItem>
                <Link href={`/${language}/orders`}>
                  {t("components.navbar.orders")}
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href={`/${language}/work-with-us`}>
                  {t("components.navbar.becomeARider")}
                </Link>
              </NavbarItem>
              {isLessThan640 ? (
                <>
                  <NavbarItem className={"sm:hidden"}>
                    <Link href={`/${language}/cart`}>
                      {t("components.navbar.cart")}
                    </Link>
                  </NavbarItem>
                  <NavbarItem className={"sm:hidden flex justify-start"}>
                    <SelectLanguage />
                  </NavbarItem>
                </>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
