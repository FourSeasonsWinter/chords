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