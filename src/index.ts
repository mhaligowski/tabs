import { Pluck, Tabulature } from "./types";
import { Svg, SVG, Text } from "@svgdotjs/svg.js";

const VERTICAL_STRING_SPACE: number = 20;
const VERTICAL_PADDING = VERTICAL_STRING_SPACE / 2;
const STRING_COUNT: number = 6;
const FONT_HEIGHT = new Text().text("0123456789").font({ size: 20 }).bbox().h;

var draw: Svg = SVG()
  .addTo("#root")
  .size(600, 100 + VERTICAL_STRING_SPACE); // VERTICAL_SPACE for vertical margin

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

render(draw, { symbols: pentatonic });
