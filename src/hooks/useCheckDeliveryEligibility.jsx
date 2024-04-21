import { useEffect, useState } from 'react';

// custom hook to check eligibility for delivery
const useCheckDeliveryEligibility = (cart) => {
  const [isEligible, setIsEligible] = useState(true);

  useEffect(() => {
    if (!cart.length > 0) {
      setIsEligible(false);
      return;
    }

    // loop through each item in the cart
    for (let i = 0; i < cart.length; i++) {
      const cartItem = cart[i];
      const total = cartItem.products.reduce((acc, product) => {
        const delivery = cartItem.restaurantShipping.shippingCost;
        const totalPriceItems = product.price * product.quantity;
        return acc + totalPriceItems + delivery;
      }, 0);

      // check if the total order amount is greater than or equal to the minimum order amount
      if (total < cartItem.restaurantShipping.minOrder) {
        setIsEligible(false);
        return; // exit loop if one restaurant doesn't meet the condition and set isEligible to false
      }
    }

    // if all restaurants meet the condition, set isEligible to true
    setIsEligible(true);
  }, [cart]);

  return isEligible; // returns a boolean value
};

export default useCheckDeliveryEligibility;
