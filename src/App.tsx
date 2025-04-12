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
          <Route path='/collections' element={<CollectionListPage />} />
        </Route>
        <Route
          path='/collections/:collectionId'
          element={<CollectionDetailPage />}
        />
      </Routes>
  )
}
