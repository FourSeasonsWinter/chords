import { Chord } from '../types'
import ChordDiagram from './Diagram'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

interface Props {
  chords: Chord[]
  onSlideChange?: (activeIndex: number) => void
  initialSlide?: number
}

export default function Carousel({
  chords,
  onSlideChange,
  initialSlide = 0,
}: Props) {
  if (!chords || chords.length === 0) {
    return null
  }

  return (
    <Swiper
      direction={'horizontal'}
      slidesPerView={'auto'}
      centeredSlides={true}
      spaceBetween={15}
      initialSlide={initialSlide}
      slideToClickedSlide={true}
      onSlideChange={(swiperInstance) => {
        if (onSlideChange) {
          onSlideChange(swiperInstance.activeIndex)
        }
      }}
      className='chord-swiper-container'
    >
      {chords.map(chord => (
        <SwiperSlide key={chord.id} className='chord-swiper-slide'>
          <h2>{chord.key}{chord.suffix}</h2>
          <ChordDiagram {...chord} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
