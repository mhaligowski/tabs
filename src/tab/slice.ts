import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tabulature } from "./types";

const defaultTab: Tabulature = {
  symbols: [
    { string_no: 5, fret: 5 },
    { string_no: 5, fret: 8 },
    { string_no: 4, fret: 5 },
    { string_no: 4, fret: 7 },
    { string_no: 3, fret: 5 },
    { string_no: 3, fret: 7 },
    { string_no: 2, fret: 5 },
    { string_no: 2, fret: 7 },
    { string_no: 1, fret: 5 },
    { string_no: 1, fret: 8 },
    { string_no: 0, fret: 5 },
    { string_no: 0, fret: 8 },
  ],
};

const Tabulature = createSlice({
  name: "tabulature",
  initialState: defaultTab,
  reducers: {
    setTabulature: (state, action: PayloadAction<Tabulature>) => {
      state = action.payload;
    },
  },
});

export const { setTabulature } = Tabulature.actions;
export default Tabulature.reducer;
