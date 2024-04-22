// calculate the total price of products in a restaurant's cart
export const calculateRestaurantTotal = (cartItem) => {
  return cartItem.products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
};
