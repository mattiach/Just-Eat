import { useState, useEffect, useRef, useMemo, useCallback, useContext, Suspense, lazy } from 'react';
import { TbSearch } from 'react-icons/tb';
import { useMediaQuery } from 'react-responsive';
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";

// redux
import { useSelector } from "react-redux";

// context
import { AppContext } from '../context/AppContext';

// components
import Navbar from '../components/navbar/Navbar';
import HeroOrders from '../components/header/HeroOrders';
import Title from '../components/typography/Title';
import Footer from '../components/footer/Footer';
import CuisineCarousel from '../components/CuisineCarousel';
import CardsCategory from '../components/card/CardsCategory';
import RestaurantCard from '../components/card/RestaurantCard';
import Button from '../components/button/Button';
const FloatingButton = lazy(() => import('../components/button/FloatingButton'))

const Ordini = () => {
    const { selectedCuisine, setSelectedCuisine } = useContext(AppContext);

    const [searchText, setSearchText] = useState('');
    const [itemsPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [showAllItems, setShowAllItems] = useState(false);

    const inputRef = useRef(null);

    // redux
    const cuisineDataMap = useSelector((state) => state.ristoranti);
    const cuisineImages = useSelector((state) => state.cuisine);

    // media queries
    const isCarouselMediaQuery = useMediaQuery({ query: '(max-width: 1200px)' });
    const isPaginationVisible = useMediaQuery({ query: '(min-width: 990px)' });

    // filtro di ricerca in base alla cucina selezionata
    const localiFiltrati = useMemo(() => {
        return cuisineDataMap[selectedCuisine] || [];
    }, [cuisineDataMap, selectedCuisine]);

    // funzione di filtro di ricerca 
    const filterLocali = useCallback((locali) => {
        return locali.filter((ristorante) =>
            ristorante.name.toLowerCase().includes(searchText.toLowerCase()) ||             // .. per nome
            ristorante.address.street.toLowerCase().includes(searchText.toLowerCase()) ||  // .. per via
            ristorante.address.city.toLowerCase().includes(searchText.toLowerCase())      // .. per città
        );
    }, [searchText]);

    // al caricamento della pagina imposta il focus sul campo di ricerca
    const focusInputFunction = useCallback(() => { inputRef.current.focus() }, []);

    // ottiene i ristoranti attualmente mostrati nella pagina
    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filterLocali(localiFiltrati).slice(startIndex, endIndex);
    };

    // gestisce se ci sono altre pagine da mostrare 
    const checkHasNextPage = useCallback(() => {
        const totalItems = filterLocali(localiFiltrati).length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        setHasNextPage(currentPage < totalPages);
    }, [currentPage, itemsPerPage, filterLocali, localiFiltrati]);

    // richiama la funzione "checkHasNextPage" per assicurarsi che lo stato sia aggiornato
    useEffect(() => { checkHasNextPage(); }, [checkHasNextPage]);

    // reimposta la pagina iniziale alla selezione di una nuova categoria o del filtro di ricerca tramite il campo input
    useEffect(() => { setCurrentPage(1); }, [selectedCuisine, searchText]);

    // funzione per gestire le cards dei ristoranti 
    const renderRestaurantCards = () => {
        const restaurantsToRender = showAllItems
            ? filterLocali(localiFiltrati) // .. mostra tutti gli elementi
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
                <HeroOrders />
                <div className="mt-10 text-center select-none">
                    <Title>Di cosa hai voglia ?</Title>
                </div>
                <div className="mt-6 select-none">
                    {
                        isCarouselMediaQuery ?
                            <>
                                <div className="container w-max-[987px] mx-auto px-2.5">
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
                                    placeholder="Cerca per ristorante .."
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={`flex flex-wrap ${searchText.length === 0 ? 'justify-center' : 'justify-start'} gap-2 mt-8`} key={`restaurant_container_search_${searchText}`}>
                            {/* restaurant cards */}
                            {renderRestaurantCards()}
                        </div>
                        {/* pagination control - visibili da 800px in poi */}
                        {isPaginationVisible & (filterLocali(localiFiltrati).length > itemsPerPage) ?
                            <>
                                <div className='flex justify-between mt-8'>
                                    <div>
                                        <Button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCurrentPage(1);
                                                setShowAllItems(!showAllItems);
                                            }}
                                            type="button"
                                            className="p-1 px-5 text-black rounded-md bg-slate-200"
                                        >
                                            {showAllItems ? "Nascondi" : "Mostra Tutti"}
                                        </Button>
                                    </div>
                                    {
                                        !showAllItems ?
                                            <div className="flex gap-4">
                                                <Button
                                                    onClick={(event) => {
                                                        event.preventDefault();
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
