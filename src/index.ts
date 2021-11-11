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

const put = (draw: Svg, string_no: number, fret: number, position: number) =>
  draw
    .plain(fret.toString())
    .font({ fill: "#000", size: 20 })
    .move(
      position,
      VERTICAL_STRING_SPACE * string_no + VERTICAL_PADDING - FONT_HEIGHT / 2
    );

// Draw pentatonic
put(draw, 5, 5, 40);
put(draw, 5, 8, 80);
put(draw, 4, 5, 120);
put(draw, 4, 7, 160);
put(draw, 3, 5, 200);
put(draw, 3, 7, 240);
put(draw, 2, 5, 280);
put(draw, 2, 7, 320);
put(draw, 1, 5, 360);
put(draw, 1, 8, 400);
put(draw, 0, 5, 440);
put(draw, 0, 8, 480);
