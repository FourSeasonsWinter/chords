import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import chordsData from './data/guitar-chords.json'
import Carousel from './components/Carousel'
import Menu from './components/Menu'
import NavBar from './components/NavBar'
import Search from './components/Search'
import { Chord } from './types'
import './App.css'

export default function App() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [activeChordIndex, setActiveChordIndex] = useState(0)

  const chordList = useMemo(() => {
    return Object.entries(chordsData).map(
      ([id, data]) => ({ id, ...data } as Chord)
    )
  }, [])

  const filteredChords = useMemo(() => {
    if (!searchTerm.trim()) return []
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    return chordList.filter((chord) => {
      const chordName = `${chord.key}${chord.suffix}`
      return chordName.toLowerCase().startsWith(lowerCaseSearchTerm)
    })
  }, [searchTerm, chordList])

  const diagramsForCarousel = useMemo(() => {
    return filteredChords.slice(0, 10)
  }, [filteredChords])

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
    setActiveChordIndex(0)
  }

  function handleSlideChange(index: number) {
    setActiveChordIndex(index)
  }

  return (
    <>
      <Menu />

      <main>
        <h1>Guitar Chords</h1>

        <Search />
        <input
          type='text'
          placeholder='Chord name...'
          value={searchTerm}
          onChange={handleInputChange}
          style={{ width: '300px', padding: '10px', marginBottom: '20px' }}
        />

        {filteredChords.length > 0 ? (
          <Carousel
            chords={diagramsForCarousel}
            onSlideChange={handleSlideChange}
            initialSlide={activeChordIndex}
          />
        ) : (
          searchTerm.trim() && <p>No chords found matching "{searchTerm}"</p>
        )}

        {diagramsForCarousel[activeChordIndex] && (
          <p>
            Active Chord:{' '}
            {diagramsForCarousel[activeChordIndex].key +
              diagramsForCarousel[activeChordIndex].suffix}
          </p>
        )}
      </main>

      <NavBar />
    </>
  )
}
