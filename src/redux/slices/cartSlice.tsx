"use client";

import { RestaurantOrder } from "@/interfaces/const";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartState = RestaurantOrder[];

const getInitialCartState = (): CartState => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

const initialState: CartState = getInitialCartState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // reduxer to add a product to the cart. If the product already exists in the cart, increase its quantity by 1. Otherwise, add the product to the cart with a quantity of 1.
    addToCart(state, action: PayloadAction<RestaurantOrder>) {
      const { payload: orderToAdd } = action;

      const existingRestaurant = state.find(
        (item) => item.restaurant.id === orderToAdd.restaurant.id
      );

      if (existingRestaurant) {
        orderToAdd.products.forEach((productToAdd) => {
          const existingProduct = existingRestaurant.products.find(
            (product) => product.name === productToAdd.name
          );

          if (existingProduct) {
            existingProduct.quantity += 1;
          } else {
            existingRestaurant.products.push({
              name: productToAdd.name,
              price: productToAdd.price,
              quantity: 1,
            });
          }
        });
      } else {
        state.push({
          restaurant: orderToAdd.restaurant,
          products: orderToAdd.products.map((product) => ({
            name: product.name,
            price: product.price,
            quantity: 1,
          })),
        });
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },
    // function to remove a product from the cart. When the quantity of the product in the cart is 0, it will automatically removed from the cart
    removeFromCart(state, action: PayloadAction<RestaurantOrder>) {
      const { payload: productToRemove } = action;

      const existingRestaurantIndex = state.findIndex(
        (item) => item.restaurant.id === productToRemove.restaurant.id
      );

      if (existingRestaurantIndex !== -1) {
        const existingRestaurant = state[existingRestaurantIndex];

        productToRemove.products.forEach((product) => {
          const existingProductIndex = existingRestaurant.products.findIndex(
            (p) => p.name === product.name
          );

          if (existingProductIndex !== -1) {
            existingRestaurant.products[existingProductIndex].quantity -= 1;

            if (
              existingRestaurant.products[existingProductIndex].quantity === 0
            ) {
              existingRestaurant.products.splice(existingProductIndex, 1);
            }
          }
        });

        if (existingRestaurant.products.length === 0) {
          state.splice(existingRestaurantIndex, 1);
        }

        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    // function to remove all products from the cart
    removeAllFromCart(state) {
      state.splice(0, state.length);
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, removeAllFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
