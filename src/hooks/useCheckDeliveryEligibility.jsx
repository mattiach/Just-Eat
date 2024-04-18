import { useEffect, useState } from 'react';

// custom hook to check eligibility for delivery
const useCheckDeliveryEligibility = (cart) => {
  const [isEligible, setIsEligible] = useState(false);

  useEffect(() => {
    let total = 0;
    let minOrder = 0;

    if (!cart.length > 0) {
      setIsEligible(false);
      return;
    }

    // calculate the total order amount by summing the price of each product multiplied by its quantity
    total = cart.reduce((acc, cartItem) => {
      return acc + cartItem.products.reduce((subTotal, product) => {
        return subTotal + product.price * product.quantity;
      }, 0);
    }, 0);

    // retrieve the minimum order amount from the cart's restaurant shipping information
    minOrder = cart[0].restaurantShipping.minOrder;

    // check if the total order amount is greater than or equal to the minimum order amount
    setIsEligible(total >= minOrder);
  }, [cart]);

  return isEligible; // returns a boolean value
};

export default useCheckDeliveryEligibility;
