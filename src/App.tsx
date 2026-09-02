import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import {
  ArticleLibraryProvider,
  articleLibraries,
  type ArticleLibrary,
} from './components/coding/library'
import { Coding } from './pages/Coding'
import { CodingArticle } from './pages/CodingArticle'
import { CodingCategory } from './pages/CodingCategory'
import { Fitness } from './pages/Fitness'
import { Home } from './pages/Home'
import { MiniPrograms } from './pages/MiniPrograms'
import { Quotes } from './pages/Quotes'
import { StarPlaceholder } from './pages/StarPlaceholder'
import { Swimming } from './pages/Swimming'

function LibraryLayout({ library }: { library: ArticleLibrary }) {
  return (
    <ArticleLibraryProvider library={library}>
      <Outlet />
    </ArticleLibraryProvider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stars/miniprogram" element={<MiniPrograms />} />
        <Route path="/stars/quotes" element={<Quotes />} />
        <Route path="/stars/fitness" element={<Fitness />} />
        <Route path="/stars/swimming" element={<Swimming />} />
        <Route path="/stars/coding" element={<LibraryLayout library={articleLibraries.coding} />}>
          <Route index element={<Coding />} />
          <Route path=":categoryId/:articleFile" element={<CodingArticle />} />
          <Route path=":categoryId" element={<CodingCategory />} />
        </Route>
        <Route path="/stars/english" element={<LibraryLayout library={articleLibraries.english} />}>
          <Route index element={<Coding />} />
          <Route path=":categoryId/:articleFile" element={<CodingArticle />} />
          <Route path=":categoryId" element={<CodingCategory />} />
        </Route>
        <Route path="/stars/:id" element={<StarPlaceholder />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
