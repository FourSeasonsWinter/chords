import {
  IoMdCheckmark,
  IoMdSkipBackward,
  IoMdSkipForward,
} from 'react-icons/io'
import { LuShuffle, LuRepeat } from 'react-icons/lu'

interface Props {
  onPlay: () => void,
  onPrevious: () => void,
  onNext: () => void
}

export default function Controls({ onPlay, onPrevious, onNext }: Props) {
  return (
        <div className='controls'>
          <button>
            <LuShuffle size={22} />
          </button>
          <button onClick={onPrevious}>
            <IoMdSkipBackward size={22} />
          </button>
          <button onClick={onPlay} id='add-song-button'>
            <IoMdCheckmark size={24} />
          </button>
          <button onClick={onNext}>
            <IoMdSkipForward size={22} />
          </button>
          <button>
            <LuRepeat size={22} />
          </button>
        </div>
  )
}