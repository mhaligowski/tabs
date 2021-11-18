/**
 * Represents a single symbol on the tabulature.
 */
export type Symbol = {
  id?: string;
  string_no?: number;
  fret?: number;
};

export type SymbolGroup = {
  id?: string;
  symbols: Symbol[];
};

export type Tabulature = {
  contents: SymbolGroup[];
};
