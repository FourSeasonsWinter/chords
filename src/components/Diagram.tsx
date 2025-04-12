import { memo } from 'react'
import { Chord, Barre } from '../types'

function ChordDiagram(
  { frets, barres = [], baseFret = 1 }: Chord,
  color: string = '#fff',
  svgWidth: number = 120,
  svgHeight: number = 180,
  numFrets: number = 4,
  showName: boolean = false
) {
  const numStrings = 6

  const stringSpacing = svgWidth / (numStrings - 1) - 4
  const fretSpacing = (svgHeight - 40) / (numFrets + 1)

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      width='100%'
      height='100%'
      preserveAspectRatio='xMidYMid meet'
      aria-label={`${name} chord diagram`}
      className='chord-diagram-svg'
    >
      {/*Chord name*/}
      <text
        x='50%'
        y='12'
        fontSize='16'
        fontWeight='bold'
        textAnchor='middle'
        fill={color}
      >
        {showName && ''}
      </text>

      {/* Strings */}
      <g className='strings'>
        {[...Array(numStrings)].map((_, i) => {
          let x = i * stringSpacing + 10

          return (
            <line
              key={`string-${i}`}
              x1={x}
              y1={40}
              x2={x}
              y2={svgHeight - 28}
              stroke={color}
              strokeWidth='1'
            />
          )
        })}
      </g>

      {/* Frets */}
      <g className='strings'>
        {[...Array(numFrets + 1)].map((_, i) => {
          return (
            <line
              key={`fret-${i}`}
              x1='10'
              y1={i * fretSpacing + 40}
              x2={svgWidth - 10}
              y2={i * fretSpacing + 40}
              stroke={color}
              strokeWidth={i === 0 && baseFret === 1 ? 3 : 1}
            />
          )
        })}
      </g>

      {/* Starting Fret Number */}
      {baseFret > 1 && (
        <text
          x={7.5}
          y={31.5 + fretSpacing / 2}
          fontSize='9'
          textAnchor='end'
          fill={color}
        >
          {baseFret}
        </text>
      )}

      {/* Open and Muted Strings */}
      {frets.map((fret, i) => {
        let x = i * stringSpacing + 10

        if (fret === 0) {
          return (
            <text
              key={`open-${i}`}
              x={x}
              y={34}
              fontSize={14}
              textAnchor='middle'
              fill={color}
            >
              O
            </text>
          )
        }
        if (fret === -1) {
          return (
            <text
              key={`mute-${i}`}
              x={x}
              y={34}
              fontSize={14}
              textAnchor='middle'
              fill={color}
            >
              X
            </text>
          )
        }
        return null
      })}

      {/* Dots */}
      {frets.map((fret, i) => {
        if (
          fret > 0 &&
          (!barres ||
            !barres.some(
              (barre: Barre) =>
                barre.fret === fret && i + 1 >= barre.from && i + 1 <= barre.to
            ))
        ) {
          const x = i * stringSpacing + 10
          const y = fret * fretSpacing + 40

          return (
            <circle
              key={`dot-${i}`}
              cx={x}
              cy={(y - fretSpacing / 2).toString()}
              r='7.5'
              fill={color}
            />
          )
        }
      })}

      {/* Barres */}
      {barres &&
        barres.map((barre, index) => {
          const { from, to } = barre
          const xStart = (from - 1) * stringSpacing + 10
          const xEnd = (to - 1) * stringSpacing + 10
          const y = fretSpacing + 32 - fretSpacing / 2

          return (
            <rect
              key={`barre-${index}`}
              x={xStart - 4}
              y={y}
              width={xEnd - xStart + 8}
              height='15.5'
              rx='8'
              ry='8'
              fill={color}
            />
          )
        })}
    </svg>
  )
}

export default memo(ChordDiagram)
