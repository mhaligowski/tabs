import { Tabulature } from "../tab/types";
import { Cursor } from "./cursor";
import reducer, { left, right, up } from "./slice";

it("shouldn't be able to move cursor up beyond the tab", () => {
  const tab: Tabulature = { contents: [], stringCount: 6 };
  const state: Cursor = new Cursor(0, 0);

  const result = reducer(state, up({ tab }));
  expect(result).toEqual(new Cursor(0, 0));
});

it("shouldn't be able to move cursor left beyond the tab", () => {
  const tab: Tabulature = { contents: [], stringCount: 6 };
  const state: Cursor = new Cursor(0, 0);

  const result = reducer(state, left({ tab }));
  expect(result).toEqual(new Cursor(0, 0));
});

it("shouldn't be able to move cursor right beyond the tab", () => {
  const tab: Tabulature = {
    contents: [{ symbols: [] }, { symbols: [] }],
    stringCount: 6,
  };
  const state: Cursor = new Cursor(1, 0);

  const result = reducer(state, right({ tab }));
  expect(result).toEqual(new Cursor(1, 0));
});

it("shouldn't be able to move cursor down beyond the tab", () => {
  const tab: Tabulature = {
    contents: [{ symbols: [] }, { symbols: [] }],
    stringCount: 6,
  };
  const state: Cursor = new Cursor(1, 0);

  const result = reducer(state, right({ tab }));
  expect(result).toEqual(new Cursor(1, 0));
});
