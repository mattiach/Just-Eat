import { configureStore } from '@reduxjs/toolkit';

// slices
import ristorantiSlice from '@/redux/slices/ristorantiSlice';
import cuisineSlice from '@/redux/slices/cuisineSlice';
import selectedRestaurantIDSlice from '@/redux/slices/selectedRestaurantIDSlice';
import cartSlice from '@/redux/slices/cartSlice';
import userSlice from '@/redux/slices/userSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    ristoranti: ristorantiSlice,
    cuisine: cuisineSlice,
    selectedRestaurantID: selectedRestaurantIDSlice,
    cart: cartSlice,
    user: userSlice,
  }
});

export default store;
