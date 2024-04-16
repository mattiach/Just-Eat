import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { calculateCartTotal } from "../../functions/calculateCartTotal";
const CartItem = lazy(() => import('@components/cart/CartItem'));

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const cartTotal = calculateCartTotal(cart);

  return (
    <>
      <div className="bg-white rounded-md shadow">
        <div className="relative h-full">
          <div className="p-6 lg:overflow-auto lg:h-[calc(100vh)] pb-24">
            <h2 className="text-2xl mb-5">Riepilogo</h2>
            <Suspense fallback={null}>
              <CartItem />
            </Suspense>
          </div>
          <Suspense fallback={null}>
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gray-100 border-t-2">
              <h4 className="text-base flex justify-between">
                Totale ordine <span className="pr-2.5">{cartTotal}</span>
              </h4>
            </div>
          </Suspense>
        </div>
      </div>
    </>
  )
}
export default Cart