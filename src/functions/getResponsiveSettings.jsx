// function to return responsive settings for a slider based on different breakpoints
export const getResponsiveSettings = (settings) => {
  return [
    {
      breakpoint: 1200,
      settings: {
        ...settings,
        slidesToShow: 8,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 991,
      settings: {
        ...settings,
        slidesToShow: 6,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 767,
      settings: {
        ...settings,
        slidesToShow: 6,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 575,
      settings: {
        ...settings,
        slidesToShow: 4,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 479,
      settings: {
        ...settings,
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
  ];
}