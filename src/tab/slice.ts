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

type SetActionPayload = {
  position: number;
  string_no: number;
  fret: number;
};

const TabulatureSlice = createSlice({
  name: "tabulature",
  initialState: defaultTab,
  reducers: {
    setTabulature: (state, action: PayloadAction<Tabulature>) => {
      state = action.payload;
    },
    set: (state, action: PayloadAction<SetActionPayload>) => {
      const { position, fret, string_no } = action.payload;
      const pos = state.contents[position];
      const symbols = pos.symbols;

      const idx = symbols.findIndex((s) => s.string_no === string_no);

      if (idx === -1) {
        symbols.push({ string_no, fret });
      } else {
        symbols[idx] = { string_no, fret };
      }
    },
  },
});

export const { setTabulature, set } = TabulatureSlice.actions;
export default TabulatureSlice.reducer;
