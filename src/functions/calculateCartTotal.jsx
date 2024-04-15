export function calculateCartTotal(cart) {
  let totalPrice = 0;

  cart.forEach((restaurant) => {
    restaurant.products.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });
  });

  return totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });
}