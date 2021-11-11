import { SVG } from "@svgdotjs/svg.js";

const VERTICAL_SPACE: number = 20;
const STRING_COUNT: number = 6;

var draw = SVG().addTo("#root").size(300, 100);

// Draw vertical line
draw
  .line(0, 0, 0, STRING_COUNT * VERTICAL_SPACE)
  .stroke({ color: "#000", width: 10 });

// Draw strings
for (var i = 0; i < STRING_COUNT; i++) {
  const top = VERTICAL_SPACE * i;
  draw.line(0, top, 100, top).stroke({ color: "#000", width: 1 });
}
