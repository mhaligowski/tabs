import "./index.css";

import keys from "mousetrap";
import { Svg, SVG } from "@svgdotjs/svg.js";
import React from "react";
import ReactDOM from "react-dom";

import { setTabulature, set, remove, insert } from "./tab/slice";
import { parseFromLocation } from "./tab/serialize";

import { App } from "./app";
import { Cursor } from "./cursor/cursor";
import { up, down, left, right, goTo } from "./cursor/slice";
import { config } from "./config";
import { SvgRenderer } from "./render";
import { Provider } from "react-redux";

import { store } from "./store";

const tabToRender = parseFromLocation(window.location);
if (tabToRender) {
  console.log("Parsed: ", tabToRender);
  store.dispatch(setTabulature(tabToRender));
  console.log("After dispatch:", store.getState().tabulature);
}

store.dispatch(goTo({ stringNo: 5, position: 0 } as Cursor));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);

var draw: Svg = SVG()
  .addTo("#svg")
  .size(600, 100 + config.verticalStringSpace * 2);

console.log("current state", store.getState().tabulature);

const renderer = new SvgRenderer(draw);
renderer.drawOrRefreshStaff(store.getState().tabulature);
renderer.drawOrRefreshTabulature(store.getState().tabulature);
renderer.refreshCursor(store.getState().cursor);

keys.bind(["up", "k"], () => {
  store.dispatch(up(store.getState()));
  renderer.drawOrRefreshStaff(store.getState().tabulature);
  renderer.drawOrRefreshTabulature(store.getState().tabulature);
  renderer.refreshCursor(store.getState().cursor);
});
keys.bind(["down", "j"], () => {
  store.dispatch(down(store.getState()));
  renderer.drawOrRefreshStaff(store.getState().tabulature);
  renderer.drawOrRefreshTabulature(store.getState().tabulature);
  renderer.refreshCursor(store.getState().cursor);
});
keys.bind(["left", "h"], () => {
  store.dispatch(left(store.getState()));

  renderer.drawOrRefreshStaff(store.getState().tabulature);
  renderer.drawOrRefreshTabulature(store.getState().tabulature);
  renderer.refreshCursor(store.getState().cursor);
});
keys.bind(["right", "l"], () => {
  store.dispatch(right(store.getState()));

  renderer.drawOrRefreshStaff(store.getState().tabulature);
  renderer.drawOrRefreshTabulature(store.getState().tabulature);
  renderer.refreshCursor(store.getState().cursor);
});

const numeric = Array.from({ length: 10 }, (_, i) => i.toString());
keys.bind(numeric, (e, combo) => {
  const clickedKey = combo;
  const currentPosition = store.getState().cursor.position;
  store.dispatch(
    set({
      position: store.getState().cursor.position,
      stringNo: store.getState().cursor.stringNo,
      fret: parseInt(clickedKey),
    })
  );

  // TODO: Do the symbols: hammer-on, pull-offs, etc.!!!
  renderer.drawOrRefreshGroup(
    currentPosition,
    store.getState().tabulature.contents[currentPosition]
  );
});

keys.bind("x", (e, combo) => {
  const clickedKey = combo;
  const cursor = store.getState().cursor;

  store.dispatch(remove(cursor));
  renderer.drawOrRefreshGroup(
    cursor.position,
    store.getState().tabulature.contents[cursor.position]
  );
});

keys.bind("a", (e, combo) => {
  const { cursor } = store.getState();
  store.dispatch(insert({ position: cursor.position + 1 }));

  const { tabulature } = store.getState();
  renderer.drawOrRefreshStaff(tabulature);
  renderer.drawOrRefreshTabulature(tabulature);
  renderer.refreshCursor(cursor);
});

keys.bind("i", (e, combo) => {
  const { cursor } = store.getState();
  store.dispatch(insert({ position: cursor.position }));

  const { tabulature } = store.getState();
  renderer.drawOrRefreshStaff(tabulature);
  renderer.drawOrRefreshTabulature(tabulature);
  renderer.refreshCursor(cursor);
});
