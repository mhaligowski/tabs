import reducer, { set, remove } from "./slice";

it("should return the initial state", () => {
  expect(reducer(undefined, {})).not.toBeUndefined();
});

it("should set the empty position", () => {
  const state = {
    contents: [
      { symbols: [{ stringNo: 5, fret: 5 }] },
      { symbols: [{ stringNo: 5, fret: 8 }] },
      { symbols: [{ stringNo: 4, fret: 5 }] },
    ],
  };

  const result = reducer(state, set({ fret: 12, stringNo: 3, position: 0 }));

  const expected = {
    contents: [
      {
        symbols: [
          { stringNo: 5, fret: 5 },
          { stringNo: 3, fret: 12 },
        ],
      },
      { symbols: [{ stringNo: 5, fret: 8 }] },
      { symbols: [{ stringNo: 4, fret: 5 }] },
    ],
  };

  expect(result).toEqual(expected);
});

it("should replace an existing string value", () => {
  const state = {
    contents: [
      { symbols: [{ stringNo: 5, fret: 5 }] },
      { symbols: [{ stringNo: 5, fret: 8 }] },
      { symbols: [{ stringNo: 4, fret: 5 }] },
    ],
  };

  const result = reducer(state, set({ fret: 12, stringNo: 5, position: 1 }));

  const expected = {
    contents: [
      {
        symbols: [{ stringNo: 5, fret: 5 }],
      },
      { symbols: [{ stringNo: 5, fret: 12 }] },
      { symbols: [{ stringNo: 4, fret: 5 }] },
    ],
  };

  expect(result).toEqual(expected);
});

it("should remove an existing value", () => {
  const state = {
    contents: [
      {
        symbols: [
          { stringNo: 5, fret: 5 },
          { stringNo: 3, fret: 12 },
        ],
      },
      { symbols: [{ stringNo: 5, fret: 8 }] },
      { symbols: [{ stringNo: 4, fret: 5 }] },
    ],
  };

  const result = reducer(state, remove({ stringNo: 3, position: 0 }));
});

it("should keep an empty position after removing last character", () => {
  
});
