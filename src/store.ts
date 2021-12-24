import { configureStore } from "@reduxjs/toolkit";
import cursorSlice from "./cursor/slice";
import tabulatureSlice from "./tab/slice";

export const store = configureStore({
  reducer: { cursor: cursorSlice, tabulature: tabulatureSlice },
});

export type RootState = ReturnType<typeof store.getState>;
