"use client"

import { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { calculateCartTotal } from "@/functions/common";
import { useTranslations } from "next-intl";
import { RootState } from "@/redux/store";
import { SelectedDish } from "@/interfaces/const";
const CartItem = lazy(() => import("@/components/cart/CartItem"));

const Cart = () => {
  const t = useTranslations();
  const cart = useSelector((state: RootState) => state.cart);
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<SelectedDish>();
  const [cartTotal, setCartTotal] = useState<string>('0');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setCartTotal(calculateCartTotal(cart));
    }
  }, [isMounted, cart]);

  // open the article modal with the selected article's details.
  const openArticleModalFunction = (productFound: SelectedDish) => {
    setSelectedArticle(productFound);
    setisModalOpen(true);
  }

  return (
    <>
      <div className="bg-white rounded-md shadow lg:shadow-md xl:col-span-2">
        <div className="relative h-full">
          <div className="p-5 py-4 md:max-w-96 md:px-9">
            <h2 className="pt-1 text-2xl sm:mb-2 lg:pl-2 xl:pl-0">{t('common.summary')}</h2>
          </div>
          <div className="p-5 md:p-6 lg:overflow-auto lg:hover:overflow-auto lg:h-[calc(60vh)] pb-24">
            <Suspense fallback={null}>
              <CartItem
                openArticleModalFunction={openArticleModalFunction}
                isModalOpen={isModalOpen}
                setisModalOpen={setisModalOpen}
                selectedArticle={selectedArticle}
              />
            </Suspense>
          </div>
          <div className="absolute bottom-0 left-0 w-full p-4 mx-auto bg-white border-t-4 rounded-b-md">
            <h4 className="flex justify-between mx-auto text-base md:max-w-96">
              {t('common.totalOrder')}: <span>{cartTotal}</span>
            </h4>
          </div>
        </div>
      </div >
    </>
  );
};

export default Cart;
