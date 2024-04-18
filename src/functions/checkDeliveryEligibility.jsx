// Function to check eligibility for delivery
export const checkDeliveryEligibility = (cart) => {
  let total = 0;
  let minOrder = 0;

  if (!cart.length > 0) return false;

  // Calculate the total order amount by summing the price of each product multiplied by its quantity
  total = cart.reduce((acc, cartItem) => {
    return acc + cartItem.products.reduce((subTotal, product) => {
      return subTotal + product.price * product.quantity;
    }, 0);
  }, 0);

  // Retrieve the minimum order amount from the cart's restaurant shipping information
  minOrder = cart[0].restaurantShipping.minOrder;

  // Check if the total order amount is greater than or equal to the minimum order amount
  return total >= minOrder; // Returns a boolean value
};
