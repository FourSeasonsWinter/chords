import { ChangeEvent } from 'react'
import { IoSettingsSharp } from "react-icons/io5";

interface Props {
  searchTerm: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function Search({ searchTerm, onChange }: Props) {
  return (
    <div className='search'>
      <input
        type='text'
        placeholder='Chord name...'
        value={searchTerm}
        onChange={onChange}
      />
      <button>
        <IoSettingsSharp size={24} />
      </button>
    </div>
  )
}
