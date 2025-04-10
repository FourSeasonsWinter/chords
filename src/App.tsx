import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import chordsData from './data/guitar-chords.json'
import Carousel from './components/Carousel'
import Menu from './components/Menu'
import NavBar from './components/NavBar'
import Search from './components/Search'
import { Chord } from './types'

export default function App() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filteredChords, setFilteredChords] = useState<Chord[]>([])

  const chordsList = useMemo(() => {
    return Object.entries(chordsData).map(([id, data]) => ({ id, ...data }))
  }, [])

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredChords([])
      return
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase()

    const results = chordsList.filter((chord) => {
      const chordName = `${chord.key}${chord.suffix}`.toLowerCase()
      return chordName.includes(lowerCaseSearchTerm)
    })

    setFilteredChords(results)
  }, [searchTerm, chordsList])

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
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

        <Carousel />
        <div>
          {filteredChords.length > 0
            ? filteredChords.map((chord) => (
                <div key={chord.id} onClick={() => console.log('Selected:', chord.id)}>
                  <h3>
                    {chord.key}{chord.suffix}
                  </h3>
                  <pre>Frets: {JSON.stringify(chord.frets)}</pre>
                </div>
              ))
            : searchTerm.trim() && (
                <p>No chords found matching "{searchTerm}"</p>
              )}
        </div>
      </main>

      <NavBar />
    </>
  )
}
