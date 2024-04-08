import { configureStore } from '@reduxjs/toolkit';

// slices
import ristorantiSlice from '@redux/slices/ristorantiSlice';
import cuisineSlice from '@redux/slices/cuisineSlice';
import selectedRestaurantIDSlice from '@redux/slices/selectedRestaurantIDSlice';
import cartSlice from '@redux/slices/cartSlice';

const store = configureStore({
  reducer: {
    ristoranti: ristorantiSlice,
    cuisine: cuisineSlice,
    selectedRestaurantID: selectedRestaurantIDSlice,
    cart: cartSlice
  }
});

export default store