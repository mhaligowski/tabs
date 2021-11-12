/**
 * Represents a single symbol on the tabulature.
 */
export type Pluck = {
  string_no?: number;
  fret?: number;
};

export type Symbol = Pluck;

export type Tabulature = {
    symbols: Symbol[]
}
