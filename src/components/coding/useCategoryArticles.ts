import { useEffect, useState } from 'react'
import { fetchCategoryArticles, type CodingArticle } from './articles'
import { useArticleLibrary } from './library'

type ArticlesState =
  | { status: 'loading' }
  | { status: 'ready'; articles: CodingArticle[] }
  | { status: 'error'; message: string }

export function useCategoryArticles(categoryId: string) {
  const library = useArticleLibrary()
  const [state, setState] = useState<ArticlesState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: 'loading' })

    fetchCategoryArticles(library, categoryId, controller.signal)
      .then((articles) => {
        setState({ status: 'ready', articles })
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        const message = error instanceof Error ? error.message : '读取文章列表失败'
        setState({ status: 'error', message })
      })

    return () => controller.abort()
  }, [library, categoryId])

  return state
}
