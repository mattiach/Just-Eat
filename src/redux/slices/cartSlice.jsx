import { createSlice } from '@reduxjs/toolkit';

const storedCart = localStorage.getItem('cart');
const initialState = storedCart ? JSON.parse(storedCart) : [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // reduxer to add a product to the cart. If the product already exists in the cart, increase its quantity by 1. Otherwise, add the product to the cart with a quantity of 1.
    addToCart(state, action) {
      const { payload: productToAdd } = action;
      const existingRestaurant = state.find(item => item.restaurantId === productToAdd.restaurantId);
      if (existingRestaurant) {
        const existingProduct = existingRestaurant.products.find(product => product.name === productToAdd.products.name);
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          existingRestaurant.products.push({
            name: productToAdd.products.name,
            price: productToAdd.products.price,
            quantity: 1
          });
        }
      } else {
        const {
          restaurantId,
          restaurantCategory,
          restaurantName,
          restaurantAddress,
          restaurantImage,
          restaurantShipping,
          products: { name, price }
        } = productToAdd;

        state.push({
          restaurantId,
          restaurantCategory,
          restaurantName,
          restaurantAddress,
          restaurantImage,
          restaurantShipping,
          products: [{
            name,
            price,
            quantity: 1
          }]
        });
      }

      localStorage.setItem('cart', JSON.stringify(state));
    },
    // function to remove a product from the cart. When the quantity of the product in the cart is 0, it will automatically removed from the cart
    removeFromCart(state, action) {
      const { payload: productToRemove } = action;
      const existingRestaurantIndex = state.findIndex(item => item.restaurantId === productToRemove.restaurantId);

      if (existingRestaurantIndex !== -1) {
        const existingRestaurant = state[existingRestaurantIndex];
        const existingProductIndex = existingRestaurant.products.findIndex(product => product.name === productToRemove.products.name);

        if (existingProductIndex !== -1) {
          existingRestaurant.products[existingProductIndex].quantity -= 1;

          if (existingRestaurant.products[existingProductIndex].quantity === 0) {
            existingRestaurant.products.splice(existingProductIndex, 1);
          }

          if (existingRestaurant.products.length === 0) {
            state.splice(existingRestaurantIndex, 1);
          }

          localStorage.setItem('cart', JSON.stringify(state));
        }
      }
    },
    // function to remove all products from the cart
    removeAllFromCart(state) {
      state.splice(0, state.length);
      localStorage.setItem('cart', JSON.stringify(state));
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  removeAllFromCart,
  increaseQuantityInCart,
  decreaseQuantityInCart
} = cartSlice.actions;
export default cartSlice.reducer;
