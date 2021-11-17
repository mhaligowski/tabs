import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cursor } from "./cursor";

const cursorSlice = createSlice({
  name: "cursor",
  initialState: { stringNo: 0, position: 0 } as Cursor,
  reducers: {
    up: (state) => {
      console.log(state);
      state.stringNo -= 1;
    },
    down: (state) => {
      state.stringNo += 1;
    },
    left: (state) => {
      state.position -= 1;
    },
    right: (state) => {
      state.position += 1;
    },
    goTo: (state, action: PayloadAction<Cursor>) => {
      state.position = action.payload.position;
      state.stringNo = action.payload.stringNo;
    },
  },
});

export const { up, down, left, right, goTo } = cursorSlice.actions;
export default cursorSlice.reducer;
