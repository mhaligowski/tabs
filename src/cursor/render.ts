import { Rect, Svg } from "@svgdotjs/svg.js";
import { config } from "../config";
import { Cursor } from "./cursor";

class SVGCursorRenderer {
  private elem: Rect;

  constructor(draw: Svg) {
    this.elem = draw
      .rect(config.fontWidth, config.fontHeight)
      .fill("#ff0")
      .stroke({ color: "#fa0", width: 1 })
      .attr("visible", "hidden");
  }

  render(cursor: Cursor): void {
    this.elem
      .attr("visible", "visible")
      .move(config.left(cursor.position), config.top(cursor.string_no));
  }
}

export { SVGCursorRenderer };