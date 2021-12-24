import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tabulature } from "./types";
import { right, left } from "../cursor/slice";

const defaultTab: Tabulature = {
  stringCount: 6,
  contents: [
    { symbols: [{ stringNo: 5, fret: 5 }] },
    { symbols: [{ stringNo: 5, fret: 8 }] },
    { symbols: [{ stringNo: 4, fret: 5 }] },
    { symbols: [{ stringNo: 4, fret: 7 }] },
    { symbols: [{ stringNo: 3, fret: 5 }] },
    { symbols: [{ stringNo: 3, fret: 7 }] },
    { symbols: [{ stringNo: 2, fret: 5 }] },
    { symbols: [{ stringNo: 2, fret: 7 }] },
    { symbols: [{ stringNo: 1, fret: 5 }] },
    { symbols: [{ stringNo: 1, fret: 8 }] },
    { symbols: [{ stringNo: 0, fret: 5 }] },
    { symbols: [{ stringNo: 0, fret: 8 }] },
  ],
};

type SetActionPayload = {
  position: number;
  stringNo: number;
  fret: number;
};

type RemoveActionPayload = {
  position: number;
  stringNo: number;
};

type InsertActionPayload = {
  position: number;
};

const MoveHandler = (state: any, action: any) => {
  const { tabulature, cursor } = action.payload;
  if (tabulature.contents[cursor.position].symbols.length === 0) {
    state.contents.splice(cursor.position, 1);
  }
};

const TabulatureSlice = createSlice({
  name: "tabulature",
  initialState: defaultTab,
  reducers: {
    setTabulature: (state, action: PayloadAction<Tabulature>) => {
      Object.assign(state, action.payload);
    },
    set: (state, action: PayloadAction<SetActionPayload>) => {
      const { position, fret, stringNo } = action.payload;
      const pos = state.contents[position];
      const symbols = pos.symbols;

      const idx = symbols.findIndex((s) => s.stringNo === stringNo);

      if (idx === -1) {
        symbols.push({ stringNo, fret });
      } else {
        symbols[idx] = { stringNo, fret };
      }
    },
    remove: (state, action: PayloadAction<RemoveActionPayload>) => {
      const { position, stringNo } = action.payload;
      const pos = state.contents[position];
      state.contents[position].symbols = pos.symbols.filter(
        (s) => s.stringNo !== stringNo
      );
    },
    insert: (state, action: PayloadAction<InsertActionPayload>) => {
      const { position } = action.payload;
      state.contents.splice(position, 0, { symbols: [] });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(right, MoveHandler).addCase(left, MoveHandler);
  },
});

export const { setTabulature, set, remove, insert } = TabulatureSlice.actions;
export default TabulatureSlice.reducer;
