import keys from "mousetrap";
import { configureStore } from "@reduxjs/toolkit";
import { Svg, SVG } from "@svgdotjs/svg.js";

import tabulatureSlice, { setTabulature, set, remove } from "./tab/slice";
import { parseFromLocation } from "./tab/serialize";

import { Cursor } from "./cursor/cursor";
import cursorSlice, { up, down, left, right, goTo } from "./cursor/slice";
import { config } from "./config";
import { SvgRenderer } from "./render";

/**
 * Set up state management.
 */
const store = configureStore({
  reducer: { cursor: cursorSlice, tabulature: tabulatureSlice },
});

var draw: Svg = SVG()
  .addTo("#root")
  .size(600, 100 + config.verticalStringSpace * 2);

const tabToRender = parseFromLocation(window.location);
if (tabToRender) {
  store.dispatch(setTabulature(tabToRender));
}

store.dispatch(goTo({ stringNo: 5, position: 0 } as Cursor));

const renderer = new SvgRenderer(draw);
renderer.drawOrRefreshStaff(store.getState().tabulature);
renderer.drawOrRefreshTabulature(store.getState().tabulature);
renderer.refreshCursor(store.getState().cursor);

keys.bind(["up", "k"], () => {
  store.dispatch(up(store.getState()));
  renderer.drawOrRefreshStaff(store.getState().tabulature);
  renderer.drawOrRefreshTabulature(store.getState().tabulature);
  renderer.refreshCursor(store.getState().cursor);
});
keys.bind(["down", "j"], () => {
  store.dispatch(down(store.getState()));
  renderer.drawOrRefreshStaff(store.getState().tabulature);
  renderer.drawOrRefreshTabulature(store.getState().tabulature);
  renderer.refreshCursor(store.getState().cursor);
});
keys.bind(["left", "h"], () => {
  store.dispatch(left(store.getState()));
  renderer.drawOrRefreshStaff(store.getState().tabulature);
  renderer.drawOrRefreshTabulature(store.getState().tabulature);
  renderer.refreshCursor(store.getState().cursor);
});
keys.bind(["right", "l"], () => {
  store.dispatch(right(store.getState()));
  renderer.drawOrRefreshStaff(store.getState().tabulature);
  renderer.drawOrRefreshTabulature(store.getState().tabulature);
  renderer.refreshCursor(store.getState().cursor);
});

const numeric = Array.from({ length: 10 }, (_, i) => i.toString());
keys.bind(numeric, (e, combo) => {
  const clickedKey = combo;
  const currentPosition = store.getState().cursor.position;
  store.dispatch(
    set({
      position: store.getState().cursor.position,
      stringNo: store.getState().cursor.stringNo,
      fret: parseInt(clickedKey),
    })
  );

  // TODO: Do the symbols!!!
  renderer.drawOrRefreshGroup(
    currentPosition,
    store.getState().tabulature.contents[currentPosition]
  );
});

keys.bind("x", (e, combo) => {
  const clickedKey = combo;
  const cursor = store.getState().cursor;

  store.dispatch(remove(cursor));
  renderer.drawOrRefreshGroup(
    cursor.position,
    store.getState().tabulature.contents[cursor.position]
  );
});
