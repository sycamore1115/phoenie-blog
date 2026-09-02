import type { ArticleLibrary } from './library'

export type CodingCategory = {
  id: string
  label: string
  hint?: string
}

export function categoriesJsonUrl(library: ArticleLibrary) {
  return `${library.ossBase}/categories.json`
}

export function parseCategories(data: unknown): CodingCategory[] {
  if (!Array.isArray(data)) return []

  return data.flatMap((item) => {
    if (!item || typeof item !== 'object') return []
    const record = item as Record<string, unknown>
    if (typeof record.id !== 'string' || typeof record.label !== 'string') return []

    return [
      {
        id: record.id.trim(),
        label: record.label.trim(),
        hint: typeof record.hint === 'string' ? record.hint.trim() : undefined,
      },
    ]
  })
}

export function getCategory(categories: CodingCategory[], id: string) {
  return categories.find((category) => category.id === id)
}

export async function fetchCategories(
  library: ArticleLibrary,
  signal?: AbortSignal,
): Promise<CodingCategory[]> {
  const response = await fetch(categoriesJsonUrl(library), { signal })
  if (!response.ok) {
    throw new Error(`读取分类失败（${response.status}）`)
  }
  return parseCategories(await response.json())
}
