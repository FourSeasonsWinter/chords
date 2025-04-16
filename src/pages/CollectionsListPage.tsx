import { useState } from 'react'
import { getSavedSongs, saveSong } from '../actions/songs'
import { Song } from '../types'
import { Link } from 'react-router-dom'
import { IoMdAdd } from 'react-icons/io'

export default function CollectionListPage() {
  const [songs, setSongs] = useState<Song[]>(getSavedSongs())

  function handleAddSong() {
    const newSong: Song = {
      id: crypto.randomUUID(),
      title: 'New Song',
      chordIds: [],
    }

    saveSong(newSong)
    setSongs([...songs, newSong])
  }

  return (
    <>
      <h1 className='songs-title'>Songs</h1>

      {songs.length > 0 ? (
        <>
          <ol className='song-list'>
            {songs.map((song) => {
              return (
                <Link to={`/songs/${song.id}`}>
                  <div className='song-list-item'>{song.title}</div>
                </Link>
              )
            })}
          </ol>

          <div onClick={handleAddSong} className='song-list-item add-button'>
            <IoMdAdd size={28} />
            new song
          </div>
        </>
      ) : (
        <h3>no songs yet</h3>
      )}
    </>
  )
}
