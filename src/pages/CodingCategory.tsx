import { Link, Navigate, useParams } from 'react-router-dom'
import { ArticleList } from '../components/coding/ArticleList'
import { getCategory } from '../components/coding/categories'
import { useCategoryArticles } from '../components/coding/useCategoryArticles'
import { useCodingCategories } from '../components/coding/useCodingCategories'
import { Starfield } from '../components/Starfield'

export function CodingCategory() {
  const { categoryId } = useParams()
  const categoriesState = useCodingCategories()

  if (!categoryId) {
    return <Navigate to="/stars/coding" replace />
  }

  if (categoriesState.status === 'loading') {
    return (
      <main className="sky sky--scroll">
        <div className="sky__nebula" aria-hidden="true" />
        <Starfield />
        <div className="coding-page coding-page--list">
          <p className="quote-list__empty">正在读取分类…</p>
        </div>
      </main>
    )
  }

  if (categoriesState.status === 'error') {
    return (
      <main className="sky sky--scroll">
        <div className="sky__nebula" aria-hidden="true" />
        <Starfield />
        <div className="coding-page coding-page--list">
          <Link className="placeholder__back" to="/stars/coding">
            ← 返回分类
          </Link>
          <p className="quote-list__empty">{categoriesState.message}</p>
        </div>
      </main>
    )
  }

  const category = getCategory(categoriesState.categories, categoryId)
  if (!category) {
    return <Navigate to="/stars/coding" replace />
  }

  return <CodingCategoryPage categoryId={category.id} label={category.label} />
}

type CodingCategoryPageProps = {
  categoryId: string
  label: string
}

function CodingCategoryPage({ categoryId, label }: CodingCategoryPageProps) {
  const state = useCategoryArticles(categoryId)

  return (
    <main className="sky sky--scroll">
      <div className="sky__nebula" aria-hidden="true" />
      <Starfield />

      <div className="coding-page coding-page--list">
        <Link className="placeholder__back" to="/stars/coding">
          ← 返回分类
        </Link>
        <header className="quotes-page__header">
          <h1 className="placeholder__title">{label}</h1>
          {state.status === 'ready' && (
            <p className="quotes-page__count">{state.articles.length} 篇</p>
          )}
        </header>
        {state.status === 'loading' && <p className="quote-list__empty">正在读取文章…</p>}
        {state.status === 'error' && <p className="quote-list__empty">{state.message}</p>}
        {state.status === 'ready' && (
          <ArticleList categoryId={categoryId} articles={state.articles} />
        )}
      </div>
    </main>
  )
}
