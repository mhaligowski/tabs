import { Svg, G as Group } from "@svgdotjs/svg.js";
import { SymbolGroup, Tabulature } from "./tab/types";

import { config } from "./config";
import { Cursor } from "./cursor/cursor";

class SvgRenderer {
  private canvas: Svg;
  constructor(canvas: Svg) {
    this.canvas = canvas;
  }

  findOrCreateCursorElem() {
    const staffElem = this.findOrCreateStaffElem();
    if (staffElem.next()?.id() !== "cursor") {
      const cursorElem = this.canvas.group().id("cursor");
      return cursorElem
        .insertAfter(staffElem)
        .rect(config.fontWidth, config.fontHeight)
        .fill("#ff0")
        .stroke({ color: "#fa0", width: 1 });
    } else {
      return staffElem.next().first();
    }
  }

  refreshCursor(cursor: Cursor) {
    const cursorElem = this.findOrCreateCursorElem();
    cursorElem
      .attr("visible", "visible")
      .move(config.left(cursor.position), config.top(cursor.stringNo));
  }

  findOrCreateStaffElem() {
    const tabElem = this.findOrCreateTabulatureElem();

    return (tabElem.findOne("#staff") as Group) ?? tabElem.group().id("staff");
  }

  /**
   * Creates or lookup the staff group and draws the staff.
   */
  drawOrRefreshStaff() {
    const group: Group = this.findOrCreateStaffElem();
    group.clear();

    // Draw vertical lines
    group
      .line(
        0,
        config.verticalPadding,
        0,
        (config.stringsCount - 1) * config.verticalStringSpace +
          config.verticalPadding
      )
      .stroke({ color: "#000", width: 15 });

    group
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
      group.line(0, top, 600, top).stroke({ color: "#000", width: 1 });
    }
  }

  findOrCreateContentGroup(): Group {
    const tabElem = this.findOrCreateTabulatureElem();
    return (
      (tabElem.findOne("#content") as Group) ?? tabElem.group().id("content")
    );
  }

  findOrCreateSymbolGroup(position: number): Group {
    const contentElem = this.findOrCreateContentGroup();

    const numberOfExisting = contentElem.children().length;
    if (position === numberOfExisting) {
      return contentElem.group();
      // Add new one
    } else if (position < numberOfExisting) {
      return contentElem.get(position) as Group;
    } else {
      throw Error(
        `Tried to obtain a position {${position}} that cannot be added, because the current is ${numberOfExisting}`
      );
    }
  }

  drawOrRefreshGroup(position: number, symbolsGroup: SymbolGroup) {
    const symbolGroupElem = this.findOrCreateSymbolGroup(position);
    symbolGroupElem.clear();

    symbolsGroup.symbols.forEach((symbol) =>
      symbolGroupElem
        .plain(symbol.fret?.toString())
        .font({ fill: "#000", size: 20 })
        .move(
          (position + 1) * 40,
          config.verticalStringSpace * symbol.stringNo +
            config.verticalPadding -
            config.fontHeight / 2
        )
    );
  }

  findOrCreateTabulatureElem(): Group {
    return (
      (this.canvas.findOne("#tab") as Group) ?? this.canvas.group().id("tab")
    );
  }

  drawOrRefreshTabulature(tab: Tabulature) {

    this.findOrCreateContentGroup().clear();
    tab.contents.forEach((v, i) => {
      this.drawOrRefreshGroup(i, v);
    });
  }
}

export { SvgRenderer };
