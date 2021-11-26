/**
 * Represents a single symbol on the tabulature.
 */
export type Symbol = {
  id?: string;
  stringNo?: number;
  fret?: number;
};

export type SymbolGroup = {
  id?: string;
  symbols: Symbol[];
};

export type Tabulature = {
  stringCount: number;
  contents: SymbolGroup[];
};
