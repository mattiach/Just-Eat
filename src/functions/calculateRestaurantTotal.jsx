export const calculateRestaurantTotal = (cartItem) => {
  return cartItem.products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
};
