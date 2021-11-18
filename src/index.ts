import keys from "mousetrap";
import { configureStore } from "@reduxjs/toolkit";
import { Svg, SVG, Text } from "@svgdotjs/svg.js";

import { Tabulature } from "./tab/types";
import tabulatureSlice, { setTabulature } from "./tab/slice";
import { SVGTabulatureRenderer } from "./tab/render";

import { Cursor } from "./cursor/cursor";
import { SVGCursorRenderer } from "./cursor/render";
import cursorSlice, { up, down, left, right, goTo } from "./cursor/slice";

const store = configureStore({
  reducer: { cursor: cursorSlice, tabulature: tabulatureSlice },
});

// Some constants
// TODO: get rid of these in favor of the config.ts
const VERTICAL_STRING_SPACE: number = 20;

var draw: Svg = SVG()
  .addTo("#root")
  .size(600, 100 + VERTICAL_STRING_SPACE * 2); // VERTICAL_SPACE for vertical margin

const parseFromLocation = (location: Location): Tabulature | null => {
  const search = location.search;
  if (search.length === 0) {
    return null;
  }
  const searchParams = new URLSearchParams(search);
  if (!searchParams.has("tab")) {
    return null;
  }
  const serializedTab = searchParams.get("tab");
  const stringifiedTab = window.atob(serializedTab);

  return JSON.parse(stringifiedTab);
};

// Default:
// eyJzeW1ib2xzIjpbeyJzdHJpbmdfbm8iOjUsImZyZXQiOjV9LHsic3RyaW5nX25vIjo1LCJmcmV0Ijo4fSx7InN0cmluZ19ubyI6NCwiZnJldCI6NX0seyJzdHJpbmdfbm8iOjQsImZyZXQiOjd9LHsic3RyaW5nX25vIjozLCJmcmV0Ijo1fSx7InN0cmluZ19ubyI6MywiZnJldCI6N30seyJzdHJpbmdfbm8iOjIsImZyZXQiOjV9LHsic3RyaW5nX25vIjoyLCJmcmV0Ijo3fSx7InN0cmluZ19ubyI6MSwiZnJldCI6NX0seyJzdHJpbmdfbm8iOjEsImZyZXQiOjh9LHsic3RyaW5nX25vIjowLCJmcmV0Ijo1fSx7InN0cmluZ19ubyI6MCwiZnJldCI6OH1dfQ==
const tabToRender = parseFromLocation(window.location);
if (tabToRender) {
  store.dispatch(setTabulature(tabToRender));
}

store.dispatch(goTo({ stringNo: 5, position: 0 } as Cursor));

const tabRenderer: SVGTabulatureRenderer = SVGTabulatureRenderer.create();
tabRenderer.drawStaff(draw);

const cursorRenderer: SVGCursorRenderer = new SVGCursorRenderer(draw);
cursorRenderer.render(store.getState().cursor);

tabRenderer.render(draw, store.getState().tabulature);

keys.bind("up", () => {
  store.dispatch(up());
  cursorRenderer.render(store.getState().cursor);
});
keys.bind("down", () => {
  store.dispatch(down());
  cursorRenderer.render(store.getState().cursor);
});
keys.bind("left", () => {
  store.dispatch(left());
  cursorRenderer.render(store.getState().cursor);
});
keys.bind("right", () => {
  store.dispatch(right());
  cursorRenderer.render(store.getState().cursor);
});

const numeric = Array.from({ length: 10 }, (_, i) => i.toString());
keys.bind(numeric, (e, combo) => console.log(e, combo));
