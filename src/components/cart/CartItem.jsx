import {
  // useDispatch,
  useSelector
} from "react-redux";
// import { addToCart, removeFromCart } from '@redux/slices/cartSlice';
import { calculateRestaurantTotal } from "@functions/calculateRestaurantTotal";
import { formatCurrency } from "@functions/formatCurrency";
import { useNavigate } from "react-router-dom";

const CartItem = () => {
  // const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  // const removeFromCartFunction = (articleClicked) => {
  //   dispatch(removeFromCart(articleClicked));
  // };

  // const addToCartFunction = (article) => {
  //   dispatch(addToCart(article));
  // };

  return (
    <>
      <section>
        {
          (cart.length > 0) ? cart.map((cartItem, index) => {
            const {
              // restaurantCategory,
              // restaurantImage,
              restaurantId,
              restaurantName,
              restaurantAddress: { street, postalCode, city },
              restaurantShipping: { freeShipping, shippingCost, minOrder }
            } = cartItem; // product destructuring assignment

            return (
              <div key={"CART_restaurantFound_KEY" + restaurantId + index}>
                {/* restaurant title and location */}
                <div className="divider">
                  <h2
                    className="font-semibold cursor-pointer text-primary hover:text-secondary"
                    name={`${restaurantName}`}
                    onClick={() => navigate(`/ristorante/${restaurantId}`)}
                  >
                    &quot;{restaurantName}&quot;
                  </h2>
                </div>

                {/* restaurant items in cart */}
                <ul className="grid w-full grid-cols-12 mx-auto mt-5 gap-y-2 md:max-w-96">
                  {cartItem.products.map((productFound, productIndex) => {
                    const { name, price, quantity } = productFound; // product destructuring assignment

                    return (
                      <li className="flex items-center justify-between col-span-12 text-sm leading-4" key={'CART_productFound_KEY_' + productIndex}>
                        <span className="w-8/12 col-span-7 text-wrap">x{quantity} <span className="pl-2">{name}</span></span>
                        <span className="flex justify-end w-1/12 col-span-2 italic">
                          {formatCurrency(price)}
                        </span>
                      </li>
                    );
                  })}

                  {/* restaurant total */}
                  {!freeShipping && shippingCost > 0 && (
                    <li className="flex justify-between col-span-12 pt-4 text-sm text-right">
                      Consegna:
                      <span className="italic">
                        {formatCurrency(shippingCost)}
                      </span>
                    </li>
                  )}
                  <li className={`flex justify-between col-span-12 text-sm text-right ${shippingCost > 0 ? 'pt-0' : 'pt-4'}`}>
                    Totale:
                    <span className="italic">
                      {formatCurrency(calculateRestaurantTotal(cartItem) + shippingCost)}
                    </span>
                  </li>
                </ul>

                {/* restaurant location */}
                <div className="w-full mx-auto mt-4 mb-16 text-xs italic leading-tighter md:max-w-96">
                  <p>Ordine minimo: {minOrder !== 0 ? formatCurrency(minOrder) : null}</p>
                  <p>Il ristorante si trova in {street}, {postalCode} - {city}</p>
                </div>
              </div>
            )
          }) : (<h2 className="opacity-50">Carrello vuoto..</h2>)
        }
      </section >
    </>
  )
}

export default CartItem