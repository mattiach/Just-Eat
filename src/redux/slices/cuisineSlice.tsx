import { createSlice } from "@reduxjs/toolkit";
import { cuisineImages } from "@/settings/const";

// reducer
const cuisineSlice = createSlice({
  name: "cuisineImages",
  initialState: cuisineImages,
  reducers: {},
});

export default cuisineSlice.reducer;
// export const { } = cuisineSlice.actions;
