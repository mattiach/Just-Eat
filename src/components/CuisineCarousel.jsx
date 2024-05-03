import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

// functions
import { getResponsiveSettings } from '@functions/getResponsiveSettings';

// carousel react-slick
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { carouselSettings } from '@settings/carouselSettings';

// components
import CardsCategory from '@components/card/CardsCategory';

const CuisineCarousel = ({ setSelectedCuisine, images }) => {
  // it calculates settings based on the found media-query
  const responsiveSettings = getResponsiveSettings(carouselSettings);


  const [sliderKEY, setSliderKEY] = useState('cuisine-carousel__d9f5d550-827e-69b5-f2ee-d4457ceaeefc')

  useEffect(() => {
    // generate a new UUID every time the window width changes
    const handleResize = () => {
      const randomUUID = uuid();
      setSliderKEY(randomUUID);
    };

    // add the event listener on component mount
    window.addEventListener('resize', handleResize);

    // .. remove the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Slider
      key={`CuisineCarousel.jsx_${sliderKEY}`}
      {...carouselSettings}
      responsive={responsiveSettings}
    >
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