import { Text } from "@svgdotjs/svg.js";

class Config {
  private _fontHeight: number;
  private _fontWidth: number;

  constructor() {
    const textElem = new Text().text("0").font({ size: 20 });

    this._fontHeight = textElem.bbox().h;
    this._fontWidth = textElem.bbox().w;
    textElem.remove();
  }

  public get verticalStringSpace() {
    return 20;
  }

  public get verticalPadding() {
    return this.verticalStringSpace;
  }

  public get stringsCount() {
    return 6;
  }

  public get fontHeight() {
    return this._fontHeight;
  }

  public get fontWidth() {
    return this._fontWidth;
  }

  public top(string_no: number) {
    return (
      this.verticalStringSpace * string_no +
      this.verticalPadding -
      this._fontHeight / 2
    );
  }

  public left(position: number) {
    return 40 + position * 40;
  }
}

const config = new Config();

export { config };
