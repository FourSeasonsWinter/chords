import { ChangeEvent, useMemo, useState } from 'react'
import chordsData from '../data/guitar-chords.json'
import Carousel from '../components/Carousel'
import Search from '../components/Search'
import { Chord } from '../types'
import musicAnimation from '../animations/music.json'
import Lottie from 'lottie-react'

interface Props {
  onAddPress?: (chord: Chord) => void
  showAnimation?: boolean
}

export default function Chords({ onAddPress, showAnimation }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [activeChordIndex, setActiveChordIndex] = useState<number>(0)

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
    if (navigator && navigator.vibrate) {
      navigator.vibrate(20)
    }

    setActiveChordIndex(index)
  }

  function handleAddPress() {
    if (onAddPress)
      onAddPress(diagramsForCarousel[activeChordIndex])
  }

  return (
    <main className='chords-component'>
      <Search searchTerm={searchTerm} onChange={handleInputChange} />

      {filteredChords.length > 0 ? (
        <>
          <Carousel
            chords={diagramsForCarousel}
            onSlideChange={handleSlideChange}
            initialSlide={activeChordIndex}
          />

          {onAddPress && (
            <div className='simple-controls'>
              <button onClick={handleAddPress}>add</button>
            </div>
          )}
        </>
      ) : (
        searchTerm.trim() ? (
          <p className='no-chords'>No chords found matching "{searchTerm}"</p>
        ) : (
          showAnimation && <Lottie animationData={musicAnimation} loop={true} />
        )
      )}
    </main>
  )
}
