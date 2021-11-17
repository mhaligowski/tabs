/**
 * Represents a single symbol on the tabulature.
 */
export type Symbol = {
  string_no?: number;
  fret?: number;
};



export type Tabulature = {
  symbols: Symbol[];
};
