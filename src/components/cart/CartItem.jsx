import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from '@redux/slices/cartSlice';

const CartItem = () => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const removeFromCartFunction = (articleClicked) => {
    dispatch(removeFromCart(articleClicked));
  };

  const addToCartFunction = (article) => {
    dispatch(addToCart(article));
  };

  return (
    <>
      <section>
        {
          (cart.length > 0) ? cart.map((cartItem, index) => {
            return (
              <div key={"CART_restaurantFound_KEY" + index}>
                {/* restaurant image */}
                <div>
                  <img
                    src={'assets/img/ristoranti/' + cartItem.restaurantCategory + '/' + cartItem.restaurantImage}
                    className="object-contain w-full rounded-lg h-56"
                    alt={cartItem.restaurantName + '_image'}
                  />
                </div>
                {/* restaurant items in cart */}
                <ul className="mt-2">
                  {cartItem.products.map((productFound, productIndex) => {
                    const { name, price, quantity } = productFound; // product destructuring assignment

                    return (
                      <li className="flex justify-between pr-1" key={'CART_productFound_KEY_' + productIndex} >
                        <span>{name}</span>
                        <span>
                          <div className="flex items-center justify-end">
                            <button onClick={() => removeFromCartFunction(cartItem)} >
                              <IoRemoveCircleOutline size={24} />
                            </button>
                            <span className={`w-8 text-center text-lg select-none ${quantity > 99 ? "mx-1" : "mx-0-5"}`}>{quantity}</span>
                            <button onClick={() => addToCartFunction(cartItem)} >
                              <IoAddCircleOutline size={24} />
                            </button>
                          </div>
                        </span>
                        <span>{price.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )
          }) : (<h2 className="opacity-50">Carrello vuoto..</h2>)
        }
      </section>
    </>
  )
}

export default CartItem