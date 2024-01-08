import { configureStore } from '@reduxjs/toolkit';

// slices
import ristorantiSlice from './slices/ristorantiSlice';
import cuisineSlice from './slices/cuisineSlice';
import selectedRestaurantIDSlice from './slices/selectedRestaurantIDSlice';

const store = configureStore({
  reducer: {
    ristoranti: ristorantiSlice,
    cuisine: cuisineSlice,
    selectedRestaurantID: selectedRestaurantIDSlice,
  }
});

export default store