import { Tabulature } from "../tab/types";
import { Cursor } from "./cursor";
import reducer, { left, right, up } from "./slice";

it("shouldn't be able to move cursor up beyond the tab", () => {
  const tabulature: Tabulature = { contents: [], stringCount: 6 };
  const cursor = new Cursor(0, 0);
  const state: Cursor = cursor;

  const result = reducer(state, up({ tabulature, cursor }));
  expect(result).toEqual(new Cursor(0, 0));
});

it("shouldn't be able to move cursor left beyond the tab", () => {
  const tabulature: Tabulature = { contents: [], stringCount: 6 };
  const cursor = new Cursor(0, 0);
  const state: Cursor = cursor;

  const result = reducer(state, left({ tabulature, cursor }));
  expect(result).toEqual(new Cursor(0, 0));
});

it("shouldn't be able to move cursor right beyond the tab", () => {
  const tabulature: Tabulature = {
    contents: [{ symbols: [] }, { symbols: [] }],
    stringCount: 6,
  };
  const cursor = new Cursor(1, 0);
  const state: Cursor = cursor;

  const result = reducer(state, right({ tabulature, cursor }));
  expect(result).toEqual(new Cursor(1, 0));
});

it("shouldn't be able to move cursor down beyond the tab", () => {
  const tabulature: Tabulature = {
    contents: [{ symbols: [] }, { symbols: [] }],
    stringCount: 6,
  };
  const cursor = new Cursor(1, 0);
  const state: Cursor = cursor;

  const result = reducer(state, right({ tabulature, cursor }));
  expect(result).toEqual(new Cursor(1, 0));
});
