import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { calculateCartTotal } from "@functions/calculateCartTotal";
const CartItem = lazy(() => import('@components/cart/CartItem'));

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const cartTotal = calculateCartTotal(cart);

  return (
    <>
      <div className="bg-white rounded-md sm:shadow lg:shadow-md">
        <div className="relative h-full">
          <div className="p-5 md:max-w-96 md:px-9">
            <h2 className="pt-1 mb-2 text-2xl lg:pl-2 xl:pl-0">Riepilogo</h2>
          </div>
          <div className="p-5 md:p-6 lg:overflow-auto lg:hover:overflow-auto lg:h-[calc(60vh)] pb-24">
            <Suspense fallback={null}>
              <CartItem />
            </Suspense>
          </div>
          <Suspense fallback={null}>
            <div className="absolute bottom-0 left-0 w-full p-4 mx-auto bg-white border-y-4 sm:border-b-0 rounded-b-md">
              <h4 className="flex justify-between mx-auto text-base md:max-w-96">
                Totale ordine: <span>{cartTotal}</span>
              </h4>
            </div>
          </Suspense>
        </div>
      </div>
    </>
  )
}
export default Cart