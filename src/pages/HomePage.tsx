import { ChangeEvent, useMemo, useState } from 'react'
import chordsData from '../data/guitar-chords.json'
import Carousel from '../components/Carousel'
import Menu from '../components/Menu'
import NavBar from '../components/NavBar'
import Search from '../components/Search'
import { Chord } from '../types'

export default function HomePage() {
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
  }

  function handleSlideChange(index: number) {
    setActiveChordIndex(index)
  }

  return (
    <>
      <Menu />
      <main>
        <Search searchTerm={searchTerm} onChange={handleInputChange} />

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
          <p>Active Chord: {diagramsForCarousel[activeChordIndex].id}</p>
        )}
      </main>
    </>
  )
}