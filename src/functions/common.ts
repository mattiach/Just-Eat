import { RestaurantOrder } from "@/interfaces/const";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const getCurrentYear = () => {
  return new Date().getFullYear();
}

export function changeLanguageFunction(locale: string, router: AppRouterInstance) {
  return (language: string) => {
    const newUrl = window.location.pathname.replace(
      `/${locale}`,
      `/${language}`
    );
    router.push(newUrl);
  };
}

// function to return responsive settings for a slider based on different breakpoints
export const getResponsiveSettings = () => {
  return [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 479,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ];
}

export function scrollToTopFunction() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// function to format the given amount as a currency
export const formatCurrency = (amount: number, currency = 'EUR') => {
  return amount.toLocaleString('it-IT', {
    style: 'currency',
    currency: currency
  });
};

// function that returns the quantity of a specific product as a number
export const getProductQuantity = (cart: RestaurantOrder[]) => {
  return (productName: string, restaurantId: string): number => {
    // find the restaurant specified in the cart
    const restaurantOrder = cart.find(
      (order) => order.restaurant.id === restaurantId
    );

    if (!restaurantOrder) {
      // if the restaurant is not found, return 0
      return 0;
    }

    // find the specified product within the restaurant
    const product = restaurantOrder.products.find(
      (p) => p.name === productName
    );

    if (!product) {
      // if the product is not found, return 0
      return 0;
    }

    // return the quantity of the product
    return product.quantity;
  };
}

// calculate the total price of the items in the cart, including delivery costs
export const calculateCartTotal = (cart: RestaurantOrder[]) => {
  let totalPrice = 0;

  cart.forEach((restaurant: RestaurantOrder) => {
    restaurant.products.forEach((product) => {
      const productsPrice = product.price * product.quantity;
      const delivery = restaurant.restaurant.shippingCost.shippingCost || 0;

      totalPrice += productsPrice + delivery;
    });
  });

  return totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' }); // output => 18.20€
}

export const calculateCartTotalRaw = (cart: RestaurantOrder[]) => {
  let totalPrice = 0;

  cart.forEach((restaurant: RestaurantOrder) => {
    restaurant.products.forEach((product) => {
      const productsPrice = product.price * product.quantity;
      const delivery = restaurant.restaurant.shippingCost.shippingCost || 0;

      totalPrice += productsPrice + delivery;
    });
  });

  return parseFloat(totalPrice.toFixed(2)); // output => 18.20
}

// calculate the total price of products in a restaurant's cart
export const calculateRestaurantTotal = (cartItem: RestaurantOrder) => {
  const productTotal = cartItem.products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const shippingCost = cartItem.restaurant.shippingCost.shippingCost || 0;

  return productTotal + shippingCost;
};
