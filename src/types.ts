export interface Barre {
  fret: number
  from: number
  to: number
}

export interface Chord {
  id: string
  key: string
  suffix: string
  frets: number[]
  barres?: Barre[]
  baseFret: number
}

export interface Song {
  id: string
  title: string
  chordIds: string[]
}

export type GuitarData = {
  [key: string]: {
    key: string;
    suffix: string;
    frets: number[];
    baseFret: number;
    barres: { fret: number; from: number; to: number; }[];
  };
};