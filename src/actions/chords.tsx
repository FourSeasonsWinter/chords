import guitarData from '../data/guitar-chords.json'
import { GuitarData } from '../types'

const data = guitarData as GuitarData

export function getChordById(id: string) {
  return data[id]
}