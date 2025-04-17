import { useState } from 'react'
import { deleteSong, getSavedSongs, saveSong } from '../actions/songs'
import { Song } from '../types'
import { Link } from 'react-router-dom'
import { IoMdAdd } from 'react-icons/io'
import { AnimatePresence, motion, PanInfo } from 'framer-motion'

export default function CollectionListPage() {
  const [songs, setSongs] = useState<Song[]>(getSavedSongs())
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const [itemToDelete, setItemToDelete] = useState<Song | null>(null)

  function handleAddSong() {
    const newSong: Song = {
      id: crypto.randomUUID(),
      title: 'New Song',
      chordIds: [],
    }

    saveSong(newSong)
    setSongs([...songs, newSong])
  }

  function handleDragEnd(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    item: Song
  ) {
    if (info.offset.x < -100 || info.offset.x > 100) {
      setItemToDelete(item)
      setTimeout(() => setShowConfirmation(true), 10)
    }
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
                    drag='x'
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => handleDragEnd(_, info, song)}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                  >
                    <Link to={`/songs/${song.id}`}>
                      <div className='song-list-item'>
                        {song.title}
                      </div>
                    </Link>
                  </motion.li>
                )
              })}
            </AnimatePresence>
          </ol>

          <div onClick={handleAddSong} className='add-button'>
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
        <>
          <h3 className='empty-list-label'>no songs yet</h3>
          <div onClick={handleAddSong} className='song-list-item add-button'>
            <IoMdAdd size={28} />
            new song
          </div>
        </>
      )}
    </main>
  )
}
