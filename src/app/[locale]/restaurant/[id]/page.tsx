"use client";

import { useEffect, useState } from "react";
import { RestaurantOrder, SelectedDish } from "@/interfaces/const";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import {
  selectSelectedRestaurant,
  setSelectedRestaurant,
} from "@/redux/slices/selectedRestaurantIDSlice";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { RootState } from "@/redux/store";
import { getProductQuantity } from "@/functions/common";

// components
import BannerRestaurant from "@/components/BannerRestaurant";
import RestaurantCardCategory from "@/components/card/RestaurantCardCategory";
import Footer from "@/components/footer/Footer";
import LayoutContainer from "@/components/LayoutContainer";
import Navbar from "@/components/navbar/Navbar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

const Page = () => {
  const params = useParams();
  const id = params?.id;
  const dispatch = useDispatch();
  const t = useTranslations();
  const router = useRouter();
  const [initialRender, setInitialRender] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const selectedRestaurant = useSelector(
    selectSelectedRestaurant(id as string)
  );

  // cart state from redux
  const cart = useSelector((state: RootState) => state.cart);

  const [selectedArticle, setSelectedArticle] =
    useState<RestaurantOrder | null>(null);

  // fetch the selected restaurant when the page is loaded and scroll to the top of the page
  useEffect(() => {
    if (initialRender && id) { // Modificato: assicuriamoci che id sia presente
      setInitialRender(false);
      dispatch(setSelectedRestaurant({ id: id }));
    } else {
      window.scrollTo(0, 0);
    }
  }, [dispatch, id, initialRender]);

  // if the selected restaurant is not found, redirect to the orders page
  if (!selectedRestaurant) {
    router.push("/orders");
    return null;
  }

  // function to open a modal displaying details of a selected article from a restaurant category card
  const openArticleModalFunction = (
    dishTakenFromCategoryCard: SelectedDish
  ) => {
    const newOrder: RestaurantOrder = {
      restaurant: {
        id: selectedRestaurant.id,
        category: selectedRestaurant.category,
        name: selectedRestaurant.name,
        address: selectedRestaurant.address,
        image: selectedRestaurant.image,
        shippingCost: selectedRestaurant.shipping,
      },
      products: [
        {
          name: dishTakenFromCategoryCard.name,
          price: dishTakenFromCategoryCard.price,
          quantity: dishTakenFromCategoryCard.quantity,
        },
      ],
    };

    setSelectedArticle(newOrder);
    setIsDialogOpen(true);
  };

  // functions to add an article from the cart
  const addToCartFunction = (article: RestaurantOrder) => {
    dispatch(addToCart(article));
  };

  // function to remove the article from the cart
  const removeFromCartFunction = (articleClicked: RestaurantOrder) => {
    dispatch(removeFromCart(articleClicked));
  };

  // function that returns the quantity of a specific product as a number
  const quantityInCart = getProductQuantity(cart);

  return (
    <>
      <LayoutContainer>
        <Navbar />
        <div>
          <BannerRestaurant id={id || ''} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-2xl lg:max-w-5xl gap-1.5 md:gap-0 my-7 md:my-9 lg:my-16">
            {selectedRestaurant &&
              Object.keys(selectedRestaurant.menu).map((el, index) => (
                <RestaurantCardCategory
                  key={"card-restaurant-category_KEY_" + index}
                  category={selectedRestaurant.menu[el]}
                  onClick={(dishTakenFromCategoryCard) =>
                    openArticleModalFunction(dishTakenFromCategoryCard)
                  }
                />
              ))}
          </div>
        </div>

        {/* Product modal */}
        {selectedArticle ? (
          <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent title={t("common.close")}>
                <div className="flex justify-between items-center w-full mt-5">
                  <DialogTitle className="text-lg font-semibold">
                    {selectedArticle.products[0].name}
                  </DialogTitle>
                  <DialogDescription className="text-lg text-black italic pr-2.5 select-none">
                    <span>
                      {selectedArticle.products[0].price.toLocaleString(
                        "it-IT",
                        {
                          style: "currency",
                          currency: "EUR",
                        }
                      )}
                    </span>
                  </DialogDescription>
                </div>
                <DialogFooter>
                  <span className="flex items-center justify-end">
                    <button
                      onClick={() => removeFromCartFunction(selectedArticle)}
                    >
                      <IoRemoveCircleOutline size={24} />
                    </button>
                    <span className="w-8 text-center text-lg select-none">
                      {quantityInCart(
                        selectedArticle.products[0].name,
                        selectedArticle.restaurant.id
                      )}
                    </span>
                    <button onClick={() => addToCartFunction(selectedArticle)}>
                      <IoAddCircleOutline size={24} />
                    </button>
                  </span>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        ) : null}

        <Footer />
      </LayoutContainer>
    </>
  );
};

export default Page;
