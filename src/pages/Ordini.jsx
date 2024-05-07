import { useState, useEffect, useRef, useMemo, useCallback, useContext, Suspense, lazy } from 'react';
import { TbSearch } from 'react-icons/tb';
import { useMediaQuery } from 'react-responsive';
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { useTranslation } from 'react-i18next';

// redux
import { useSelector } from "react-redux";

// context
import { AppContext } from '@context/AppContext';

// components
import Navbar from '@components/navbar/Navbar';
import Title from '@components/typography/Title';
import Footer from '@components/footer/Footer';
import CuisineCarousel from '@components/CuisineCarousel';
import CardsCategory from '@components/card/CardsCategory';
import RestaurantCard from '@components/card/RestaurantCard';
import Button from '@components/button/Button';
import Header from '@components/header/Header';
const FloatingButton = lazy(() => import('@components/button/FloatingButton'))

const Ordini = () => {
  const { selectedCuisine, setSelectedCuisine } = useContext(AppContext);

  const [searchText, setSearchText] = useState('');
  const [itemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [showAllItems, setShowAllItems] = useState(false);

  const inputRef = useRef(null);

  const { t } = useTranslation();

  // redux
  const cuisineDataMap = useSelector((state) => state.ristoranti);
  const cuisineImages = useSelector((state) => state.cuisine);

  // media queries
  const isAtLeastTablet = useMediaQuery({ query: '(min-width: 768px)' });
  const isCarouselMediaQuery = useMediaQuery({ query: '(max-width: 1200px)' });
  const isPaginationVisible = useMediaQuery({ query: '(min-width: 990px)' });

  // earch filter based on the selected cuisine
  const localiFiltrati = useMemo(() => {
    return cuisineDataMap[selectedCuisine] || [];
  }, [cuisineDataMap, selectedCuisine]);

  // search filter function
  const filterLocali = useCallback((locali) => {
    return locali.filter((ristorante) =>
      ristorante.name.toLowerCase().includes(searchText.toLowerCase()) ||             // .. name
      ristorante.address.street.toLowerCase().includes(searchText.toLowerCase()) ||  // .. street
      ristorante.address.city.toLowerCase().includes(searchText.toLowerCase())      // .. city
    );
  }, [searchText]);

  // at page load, set focus on the search field
  const focusInputFunction = useCallback(() => {
    if (!isAtLeastTablet) return;  // blocks the focus on mobile devices for better UX
    inputRef.current.focus()
  }, []);

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
  useEffect(() => { checkHasNextPage(); }, [checkHasNextPage]);

  // reset the initial page when selecting a new category or using the search filter via the input field
  useEffect(() => { setCurrentPage(1); }, [selectedCuisine, searchText]);

  // function to handle restaurant cards
  const renderRestaurantCards = () => {
    const restaurantsToRender = showAllItems
      ? filterLocali(localiFiltrati) // .. show all items
      : isPaginationVisible
        ? getCurrentPageItems()
        : filterLocali(localiFiltrati);

    return restaurantsToRender.map((ristorante) => (
      <RestaurantCard key={`${selectedCuisine}_` + ristorante.id} ristorante={ristorante} />
    ));
  };

  return (
    <>
      <Navbar />
      <div onClick={focusInputFunction}>
        <Header bgSRC={'assets/img/hero.webp'} small />
        <div className="mt-10 text-center select-none">
          <Title>{t('pages.orders.title')}</Title>
        </div>
        <div className="mt-6 select-none overflow-x-hidden">
          {
            isCarouselMediaQuery ?
              <>
                <div className="container w-max-[987px] mx-auto px-2.5 h-fit">
                  <CuisineCarousel
                    setSelectedCuisine={setSelectedCuisine}
                    images={cuisineImages}
                  />
                </div>
              </>
              :
              <>
                <div className='container w-full mx-auto mt-10'>
                  <div className='flex justify-around max-w-[987px] mx-auto gap-2'>
                    {
                      cuisineImages.map(({ id, src, title }) => (
                        <CardsCategory
                          key={'card_cuisine_' + id}
                          imgSRC={src}
                          title={title}
                          setSelectedCuisine={setSelectedCuisine}
                        />
                      ))
                    }
                  </div>
                </div>
              </>
          }
        </div>
        <div className="mt-10 lg:mt-5">
          <div className='max-w-[987px] mx-auto'>
            <div className='container px-3 mx-auto sm:px-2 md:px-2 lg:px-0'>
              <div className="flex items-center w-full px-4 mx-auto mb-5 border-2 rounded-full border-slate-200 hover:border-slate-300">
                <div className="mr-3">
                  <TbSearch size={22} className='text-primary' />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  className="p-2 my-2 placeholder-gray-400 border-transparent outline-none"
                  placeholder={t('pages.orders.searchForRestaurant')}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
            <div className={`flex flex-wrap ${searchText.length === 0 ? 'justify-center' : 'justify-start'} gap-2 mt-8`} key={`restaurant_container_search_${searchText}`}>
              {/* restaurant cards */}
              {renderRestaurantCards()}
            </div>
            {/* pagination control - starting from 800px.. */}
            {isPaginationVisible & (filterLocali(localiFiltrati).length > itemsPerPage) ?
              <>
                <div className='flex justify-between mt-8'>
                  <div>
                    <Button
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setCurrentPage(1);
                        setShowAllItems(!showAllItems);
                      }}
                      type="button"
                      className="p-1 px-5 text-black rounded-md bg-slate-200"
                    >
                      {showAllItems ? t('common.hide') : t('common.showAll')}
                    </Button>
                  </div>
                  {
                    !showAllItems ?
                      <div className="flex gap-4">
                        <Button
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
                          }}
                          disabled={currentPage === 1}
                          type="button"
                          className={`bg-slate-200 text-black p-1 px-5 rounded-md ${currentPage === 1 ? 'opacity-50' : ''}`}
                        >
                          <MdArrowBackIos />
                        </Button>

                        <Button
                          onClick={(event) => {
                            setCurrentPage((prevPage) => {
                              event.preventDefault();
                              event.stopPropagation();
                              if (prevPage * itemsPerPage < filterLocali(localiFiltrati).length) {
                                return prevPage + 1;
                              } else {
                                return prevPage;
                              }
                            });
                          }}
                          type="button"
                          disabled={!hasNextPage}
                          className={`bg-slate-200 text-black p-1 px-5 rounded-md ${!hasNextPage ? 'opacity-50' : ''}`}
                        >
                          <MdArrowForwardIos />
                        </Button>
                      </div> : null
                  }
                </div>
              </> : null
            }
          </div>
        </div>
      </div>
      <Suspense fallback={null}>
        <FloatingButton scrollThreshold={600} />
      </Suspense>
      <Footer />
    </>
  )
};

export default Ordini;
