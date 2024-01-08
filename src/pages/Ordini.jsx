import { useState, useEffect, useRef } from 'react';
import { TbSearch } from 'react-icons/tb';
import { useMediaQuery } from 'react-responsive';

// redux
import { useSelector } from "react-redux";

// components
import Navbar from '../components/navbar/Navbar';
import HeroOrders from '../components/header/HeroOrders';
import Title from '../components/title/title';
import Footer from '../components/footer/Footer';
import CuisineCarousel from '../components/carousel/CuisineCarousel';
import CardsCategory from '../components/card/CardsCategory';
import RestaurantCard from '../components/card/RestaurantCard';

const Ordini = () => {
    const isCarouselMediaQuery = useMediaQuery({ query: '(max-width: 1200px)' });

    const [selectedCuisine, setSelectedCuisine] = useState('pizza');
    const [searchText, setSearchText] = useState('');
    const [initialRender, setInitialRender] = useState(true);

    const inputRef = useRef(null);

    const cuisineDataMap = useSelector((state) => state.ristoranti);
    const cuisineImages = useSelector((state) => state.cuisine);

    let localiFiltrati = [];
    localiFiltrati = cuisineDataMap[selectedCuisine] || [];

    // // funzione di ricerca / filtro tramite input
    const filterLocali = (locali) => {
        return locali.filter((ristorante) =>
            ristorante.name.toLowerCase().includes(searchText.toLowerCase()) ||  // per nome
            ristorante.address.street.toLowerCase().includes(searchText.toLowerCase()) || // per indirizzo
            ristorante.address.city.toLowerCase().includes(searchText.toLowerCase())  // per città
        );
    };

    // funzione per correggere l'errore dello scroll a metà pagina durante il routing
    useEffect(() => {
        if (initialRender) {
            setInitialRender(false);
        } else {
            window.scrollTo(0, 0);
        }
    }, [initialRender]);

    // funzione per impostare il focus sempre sull'input di ricerca
    const focusInputFunction = () => {
        inputRef.current.focus();
    };

    return (
        <>
            <Navbar />
            <div onClick={focusInputFunction}>
                <HeroOrders />
                <div className="text-center mt-10">
                    <Title>Di cosa hai voglia ?</Title>
                </div>
                <div className='mt-6'>
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
                <div className='mt-10 lg:mt-5'>
                    <div className='max-w-[987px] mx-auto'>
                        <div className='mx-auto px-3 sm:px-2 md:px-2 lg:px-0 container'>
                            <div className="w-full mb-5 mx-auto px-4 border-2 border-slate-200 hover:border-slate-300 rounded-full flex items-center">
                                <div className="mr-3">
                                    <TbSearch size={22} className='text-primary' />
                                </div>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="p-2 border-transparent outline-none placeholder-gray-400"
                                    placeholder="Cerca per ristorante .."
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={`flex flex-wrap ${searchText.length === 0 ? 'justify-center' : 'justify-start'} gap-2 mt-8`} key={`restaurant_container_search_${searchText}`}>
                            {
                                filterLocali(localiFiltrati).map((ristorante) => (
                                    <RestaurantCard
                                        searchText={searchText}
                                        key={`${selectedCuisine}_` + ristorante.id}
                                        ristorante={ristorante}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Ordini