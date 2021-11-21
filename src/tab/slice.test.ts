import reducer, { set, remove } from "./slice";

it("should return the initial state", () => {
  expect(reducer(undefined, {})).not.toBeUndefined();
});

it("should set the empty position", () => {
  const state = {
    contents: [
      { symbols: [{ string_no: 5, fret: 5 }] },
      { symbols: [{ string_no: 5, fret: 8 }] },
      { symbols: [{ string_no: 4, fret: 5 }] },
    ],
  };

  const result = reducer(state, set({ fret: 12, string_no: 3, position: 0 }));

  const expected = {
    contents: [
      {
        symbols: [
          { string_no: 5, fret: 5 },
          { string_no: 3, fret: 12 },
        ],
      },
      { symbols: [{ string_no: 5, fret: 8 }] },
      { symbols: [{ string_no: 4, fret: 5 }] },
    ],
  };

  expect(result).toEqual(expected);
});

it("should replace an existing string value", () => {
  const state = {
    contents: [
      { symbols: [{ string_no: 5, fret: 5 }] },
      { symbols: [{ string_no: 5, fret: 8 }] },
      { symbols: [{ string_no: 4, fret: 5 }] },
    ],
  };

  const result = reducer(state, set({ fret: 12, string_no: 5, position: 1 }));

  const expected = {
    contents: [
      {
        symbols: [{ string_no: 5, fret: 5 }],
      },
      { symbols: [{ string_no: 5, fret: 12 }] },
      { symbols: [{ string_no: 4, fret: 5 }] },
    ],
  };

  expect(result).toEqual(expected);
});

it("should remove an existing value", () => {
  const state = {
    contents: [
      {
        symbols: [
          { string_no: 5, fret: 5 },
          { string_no: 3, fret: 12 },
        ],
      },
      { symbols: [{ string_no: 5, fret: 8 }] },
      { symbols: [{ string_no: 4, fret: 5 }] },
    ],
  };

  const result = reducer(state, remove({ string_no: 3, position: 0 }));
});
