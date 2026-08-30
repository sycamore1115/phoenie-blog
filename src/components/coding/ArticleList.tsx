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
        <div key={article.link} className={`article-item article-item--${article.important}`}>
          <Link
            to={`/stars/coding/${categoryId}/${encodeURIComponent(article.link)}`}
            state={{ title: article.title }}
            className="article-item__main"
            aria-label={`${article.title}，重要程度 ${article.important}`}
          >
            {article.important === 3 && (
              <span className="article-item__mark" aria-hidden="true">
                ✦
              </span>
            )}
            <h2 className="article-item__title">{article.title}</h2>
          </Link>
          {article.href && (
            <a
              className="article-item__video"
              href={article.href}
              target="_blank"
              rel="noreferrer"
            >
              视频
            </a>
          )}
        </div>
      ))}
    </div>
  )
}
