import { createSlice } from "@reduxjs/toolkit";
import type { Restaurant } from "@/interfaces/const";

// data
import pizza from "@/data/pizza.json";
import sushi from "@/data/sushi.json";
import hamburger from "@/data/hamburger.json";
import italiano from "@/data/italiano.json";
import giapponese from "@/data/giapponese.json";
import fritti from "@/data/fritti.json";
import cinese from "@/data/cinese.json";

interface RistorantiState {
  pizza: Restaurant[];
  sushi: Restaurant[];
  hamburger: Restaurant[];
  italiano: Restaurant[];
  giapponese: Restaurant[];
  fritti: Restaurant[];
  cinese: Restaurant[];
}

const initialState: RistorantiState = {
  pizza,
  sushi,
  hamburger,
  italiano,
  giapponese,
  fritti,
  cinese,
};

const ristorantiSlice = createSlice({
  name: "ristoranti",
  initialState,
  reducers: {},
});

export default ristorantiSlice.reducer;
// export const { } = ristorantiSlice.actions;
