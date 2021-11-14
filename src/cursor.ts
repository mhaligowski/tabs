import { Rect, Svg } from "@svgdotjs/svg.js";
import { config } from "./config";

class Cursor {
  private _stringNo: number;
  private _position: number;

  public get stringNo(): number {
    return this._stringNo;
  }

  public set stringNo(stringNo: number) {
    this._stringNo = stringNo;
  }

  public get position(): number {
    return this._position;
  }

  public set position(position: number) {
    this._position = position;
  }
}

const renderCursor = (svg: Svg, cursor: Cursor): void => {
  console.log("top", config.top(cursor.stringNo));
  svg
    .rect(config.fontWidth, config.fontHeight)
    .fill("#ff0")
    .stroke({ color: "#fa0", width: 1 })
    .move(config.left(cursor.position), config.top(cursor.stringNo));
};

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
      .move(config.left(cursor.position), config.top(cursor.stringNo));
  }
}

export { Cursor, SVGCursorRenderer };
