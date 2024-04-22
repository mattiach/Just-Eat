// calculate the total price of the items in the cart, including delivery costs
export function calculateCartTotal(cart) {
  let totalPrice = 0;

  cart.forEach((restaurant) => {
    restaurant.products.forEach((product) => {
      const productsPrice = product.price * product.quantity;
      const delivery = restaurant.restaurantShipping.shippingCost
      totalPrice += productsPrice + delivery;
    });
  });

  return totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });
}
