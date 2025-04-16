import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CollectionListPage from './pages/CollectionsListPage'
import CollectionDetailPage from './pages/CollectionDetailPage'
import './App.css'
import Layout from './Layout'

export default function App() {
  return (
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/songs' element={<CollectionListPage />} />
        </Route>
        <Route
          path='/songs/:songId'
          element={<CollectionDetailPage />}
        />
      </Routes>
  )
}
