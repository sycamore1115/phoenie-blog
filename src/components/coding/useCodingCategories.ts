import { useEffect, useState } from 'react'
import { fetchCategories, type CodingCategory } from './categories'
import { useArticleLibrary } from './library'

type CategoriesState =
  | { status: 'loading' }
  | { status: 'ready'; categories: CodingCategory[] }
  | { status: 'error'; message: string }

export function useCodingCategories() {
  const library = useArticleLibrary()
  const [state, setState] = useState<CategoriesState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: 'loading' })

    fetchCategories(library, controller.signal)
      .then((categories) => {
        setState({ status: 'ready', categories })
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        const message = error instanceof Error ? error.message : '读取分类失败'
        setState({ status: 'error', message })
      })

    return () => controller.abort()
  }, [library])

  return state
}
