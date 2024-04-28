import { createSlice } from '@reduxjs/toolkit';

// data
import pizza from '@data/pizza.json';
import sushi from '@data/sushi.json';
import hamburger from '@data/hamburger.json';
import italiano from '@data/italiano.json';
import giapponese from '@data/giapponese.json';
import fritti from '@data/fritti.json';
import cinese from '@data/cinese.json';

const initialState = {
  pizza,
  sushi,
  hamburger,
  italiano,
  giapponese,
  fritti,
  cinese
};

// reducer
const ristorantiSlice = createSlice({
  name: 'ristoranti',
  initialState,
  reducers: {},
});

export default ristorantiSlice.reducer;
// export const { } = ristorantiSlice.actions;