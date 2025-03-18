"use client";

import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AppContext } from "@/context/AppContext";
import { useTranslations } from "next-intl";
import { TbSearch } from "react-icons/tb";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useMediaQuery } from "react-amazing-hooks";
import { getResponsiveSettings } from "@/functions/common";

// components
import LayoutContainer from "@/components/LayoutContainer";
import Navbar from "@/components/navbar/Navbar";
import Header from "@/components/Header";
import Footer from "@/components/footer/Footer";
import Title from "@/components/typography/Title";
import RestaurantCard from "@/components/card/RestaurantCard";
import { Button } from "@/components/ui/button";
import CardsCategory from "@/components/card/CardsCategory";
import { Restaurant } from "@/interfaces/const";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import FloatingButton from "@/components/FloatingButton";

const Page = () => {
  const { selectedCuisine, setSelectedCuisine } = useContext(AppContext);

  const [searchText, setSearchText] = useState("");
  const [itemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [showAllItems, setShowAllItems] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const t = useTranslations();

  // redux
  const cuisineDataMap = useSelector((state: RootState) => state.ristoranti);
  const cuisineImages = useSelector((state: RootState) => state.cuisine);

  // media queries
  const isAtLeastTablet = useMediaQuery({ min: 768 });
  const isAtLeast900 = useMediaQuery({ min: 900 });
  const isPaginationVisible = useMediaQuery({ min: 990 });
  const isCarouselMediaQuery = useMediaQuery({ max: 1200 });

  // earch filter based on the selected cuisine
  const localiFiltrati = useMemo(() => {
    // @ts-ignore
    return cuisineDataMap[selectedCuisine] || [];
  }, [cuisineDataMap, selectedCuisine]);

  // search filter function
  const filterLocali = useCallback(
    (locali: any) => {
      return locali.filter(
        (ristorante: any) =>
          ristorante.name.toLowerCase().includes(searchText.toLowerCase()) || // .. name
          ristorante.address.street
            .toLowerCase()
            .includes(searchText.toLowerCase()) || // .. street
          ristorante.address.city
            .toLowerCase()
            .includes(searchText.toLowerCase()) // .. city
      );
    },
    [searchText]
  );

  // at page load, set focus on the search field
  const focusInputFunction = useCallback(() => {
    if (!isAtLeastTablet) return; // .. blocks the focus on mobile devices for better UX
    if (!inputRef.current) return;

    inputRef.current.focus();
  }, [isAtLeastTablet]);

  // get the restaurants currently displayed on the page
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filterLocali(localiFiltrati).slice(startIndex, endIndex);
  };

  // handle if there are more pages to show
  const checkHasNextPage = useCallback(() => {
    const totalItems = filterLocali(localiFiltrati).length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    setHasNextPage(currentPage < totalPages);
  }, [currentPage, itemsPerPage, filterLocali, localiFiltrati]);

  // call the "checkHasNextPage" function to ensure the state is updated
  useEffect(() => {
    checkHasNextPage();
  }, [checkHasNextPage]);

  // reset the initial page when selecting a new category or using the search filter via the input field
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCuisine, searchText]);

  // function to handle restaurant cards
  const renderRestaurantCards = () => {
    const restaurantsToRender = showAllItems
      ? filterLocali(localiFiltrati)
      : isPaginationVisible
        ? getCurrentPageItems()
        : filterLocali(localiFiltrati);

    return restaurantsToRender.map((ristorante: Restaurant) => (
      <RestaurantCard
        key={`${selectedCuisine}_` + ristorante.id}
        ristorante={ristorante}
      />
    ));
  };


  if (typeof window === "undefined") return null;

  // get responsive settings for the carousel
  const responsiveSettings = getResponsiveSettings();
  const currentSettings = responsiveSettings.find(
    ({ breakpoint }) => window.innerWidth <= breakpoint
  )?.settings || { slidesToShow: 3 };

  return (
    <>
      <LayoutContainer>
        <Navbar />
        <div onLoad={focusInputFunction}>
          <Header bgSRC={"/assets/img/hero.webp"} bgHeight="small" />
          <div className="mt-10 text-center select-none">
            <Title>{t("pages.orders.title")}</Title>
          </div>
          <div className="mt-6 overflow-hidden select-none w-full">
            {isCarouselMediaQuery ? (
              <div className="px-0 mx-auto h-fit">
                <Carousel
                  opts={{
                    align: "start",
                    ...currentSettings,
                  }}
                  className="flex mx-auto px-2.5 h-fit cursor-grab max-w-[987px]"
                >
                  <CarouselContent>
                    {cuisineImages.map(({ id, src, title }) => (
                      <CarouselItem
                        key={id}
                        className="pl-0 mx-auto basis-1/4 sm:basis-1/5 md:basis-1/6 lg:basis-1/6"
                      >
                        <div className="p-1">
                          <CardsCategory
                            imgSRC={src}
                            title={title}
                            setSelectedCuisine={setSelectedCuisine}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            ) : (
              <div className="container w-full mx-auto mt-10">
                <div className="flex justify-around mx-auto gap-2 max-w-[987px]">
                  {cuisineImages.map(({ id, src, title }) => (
                    <CardsCategory
                      key={"card_cuisine_" + id}
                      imgSRC={src}
                      title={title}
                      setSelectedCuisine={setSelectedCuisine}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mt-5">
            <div className="max-w-[987px] mx-auto">
              {isAtLeast900 && (
                <div
                  className="container px-3 mx-auto md:px-2"
                  onClick={focusInputFunction}
                >
                  <div className="flex items-center w-full px-4 mx-auto mb-5 border-2 rounded-full border-slate-200 hover:border-slate-300">
                    <div className="mr-3">
                      <TbSearch size={22} className="text-primary" />
                    </div>
                    <input
                      ref={inputRef}
                      type="text"
                      className="p-2 my-2 placeholder-gray-400 bg-white border-transparent outline-hidden"
                      placeholder={t("pages.orders.searchForRestaurant")}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                </div>
              )}
              <div
                className={`grid gap-4 grid-cols-1 sm:grid-cols-2 sm:max-w-[500px] md:grid-cols-3 md:max-w-[800px] lg:grid-cols-4 lg:max-w-[987px] max-w-[987px] place-items-center mx-auto ${isAtLeastTablet ? "mt-8" : ""
                  }`}
                key={`restaurant_container_search_${searchText}`}
              >
                {/* restaurant cards */}
                {renderRestaurantCards()}
              </div>
              {/* pagination control */}
              {isPaginationVisible &&
                filterLocali(localiFiltrati).length > itemsPerPage ? (
                <div className="flex justify-between mt-8">
                  <div>
                    <Button
                      onClick={() => {
                        setCurrentPage(1);
                        setShowAllItems(!showAllItems);
                      }}
                      type="button"
                      size={"xs"}
                      variant={"ghost"}
                      className="px-2 text-black rounded-xs bg-slate-200 hover:bg-slate-300 custom-shadow-sm text-base relative top-1"
                    >
                      {showAllItems ? t("common.hide") : t("common.showAll")}
                    </Button>
                  </div>
                  {!showAllItems && (
                    <div className="flex gap-2 w-40 pr-2">
                      <Button
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          setCurrentPage((prevPage) =>
                            Math.max(prevPage - 1, 1)
                          );
                        }}
                        disabled={currentPage === 1}
                        type="button"
                        className={`bg-slate-200 hover:bg-slate-300 text-black px-1 rounded-md w-14 custom-shadow-sm ${currentPage === 1 ? "opacity-50" : ""
                          }`}
                      >
                        <MdArrowBackIos />
                      </Button>

                      <Button
                        onClick={(event) => {
                          setCurrentPage((prevPage) => {
                            event.preventDefault();
                            event.stopPropagation();
                            if (
                              prevPage * itemsPerPage <
                              filterLocali(localiFiltrati).length
                            ) {
                              return prevPage + 1;
                            } else {
                              return prevPage;
                            }
                          });
                        }}
                        type="button"
                        disabled={!hasNextPage}
                        className={`bg-slate-200 hover:bg-slate-300 text-black px-1 rounded-md w-14 custom-shadow-sm ${!hasNextPage ? "opacity-50" : ""
                          }`}
                      >
                        <MdArrowForwardIos />
                      </Button>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
          <FloatingButton scrollThreshold={600} />
        </div>
        <Footer />
      </LayoutContainer>
    </>
  );
};

export default Page;
