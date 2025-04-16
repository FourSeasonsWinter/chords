import { Song } from "../types";

const LOCAL_STORAGE_KEY = 'songs'

export function getSavedSongs() {
  const songs = localStorage.getItem(LOCAL_STORAGE_KEY)
  return songs ? JSON.parse(songs) : []
}

export function getSongById(songId: string) {
  const songs: Song[] = getSavedSongs()
  return songs.find(s => s.id === songId)
}

export function saveSong(song: Song) {
  const collections: Song[] = getSavedSongs()
  collections.push(song)

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(collections))
}