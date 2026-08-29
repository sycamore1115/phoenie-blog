import { useEffect, useState } from 'react'
import { fetchCategories, type CodingCategory } from './categories'

type CategoriesState =
  | { status: 'loading' }
  | { status: 'ready'; categories: CodingCategory[] }
  | { status: 'error'; message: string }

export function useCodingCategories() {
  const [state, setState] = useState<CategoriesState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: 'loading' })

    fetchCategories(controller.signal)
      .then((categories) => {
        setState({ status: 'ready', categories })
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        const message = error instanceof Error ? error.message : '读取分类失败'
        setState({ status: 'error', message })
      })

    return () => controller.abort()
  }, [])

  return state
}
