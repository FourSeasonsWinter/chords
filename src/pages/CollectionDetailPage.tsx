import { Link, useParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import { getSongById } from '../actions/songs'
import ChordDiagram from '../components/Diagram'
import { getChordById } from '../actions/chords'
import { useEffect, useState } from 'react'
import { Chord } from '../types'

export default function CollectionDetailPage() {
  const { songId } = useParams<{ songId: string }>()
  const [chords, setChords] = useState<Chord[]>([])

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
  }, [])

  return (
    <>
      <div className='top-bar'>
        <Link to={'/songs'}>
          <FaArrowLeft size={24} opacity={0.4} />
        </Link>
        <button>
          <FiMenu size={24} cursor={'pointer'} />
        </button>
      </div>

      <h1 className='details-title'>{song.title}</h1>

      {chords.length > 0 ? (
        <ol className='diagrams'>
          {chords.map((chord) => {
            return (
              <div className='diagram'>
                <span>
                  {chord.key}
                  {chord.suffix}
                </span>
                <ChordDiagram {...chord} />
              </div>
            )
          })}
        </ol>
      ) : (
        <>
          <h4 className='add-chords-label'>no chords yet</h4>
          <span>add chords to this song</span>
        </>
      )}
    </>
  )
}
