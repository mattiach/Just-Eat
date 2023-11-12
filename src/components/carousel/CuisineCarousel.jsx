import { useEffect, useState } from 'react';
import uuid from 'react-uuid';

// functions
import { getResponsiveSettings } from '../../functions/getResponsiveSettings';

// carousel react-slick
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// components
import CardsCategory from '../card/CardsCategory';

const CuisineCarousel = ({ setSelectedCuisine, images }) => {
    // impostazioni carousel
    const settings = {
        dots: true,
        infinite: false,
        centerMode: false,
        centerPadding: "20px",
        lazyLoad: 'ondemand',
        speed: 300,
        slidesToShow: 1,
    };

    // Funzione che calcola le impostazioni in base alla media query trovata
    const responsiveSettings = getResponsiveSettings(settings);

    const [sliderKEY, setSliderKEY] = useState('d9f5d550-827e-69b5-f2ee-d4457ceaeefc')

    useEffect(() => {
        // Genera un nuovo UUID ogni volta che la larghezza della finestra cambia
        const handleResize = () => {
            const randomUUID = uuid();
            setSliderKEY(randomUUID);
        };

        // Aggiungi l'event listener al montaggio del componente
        window.addEventListener('resize', handleResize);

        // .. rimuovi l'event listener al smontaggio del componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Slider {...settings} responsive={responsiveSettings} key={`CuisineCarousel.jsx_${sliderKEY}`}>
            {images.map(({ id, src, title }) => (
                <CardsCategory
                    key={'mobile-carousel' + id}
                    imgSRC={src}
                    title={title}
                    setSelectedCuisine={setSelectedCuisine}
                />
            ))}
        </Slider>
    );
}

export default CuisineCarousel