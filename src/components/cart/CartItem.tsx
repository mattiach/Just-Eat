import { Fragment, Dispatch as ReactDispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateRestaurantTotal, getProductQuantity } from "@/functions/common";
import { formatCurrency } from "@/functions/common";
import { useLocale, useTranslations } from "next-intl";
import { RootState } from "@/redux/store";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "../ui/dialog";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { RestaurantDetails, RestaurantOrder, SelectedDish } from "@/interfaces/const";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import { initialRestaurant, initialProduct } from "@/lib/const";
import Link from "next/link";

interface CartItemProps {
  openArticleModalFunction: (productFound: SelectedDish) => void,
  isModalOpen: boolean,
  setisModalOpen: ReactDispatch<SetStateAction<boolean>>,
  selectedArticle: SelectedDish | undefined
}

const CartItem: React.FC<CartItemProps> = ({ openArticleModalFunction, isModalOpen, setisModalOpen, selectedArticle }) => {
  const t = useTranslations();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const language = useLocale();
  const [selectedProduct, setSelectedProduct] = useState<SelectedDish>(initialProduct);
  const [restaurantSelected, setRestaurantSelected] = useState<RestaurantDetails>(initialRestaurant);

  if (cart.length === 0) return null

  // functions to add an article from the cart
  const addToCartFunction = () => {
    const orderToAdd: RestaurantOrder = {
      restaurant: restaurantSelected,
      products: [{
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: selectedProduct.quantity,
      }],
    };
    dispatch(addToCart(orderToAdd));
  };

  // functions to remove an article from the cart
  const removeFromCartFunction = () => {
    const orderToAdd: RestaurantOrder = {
      restaurant: restaurantSelected,
      products: [{
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: selectedProduct.quantity,
      }],
    };
    dispatch(removeFromCart(orderToAdd));
  };

  // function that returns the quantity of a specific product as a number
  const quantityInCart = getProductQuantity(cart);

  return (
    <>
      <section className="select-none">
        {
          (cart.length > 0) ? cart.map((cartItem, index) => {
            const { restaurant, /* products */ } = cartItem;

            return (
              <Fragment key={`CART_restaurantFound_KEY_${index}}`}>
                <div>
                  {/* restaurant title and location */}
                  <div className="divider">
                    <h2
                      className="font-semibold cursor-pointer text-primary hover:text-secondary md:pl-8 lg:pl-3"
                    >
                      <Link href={`/${language ? `${language}/` : ""}restaurant/${restaurant.id}`}>
                        &quot;{restaurant.name}&quot;
                      </Link>
                    </h2>
                  </div>

                  {/* restaurant items in cart */}
                  <ul className="grid w-full grid-cols-12 mx-auto mt-5 gap-y-2 md:max-w-96">
                    {cartItem.products.map((productFound: SelectedDish, productIndex: number) => {
                      const { name, price, quantity } = productFound; // product destructuring assignment

                      return (
                        <li
                          className="flex items-center justify-between col-span-12 text-sm leading-4 cursor-pointer text-pretty"
                          key={`CART_productFound_KEY_${restaurant.id}_${name}_${productIndex}`}
                          onClick={() => {
                            setRestaurantSelected(restaurant);
                            setSelectedProduct(productFound);
                            openArticleModalFunction(productFound);
                          }}
                        >
                          <span className="w-8/12 col-span-7"><b>x{quantity}</b><span className="pl-2">{name}</span></span>
                          <span className="flex justify-end w-1/12 col-span-2 italic">
                            {formatCurrency(price)}
                          </span>
                        </li>
                      );
                    })}

                    {/* restaurant total */}
                    {!restaurant.shippingCost.freeShipping && restaurant.shippingCost.shippingCost > 0 && (
                      <li className="flex justify-between col-span-12 pt-3 text-sm text-right">
                        {t('common.delivery').charAt(0).toUpperCase() + t('common.delivery').slice(1)}:
                        <span className="italic">
                          {formatCurrency(restaurant.shippingCost.shippingCost)}
                        </span>
                      </li>
                    )}
                    <li className={`flex justify-between col-span-12 text-sm text-right ${restaurant.shippingCost.shippingCost > 0 ? 'pt-0' : 'pt-3'}`}>
                      {t('common.total')}:
                      <span className="italic">
                        {formatCurrency(calculateRestaurantTotal(cartItem))}
                      </span>
                    </li>
                  </ul>

                  {/* restaurant location */}
                  <div className="w-full pb-4 mx-auto mt-4 mb-16 text-xs italic border-b-4 border-gray-200 leading-tighter md:max-w-96">
                    <p>{t('common.minOrder').charAt(0).toUpperCase() + t('common.minOrder').slice(1)}: {restaurant.shippingCost.minOrder !== 0 ? formatCurrency(restaurant.shippingCost.minOrder) : null}</p>
                    <p>{t('components.cartItem.paragraph')} {restaurant.address.street}, {restaurant.address.postalCode} - {restaurant.address.city}</p>
                  </div>
                </div>

                {/* Product modal */}
                {isModalOpen && selectedArticle ? (
                  <>
                    <Dialog open={isModalOpen} onOpenChange={() => {
                      setisModalOpen(!isModalOpen);
                      setSelectedProduct(initialProduct)
                    }}>
                      <DialogContent title={t("common.close")}>
                        <div className="flex items-center justify-between w-full mt-5">
                          <DialogTitle className="text-lg font-semibold">
                            {selectedArticle.name}
                          </DialogTitle>
                          <DialogDescription className="text-lg text-black italic pr-2.5 select-none">
                            <span>
                              {selectedArticle.price.toLocaleString("it-IT", { style: "currency", currency: "EUR", })}
                            </span>
                          </DialogDescription>
                        </div>
                        <DialogFooter>
                          <span className="flex items-center justify-end">
                            <button
                              onClick={() => removeFromCartFunction()}
                            >
                              <IoRemoveCircleOutline size={24} />
                            </button>
                            <span className="w-8 text-lg text-center select-none">
                              {quantityInCart(
                                selectedArticle.name,
                                restaurantSelected.id
                              )}
                            </span>
                            <button onClick={() => addToCartFunction()}>
                              <IoAddCircleOutline size={24} />
                            </button>
                          </span>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </>
                ) : null}
              </Fragment>
            )
          }) : null
        }
      </section >
    </>
  )
}

export default CartItem