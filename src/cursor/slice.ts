import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cursor } from "./cursor";

const cursorSlice = createSlice({
  name: "cursor",
  initialState: { string_no: 0, position: 0 } as Cursor,
  reducers: {
    up: (state) => {
      state.string_no -= 1;
    },
    down: (state) => {
      state.string_no += 1;
    },
    left: (state) => {
      state.position -= 1;
    },
    right: (state) => {
      state.position += 1;
    },
    goTo: (state, action: PayloadAction<Cursor>) => {
      state.position = action.payload.position;
      state.string_no = action.payload.string_no;
    },
  },
});

export const { up, down, left, right, goTo } = cursorSlice.actions;
export default cursorSlice.reducer;
