import { RestaurantOrder } from '@/interfaces/const';
import { useEffect, useState } from 'react';

// custom hook to check eligibility for delivery
const useCheckDeliveryEligibility = (cart: RestaurantOrder[]) => {
  const [isEligible, setIsEligible] = useState(true);

  useEffect(() => {
    if (!cart || cart.length === 0) {
      setIsEligible(false);
      return;
    }

    for (let i = 0; i < cart.length; i++) {
      const cartItem = cart[i];

      if (!cartItem.restaurant.shippingCost) {
        setIsEligible(false);
        return;
      }

      const total = cartItem.products.reduce((acc, product) => {
        const delivery = cartItem.restaurant.shippingCost.shippingCost || 0;
        const totalPriceItems = product.price * product.quantity;
        return acc + totalPriceItems + delivery;
      }, 0);


      // check if the total order amount is greater than or equal to the minimum order amount
      if (total < cartItem.restaurant.shippingCost.minOrder) {
        setIsEligible(false);
        return; // .. exit loop if one restaurant doesn't meet the condition and set isEligible to false
      }
    }

    // if all restaurants meet the condition, set isEligible to true
    setIsEligible(true);
  }, [cart]);

  return isEligible; // returns a boolean value
};

export default useCheckDeliveryEligibility;
