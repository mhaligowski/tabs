import keys from "mousetrap";
import { configureStore } from "@reduxjs/toolkit";
import { Svg, SVG } from "@svgdotjs/svg.js";

import tabulatureSlice, { setTabulature, set, remove } from "./tab/slice";
import { parseFromLocation } from "./tab/serialize";
import { SVGSymbolRenderer, SVGTabulatureRenderer } from "./tab/render";

import { Cursor } from "./cursor/cursor";
import { SVGCursorRenderer } from "./cursor/render";
import cursorSlice, { up, down, left, right, goTo } from "./cursor/slice";
import { config } from "./config";

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

store.dispatch(goTo({ string_no: 5, position: 0 } as Cursor));

const tabRenderer: SVGTabulatureRenderer = SVGTabulatureRenderer.create();
tabRenderer.drawStaff(draw);

const cursorRenderer: SVGCursorRenderer = new SVGCursorRenderer(draw);
cursorRenderer.render(store.getState().cursor);

tabRenderer.render(draw, store.getState().tabulature);

keys.bind(["up", "k"], () => {
  store.dispatch(up());
  cursorRenderer.render(store.getState().cursor);
});
keys.bind(["down", "j"], () => {
  store.dispatch(down());
  cursorRenderer.render(store.getState().cursor);
});
keys.bind(["left", "h"], () => {
  store.dispatch(left());
  cursorRenderer.render(store.getState().cursor);
});
keys.bind(["right", "l"], () => {
  store.dispatch(right());
  cursorRenderer.render(store.getState().cursor);
});

const numeric = Array.from({ length: 10 }, (_, i) => i.toString());
keys.bind(numeric, (e, combo) => {
  const clickedKey = combo;
  const currentPosition = store.getState().cursor.position;
  store.dispatch(
    set({
      position: store.getState().cursor.position,
      string_no: store.getState().cursor.string_no,
      fret: parseInt(clickedKey),
    })
  );

  const newSymbol = {
    string_no: store.getState().cursor.string_no,
    fret: parseInt(clickedKey),
  };
  new SVGSymbolRenderer().render(draw, currentPosition, newSymbol);
});

keys.bind("x", (e, combo) => {
  const clickedKey = combo;
  const cursor = store.getState().cursor;

  store.dispatch(remove(cursor));
  new SVGSymbolRenderer().remove(draw, cursor.position, cursor.string_no);
});
