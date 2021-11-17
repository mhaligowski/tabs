import keys from "mousetrap";
import { configureStore } from "@reduxjs/toolkit";
import { Svg, SVG, Text } from "@svgdotjs/svg.js";

import { Pluck, Tabulature } from "./tab/types";

import { Cursor } from "./cursor/cursor";
import { SVGCursorRenderer } from "./cursor/render";
import cursorSlice, { up, down, left, right, goTo } from "./cursor/slice";

const store = configureStore({ reducer: { cursor: cursorSlice } });

// Some constants
// TODO: get rid of these in favor of the config.ts
const VERTICAL_STRING_SPACE: number = 20;
const VERTICAL_PADDING = VERTICAL_STRING_SPACE;
const STRING_COUNT: number = 6;
const FONT_HEIGHT = new Text().text("0123456789").font({ size: 20 }).bbox().h;

var draw: Svg = SVG()
  .addTo("#root")
  .size(600, 100 + VERTICAL_STRING_SPACE * 2); // VERTICAL_SPACE for vertical margin

// Draw vertical line
draw
  .line(
    0,
    VERTICAL_PADDING,
    0,
    (STRING_COUNT - 1) * VERTICAL_STRING_SPACE + VERTICAL_PADDING
  )
  .stroke({ color: "#000", width: 15 });

draw
  .line(
    12,
    VERTICAL_PADDING,
    12,
    (STRING_COUNT - 1) * VERTICAL_STRING_SPACE + VERTICAL_PADDING
  )
  .stroke({ color: "#000", width: 2 });

// Draw strings
for (var i = 0; i < STRING_COUNT; i++) {
  const top = VERTICAL_STRING_SPACE * i + VERTICAL_PADDING;
  draw.line(0, top, 600, top).stroke({ color: "#000", width: 1 });
}

const put = (draw: Svg, position: number, pluck: Pluck) =>
  draw
    .plain(pluck.fret?.toString())
    .font({ fill: "#000", size: 20 })
    .move(
      position,
      VERTICAL_STRING_SPACE * pluck.string_no +
        VERTICAL_PADDING -
        FONT_HEIGHT / 2
    );
const render = (draw: Svg, tab: Tabulature) =>
  tab.symbols.map((p, i) => put(draw, (i + 1) * 40, p));

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
const pentatonic: Pluck[] = [
  { string_no: 5, fret: 5 },
  { string_no: 5, fret: 8 },
  { string_no: 4, fret: 5 },
  { string_no: 4, fret: 7 },
  { string_no: 3, fret: 5 },
  { string_no: 3, fret: 7 },
  { string_no: 2, fret: 5 },
  { string_no: 2, fret: 7 },
  { string_no: 1, fret: 5 },
  { string_no: 1, fret: 8 },
  { string_no: 0, fret: 5 },
  { string_no: 0, fret: 8 },
];
const defaultTab = { symbols: pentatonic };
const tabToRender = parseFromLocation(window.location) ?? defaultTab;
store.dispatch(goTo({ stringNo: 5, position: 0 } as Cursor));

const cursorRenderer: SVGCursorRenderer = new SVGCursorRenderer(draw);
cursorRenderer.render(store.getState().cursor);

render(draw, tabToRender);
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
