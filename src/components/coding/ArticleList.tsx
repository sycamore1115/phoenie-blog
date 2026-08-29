import { Link } from 'react-router-dom'
import type { CodingArticle } from './articles'

type ArticleListProps = {
  categoryId: string
  articles: CodingArticle[]
}

export function ArticleList({ categoryId, articles }: ArticleListProps) {
  if (articles.length === 0) {
    return <p className="quote-list__empty">这个分类还没有文章。</p>
  }

  return (
    <div className="article-list">
      {articles.map((article) => (
        <Link
          key={article.link}
          to={`/stars/coding/${categoryId}/${encodeURIComponent(article.link)}`}
          state={{ title: article.title }}
          className={`article-item article-item--${article.important}`}
          aria-label={`${article.title}，重要程度 ${article.important}`}
        >
          {article.important === 3 && (
            <span className="article-item__mark" aria-hidden="true">
              ✦
            </span>
          )}
          <h2 className="article-item__title">{article.title}</h2>
        </Link>
      ))}
    </div>
  )
}
