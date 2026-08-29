import { useEffect, useState } from 'react'
import { fetchArticleMarkdown } from './articles'

type MarkdownState =
  | { status: 'loading' }
  | { status: 'ready'; content: string }
  | { status: 'error'; message: string }

export function useArticleMarkdown(categoryId: string, file: string) {
  const [state, setState] = useState<MarkdownState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: 'loading' })

    fetchArticleMarkdown(categoryId, file, controller.signal)
      .then((content) => {
        setState({ status: 'ready', content })
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        const message = error instanceof Error ? error.message : '读取文章失败'
        setState({ status: 'error', message })
      })

    return () => controller.abort()
  }, [categoryId, file])

  return state
}
