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
  const alreadyExists = collections.findIndex(s => {
    return s.id === song.id
  })

  if (alreadyExists != -1) {
    collections[alreadyExists] = song
  }
  else {
    collections.push(song)
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(collections))
}

export function deleteSong(songId: string) {
  const collections: Song[] = getSavedSongs()
  const newCollections: Song[] = collections.filter(song => {
    return song.id != songId
  })

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCollections))
}