import { lazy, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from '@redux/slices/cartSlice';
import { calculateCartTotal } from "@functions/calculateCartTotal";
const CartItem = lazy(() => import("@components/cart/CartItem"));
const ModalArticle = lazy(() => import("@components/modal/ModalArticle"));

const Cart = ({ isLoading }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartTotal = calculateCartTotal(cart);
  const [restaurantId, setRestaurantId] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState({
    name: '',
    price: 0,
    quantity: 0
  });

  const addToCartFunction = (article) => {
    if (isLoading) return;
    dispatch(addToCart(article));
  };

  const removeFromCartFunction = (articleClicked) => {
    if (isLoading) return;
    dispatch(removeFromCart(articleClicked));
  };

  const openArticleModalFunction = (productFound, cartItem) => {
    if (isLoading) return;

    setRestaurantId(cartItem.restaurantId);
    const newPiatto = {
      restaurantId: cartItem.restaurantId,
      restaurantCategory: cartItem.category,
      restaurantName: cartItem.name,
      restaurantAddress: cartItem.address,
      restaurantImage: cartItem.image,
      restaurantShipping: cartItem.shipping,
      products: {
        name: productFound.name,
        price: productFound.price,
        quantity: productFound.quantity
      }
    };

    setSelectedArticle(newPiatto);
    document.getElementById('modal-cart-article').showModal();
  }

  return (
    <>
      <div className="bg-white rounded-md shadow lg:shadow-md">
        <div className="relative h-full">
          <div className="p-5 py-4 md:max-w-96 md:px-9">
            <h2 className="pt-1 sm:mb-2 text-2xl lg:pl-2 xl:pl-0">Riepilogo</h2>
          </div>
          <div className={`p-5 md:p-6 lg:overflow-auto lg:hover:overflow-auto lg:h-[calc(60vh)] pb-24 ${isLoading ? 'opacity-70' : null}`}>
            <Suspense fallback={null}>
              <CartItem onClick={openArticleModalFunction} />
            </Suspense>
          </div>
          <Suspense fallback={null}>
            <ModalArticle
              modalId={"modal-cart-article"}
              restaurantId={restaurantId}
              selectedArticle={selectedArticle}
              addToCartFunction={() => addToCartFunction(selectedArticle)}
              removeFromCartFunction={removeFromCartFunction}
            />
            <div className="absolute bottom-0 left-0 w-full p-4 mx-auto bg-white border-t-2 rounded-b-md">
              <h4 className="flex justify-between mx-auto text-base md:max-w-96">
                Totale ordine: <span>{cartTotal}</span>
              </h4>
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
};
export default Cart;
