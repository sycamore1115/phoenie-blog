import { useState } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { articleAssetUrl, findArticle } from '../components/coding/articles'
import { getCategory } from '../components/coding/categories'
import { useArticleLibrary } from '../components/coding/library'
import { MarkdownView } from '../components/coding/MarkdownView'
import { useArticleMarkdown } from '../components/coding/useArticleMarkdown'
import { useCategoryArticles } from '../components/coding/useCategoryArticles'
import { useCodingCategories } from '../components/coding/useCodingCategories'

export function CodingArticle() {
  const library = useArticleLibrary()
  const { categoryId, articleFile } = useParams()
  const categoriesState = useCodingCategories()
  const file = articleFile ? decodeURIComponent(articleFile) : ''

  if (!categoryId || !file) {
    return <Navigate to={library.route} replace />
  }

  if (categoriesState.status === 'loading') {
    return (
      <main className="doc-page">
        <div className="coding-page coding-page--article">
          <p className="quote-list__empty">正在读取分类…</p>
        </div>
      </main>
    )
  }

  if (categoriesState.status === 'error') {
    return (
      <main className="doc-page">
        <div className="coding-page coding-page--article">
          <Link className="placeholder__back" to={library.route}>
            ← 返回分类
          </Link>
          <p className="quote-list__empty">{categoriesState.message}</p>
        </div>
      </main>
    )
  }

  const category = getCategory(categoriesState.categories, categoryId)
  if (!category) {
    return <Navigate to={library.route} replace />
  }

  return <CodingArticlePage categoryId={category.id} label={category.label} file={file} />
}

type CodingArticlePageProps = {
  categoryId: string
  label: string
  file: string
}

function CodingArticlePage({ categoryId, label, file }: CodingArticlePageProps) {
  const library = useArticleLibrary()
  const location = useLocation()
  const [wide, setWide] = useState(false)
  const listState = useCategoryArticles(categoryId)
  const markdownState = useArticleMarkdown(categoryId, file)
  const titleFromState =
    location.state && typeof location.state === 'object' && 'title' in location.state
      ? location.state.title
      : undefined
  const titleFromList =
    listState.status === 'ready' ? findArticle(listState.articles, file)?.title : undefined
  const title =
    (typeof titleFromState === 'string' && titleFromState) || titleFromList || file

  return (
    <main className="doc-page">
      <div className={`coding-page coding-page--article${wide ? ' coding-page--wide' : ''}`}>
        <div className="article-toolbar">
          <Link className="placeholder__back" to={`${library.route}/${categoryId}`}>
            ← 返回{label}
          </Link>
          <button
            type="button"
            className="article-wide-toggle"
            onClick={() => setWide((current) => !current)}
          >
            {wide ? '退出全屏' : '全屏'}
          </button>
        </div>
        <header className="quotes-page__header">
          <h1 className="placeholder__title">{title}</h1>
        </header>
        {markdownState.status === 'loading' && <p className="quote-list__empty">正在读取文章…</p>}
        {markdownState.status === 'error' && (
          <p className="quote-list__empty">{markdownState.message}</p>
        )}
        {markdownState.status === 'ready' && (
          <MarkdownView
            content={markdownState.content}
            resolveSrc={(src) => articleAssetUrl(library, categoryId, file, src)}
          />
        )}
      </div>
    </main>
  )
}
