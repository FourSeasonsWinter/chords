import { useEffect, useRef, useState } from 'react'
import { deleteSong, getSavedSongs, saveSong } from '../actions/songs'
import { Song } from '../types'
import { Link } from 'react-router-dom'
import { IoMdAdd } from 'react-icons/io'
import { AnimatePresence, motion } from 'framer-motion'

export default function CollectionListPage() {
  const [songs, setSongs] = useState<Song[]>(getSavedSongs())
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const [itemToDelete, setItemToDelete] = useState<Song | null>(null)
  const holdTimeout = useRef<number>(null)

  function handleAddSong() {
    const newSong: Song = {
      id: crypto.randomUUID(),
      title: 'New Song',
      chordIds: [],
    }

    saveSong(newSong)
    setSongs([...songs, newSong])
  }

  function handleHoldStart(song: Song) {
    if (holdTimeout.current) clearTimeout(holdTimeout.current)

    holdTimeout.current = setTimeout(() => {
      if (navigator && navigator.vibrate) navigator.vibrate(100)

      setItemToDelete(song)
      setShowConfirmation(true)
    }, 500)
  }

  function handleHoldEnd() {
    if (holdTimeout.current) clearTimeout(holdTimeout.current)
  }

  function handleConfirmDelete() {
    if (itemToDelete) deleteSong(itemToDelete.id)

    setShowConfirmation(false)
    setItemToDelete(null)
    setSongs(getSavedSongs())
  }

  function handleCancelDelete() {
    setShowConfirmation(false)
    setItemToDelete(null)
  }

  useEffect(() => {
    return () => {
      if (holdTimeout.current) clearTimeout(holdTimeout.current)
    }
  })

  return (
    <main className='song-list-page'>
      <h1 className='songs-title'>Songs</h1>

      {songs.length > 0 ? (
        <>
          <ol className='song-list'>
            <AnimatePresence>
              {songs.map((song) => {
                return (
                  <motion.li
                    key={song.id}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Link
                      to={`/songs/${song.id}`}
                      onTouchStart={() => handleHoldStart(song)}
                      onTouchEnd={handleHoldEnd}
                      onTouchCancel={handleHoldEnd}
                    >
                      <div className='song-list-item'>{song.title}</div>
                    </Link>
                  </motion.li>
                )
              })}
            </AnimatePresence>
          </ol>

          <div onClick={handleAddSong} className='song-list-item add-button'>
            <IoMdAdd size={28} />
            new song
          </div>

          {showConfirmation && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='confirmation-popup'
              >
                <div id='box'>
                  <h3>Delete {itemToDelete?.title}?</h3>
                  <div id='buttons'>
                    <button onClick={handleCancelDelete}>cancel</button>
                    <button onClick={handleConfirmDelete} id='delete'>
                      delete
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </>
      ) : (
        <h3>no songs yet</h3>
      )}
    </main>
  )
}
