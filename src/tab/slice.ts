import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tabulature } from "./types";

const defaultTab: Tabulature = {
  contents: [
    { symbols: [{ string_no: 5, fret: 5 }] },
    { symbols: [{ string_no: 5, fret: 8 }] },
    { symbols: [{ string_no: 4, fret: 5 }] },
    { symbols: [{ string_no: 4, fret: 7 }] },
    { symbols: [{ string_no: 3, fret: 5 }] },
    { symbols: [{ string_no: 3, fret: 7 }] },
    { symbols: [{ string_no: 2, fret: 5 }] },
    { symbols: [{ string_no: 2, fret: 7 }] },
    { symbols: [{ string_no: 1, fret: 5 }] },
    { symbols: [{ string_no: 1, fret: 8 }] },
    { symbols: [{ string_no: 0, fret: 5 }] },
    { symbols: [{ string_no: 0, fret: 8 }] },
  ],
};

const Tabulature = createSlice({
  name: "tabulature",
  initialState: defaultTab,
  reducers: {
    setTabulature: (state, action: PayloadAction<Tabulature>) => {
      state = action.payload;
    },
    put: (state, action) => {},
  },
});

export const { setTabulature } = Tabulature.actions;
export default Tabulature.reducer;
