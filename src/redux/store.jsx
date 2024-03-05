import { configureStore } from '@reduxjs/toolkit';

// slices
import ristorantiSlice from './slices/ristorantiSlice';
import cuisineSlice from './slices/cuisineSlice';
import selectedRestaurantIDSlice from './slices/selectedRestaurantIDSlice';
import cartSlice from './slices/cartSlice';

const store = configureStore({
  reducer: {
    ristoranti: ristorantiSlice,
    cuisine: cuisineSlice,
    selectedRestaurantID: selectedRestaurantIDSlice,
    cart: cartSlice
  }
});

export default store