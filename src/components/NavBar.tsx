import { HiCollection } from 'react-icons/hi'
import { FaHome } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav>
      <NavLink
        to={'/'}
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        <FaHome size={28} />
      </NavLink>
      <NavLink
        to={'/collections'}
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        <HiCollection size={28} />
      </NavLink>
    </nav>
  )
}
