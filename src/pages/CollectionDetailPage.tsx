import { Link, useParams } from 'react-router-dom'
import { getSongById, saveSong } from '../actions/songs'
import ChordDiagram from '../components/Diagram'
import { getChordById } from '../actions/chords'
import { ChangeEvent, useEffect, useState } from 'react'
import { Chord } from '../types'
import Chords from '../components/Chords'
import { FaArrowLeft } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import { AnimatePresence, motion } from 'framer-motion'

export default function CollectionDetailPage() {
  const { songId } = useParams<{ songId: string }>()

  const [title, setTitle] = useState<string>('')
  const [chords, setChords] = useState<Chord[]>([])
  const [editMode, setEditMode] = useState<boolean>(false)

  const song = getSongById(songId || '')

  if (!song) {
    return (
      <div className='not-found'>
        <p>song not found</p>
        <Link to={'/songs'}>to the song list</Link>
      </div>
    )
  }

  useEffect(() => {
    const createdChords: Chord[] = []

    song.chordIds.forEach((id) => {
      const chord: Chord = {
        id: id,
        ...getChordById(id),
      }

      createdChords.push(chord)
    })

    setChords(createdChords)
    setTitle(song.title)

    if (createdChords.length === 0) {
      setEditMode(true)
    }
  }, [])

  function toggleEditMode() {
    setEditMode(!editMode)
  }

  function addChord(chord: Chord) {
    setChords([...chords, chord])

    if (song) {
      song?.chordIds.push(chord.id)
      saveSong(song)
    }
  }

  function handleDiagramClick(index: number) {
    if (!editMode) return

    const updatedChords = chords.filter((_, i) => {
      return i != index
    })

    setChords(updatedChords)
    
    if (song) {
      song.chordIds = updatedChords.map(chord => chord.id)
      saveSong(song)
    }
  }

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value)

    if (song) {
      song.title = e.target.value
      saveSong(song)
    }
  }

  return (
    <>
      <div className='top-bar'>
        <Link to={'/songs'}>
          <FaArrowLeft size={24} opacity={0.4} />
        </Link>
        <button
          className={editMode ? 'edit-mode-button' : ''}
          onClick={toggleEditMode}
        >
          <MdEdit size={24} cursor={'pointer'} />
        </button>
      </div>

      {!editMode ? (
        <h1 className='details-title'>{title}</h1>
      ) : (
        <input
          type='text'
          className='details-title-input'
          placeholder='Song name...'
          value={title}
          onChange={handleTitleChange}
        />
      )}

      {chords.length > 0 ? (
        <ol className='diagrams'>
          <AnimatePresence>
            {chords.map((chord, index) => {
              return (
                <motion.li
                  key={index}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleDiagramClick(index)}
                  className='diagram'
                >
                  <span>
                    {chord.key}
                    {chord.suffix}
                  </span>
                  <ChordDiagram {...chord} />
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ol>
      ) : (
        <>
          <h4 className='add-chords-label'>add chords!</h4>
        </>
      )}

      {editMode && (
        <motion.div
          layout
          className='edit-mode-section'
        >
          <div id='label'>
            <p>click on a diagram to remove</p>
            <IoClose size={24} />
          </div>
          <hr />
          <Chords onAddPress={addChord} />
        </motion.div>
      )}
    </>
  )
}
