import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cursor } from "./cursor";
import { Tabulature } from "../tab/types";

type MoveCursorPayload = {
  tab: Tabulature;
};

const cursorSlice = createSlice({
  name: "cursor",
  initialState: { stringNo: 0, position: 0 } as Cursor,
  reducers: {
    up: (state, action: PayloadAction<MoveCursorPayload>) => {
      if (state.stringNo > 0) {
        state.stringNo -= 1;
      }
    },
    down: (state, action: PayloadAction<MoveCursorPayload>) => {
      if (state.stringNo + 1 < action.payload.tab.stringCount)
        state.stringNo += 1;
    },
    left: (state, action: PayloadAction<MoveCursorPayload>) => {
      if (state.position > 0) {
        state.position -= 1;
      }
    },
    right: (state, action: PayloadAction<MoveCursorPayload>) => {
      if (action.payload.tab.contents.length > state.position + 1) {
        state.position += 1;
      }
    },
    goTo: (state, action: PayloadAction<Cursor>) => {
      state.position = action.payload.position;
      state.stringNo = action.payload.stringNo;
    },
  },
});

export const { up, down, left, right, goTo } = cursorSlice.actions;
export default cursorSlice.reducer;
