import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Coding } from './pages/Coding'
import { CodingArticle } from './pages/CodingArticle'
import { CodingCategory } from './pages/CodingCategory'
import { Home } from './pages/Home'
import { Quotes } from './pages/Quotes'
import { StarPlaceholder } from './pages/StarPlaceholder'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stars/quotes" element={<Quotes />} />
        <Route path="/stars/coding" element={<Coding />} />
        <Route path="/stars/coding/:categoryId/:articleFile" element={<CodingArticle />} />
        <Route path="/stars/coding/:categoryId" element={<CodingCategory />} />
        <Route path="/stars/:id" element={<StarPlaceholder />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
