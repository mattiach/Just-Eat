import { createSlice } from '@reduxjs/toolkit';

// selector that takes the selected id and returns the corresponding restaurant object
export const selectSelectedRestaurant = (idSelected) => (state) => {
  const ristoranti = state.ristoranti;
  const allRistoranti = Object.values(ristoranti).flat();

  const selectedRistorante = allRistoranti.find((ristorante) => ristorante.id === idSelected);

  if (selectedRistorante) {
    return selectedRistorante;
  } else {
    window.location.href = '/ordini';
    return null;
  }
};

const selectedRestaurantIDSlice = createSlice({
  name: 'selectedRestaurant',
  initialState: null,
  reducers: {
    setSelectedRestaurant: (state, action) => {
      return action.payload;
    },
  },
});

export default selectedRestaurantIDSlice.reducer;
export const { setSelectedRestaurant } = selectedRestaurantIDSlice.actions;
