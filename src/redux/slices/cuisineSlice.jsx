import { createSlice } from '@reduxjs/toolkit';

// data
import { cuisineImages } from '@data/cuisineImages';

// reducer
const cuisineSlice = createSlice({
  name: 'cuisineImages',
  initialState: cuisineImages,
  reducers: {},
});

export default cuisineSlice.reducer;
// export const { } = cuisineSlice.actions;  