import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { articleAssetUrl, findArticle } from '../components/coding/articles'
import { getCategory } from '../components/coding/categories'
import { MarkdownView } from '../components/coding/MarkdownView'
import { useArticleMarkdown } from '../components/coding/useArticleMarkdown'
import { useCategoryArticles } from '../components/coding/useCategoryArticles'
import { useCodingCategories } from '../components/coding/useCodingCategories'

export function CodingArticle() {
  const { categoryId, articleFile } = useParams()
  const categoriesState = useCodingCategories()
  const file = articleFile ? decodeURIComponent(articleFile) : ''

  if (!categoryId || !file) {
    return <Navigate to="/stars/coding" replace />
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

  return <CodingArticlePage categoryId={category.id} label={category.label} file={file} />
}

type CodingArticlePageProps = {
  categoryId: string
  label: string
  file: string
}

function CodingArticlePage({ categoryId, label, file }: CodingArticlePageProps) {
  const location = useLocation()
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
      <div className="coding-page coding-page--article">
        <Link className="placeholder__back" to={`/stars/coding/${categoryId}`}>
          ← 返回{label}
        </Link>
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
            resolveSrc={(src) => articleAssetUrl(categoryId, file, src)}
          />
        )}
      </div>
    </main>
  )
}
