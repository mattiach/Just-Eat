import { createSlice } from '@reduxjs/toolkit';

// selettore che prende l'id selezionato e restituisce l'oggetto del ristorante corrispondente
export const selectSelectedRestaurant = (idSelected) => (state) => {
  const ristoranti = state.ristoranti;
  const allRistoranti = Object.values(ristoranti).flat();
  return allRistoranti.find((ristorante) => ristorante.id === idSelected) || null;
  // .. utilizzare questo nei componenti ==> const selectedRestaurant = useSelector(selectSelectedRestaurant(id));
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
