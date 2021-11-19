import { Svg } from "@svgdotjs/svg.js";

import { config } from "../config";
import { Symbol, SymbolGroup, Tabulature } from "./types";

class SVGSymbolRenderer {
  render(draw: Svg, position: number, symbol: Symbol): void {
    const id = `s-${position}-${symbol.string_no}`;
    const elem = draw.findOne(`#${id}`);
    if (draw.findOne(`#${id}`)) {
      elem.replace(
        draw
          .plain(symbol.fret?.toString())
          .id(id)
          .font({ fill: "#000", size: 20 })
          .move(
            (position + 1) * 40,
            config.verticalStringSpace * symbol.string_no +
              config.verticalPadding -
              config.fontHeight / 2
          )
      );
    } else {
      draw
        .plain(symbol.fret?.toString())
        .id(id)
        .font({ fill: "#000", size: 20 })
        .move(
          (position + 1) * 40,
          config.verticalStringSpace * symbol.string_no +
            config.verticalPadding -
            config.fontHeight / 2
        );
    }
  }
}

class SVGGroupRenderer {
  private symbolRenderer: SVGSymbolRenderer;

  public static create() {
    return new SVGGroupRenderer(new SVGSymbolRenderer());
  }

  private constructor(symbolRenderer: SVGSymbolRenderer) {
    this.symbolRenderer = symbolRenderer;
  }

  render(draw: Svg, position: number, group: SymbolGroup) {
    group.symbols.forEach((symb) =>
      this.symbolRenderer.render(draw, position, symb)
    );
  }
}

class SVGTabulatureRenderer {
  private groupRenderer: SVGGroupRenderer;

  public static create() {
    return new SVGTabulatureRenderer(SVGGroupRenderer.create());
  }

  private constructor(groupRenderer: SVGGroupRenderer) {
    this.groupRenderer = groupRenderer;
  }

  drawStaff(draw: Svg) {
    // Draw vertical line
    draw
      .line(
        0,
        config.verticalPadding,
        0,
        (config.stringsCount - 1) * config.verticalStringSpace +
          config.verticalPadding
      )
      .stroke({ color: "#000", width: 15 });

    draw
      .line(
        12,
        config.verticalPadding,
        12,
        (config.stringsCount - 1) * config.verticalStringSpace +
          config.verticalPadding
      )
      .stroke({ color: "#000", width: 2 });

    // Draw strings
    for (var i = 0; i < config.stringsCount; i++) {
      const top = config.verticalStringSpace * i + config.verticalPadding;
      draw.line(0, top, 600, top).stroke({ color: "#000", width: 1 });
    }
  }

  render(draw: Svg, tab: Tabulature) {
    tab.contents.forEach((group, idx) =>
      this.groupRenderer.render(draw, idx, group)
    );
  }
}

export { SVGTabulatureRenderer, SVGSymbolRenderer };
