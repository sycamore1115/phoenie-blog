import type { ArticleLibrary } from './library'

export type ArticleImportance = 1 | 2 | 3

export type CodingArticle = {
  title: string
  link: string
  important: ArticleImportance
  href?: string
}

function parseImportant(value: unknown): ArticleImportance {
  const n = typeof value === 'number' ? value : Number(value)
  if (n === 3 || n === 2 || n === 1) return n
  return 1
}

function parseHref(value: unknown) {
  if (typeof value !== 'string') return undefined
  const href = value.trim()
  if (!/^https?:\/\//i.test(href)) return undefined
  return href
}

function isHidden(value: unknown) {
  return value === true || value === 'true'
}

export function homeJsonUrl(library: ArticleLibrary, categoryId: string) {
  return `${library.ossBase}/${categoryId}/home.json`
}

export function parseArticles(data: unknown): CodingArticle[] {
  if (!Array.isArray(data)) return []

  return data.flatMap((item) => {
    if (!item || typeof item !== 'object') return []
    const record = item as Record<string, unknown>
    if (typeof record.title !== 'string' || typeof record.link !== 'string') return []
    if (isHidden(record.hide)) return []
    return [
      {
        title: record.title.trim(),
        link: record.link.trim(),
        important: parseImportant(record.important),
        href: parseHref(record.href),
      },
    ]
  })
}

export function articleSlug(link: string) {
  const safe = link.replaceAll('\\', '/').split('/').pop() ?? ''
  if (!safe || safe.includes('..')) {
    throw new Error('无效的文章路径')
  }
  return safe.replace(/\.(markdown|md)$/i, '')
}

export function findArticle(articles: CodingArticle[], link: string) {
  try {
    const slug = articleSlug(link)
    return articles.find((article) => articleSlug(article.link) === slug)
  } catch {
    return articles.find((article) => article.link === link)
  }
}

export function articleDirUrl(library: ArticleLibrary, categoryId: string, link: string) {
  const slug = articleSlug(link)
  return `${library.ossBase}/${categoryId}/${encodeURIComponent(slug)}`
}

export function articleUrl(library: ArticleLibrary, categoryId: string, link: string) {
  return `${articleDirUrl(library, categoryId, link)}/main.markdown`
}

export function articleAssetUrl(
  library: ArticleLibrary,
  categoryId: string,
  link: string,
  src: string,
) {
  if (/^(https?:|data:|blob:)/i.test(src)) return src

  const cleaned = src.replace(/^\.\//, '').replaceAll('\\', '/')
  if (!cleaned || cleaned.startsWith('/') || cleaned.includes('..')) return src

  const dir = articleDirUrl(library, categoryId, link)
  const encoded = cleaned.split('/').map((part) => encodeURIComponent(part)).join('/')
  return `${dir}/${encoded}`
}

export async function fetchArticleMarkdown(
  library: ArticleLibrary,
  categoryId: string,
  file: string,
  signal?: AbortSignal,
): Promise<string> {
  const response = await fetch(articleUrl(library, categoryId, file), { signal })
  if (!response.ok) {
    throw new Error(`读取文章失败（${response.status}）`)
  }
  return response.text()
}

export async function fetchCategoryArticles(
  library: ArticleLibrary,
  categoryId: string,
  signal?: AbortSignal,
): Promise<CodingArticle[]> {
  const response = await fetch(homeJsonUrl(library, categoryId), { signal })
  if (!response.ok) {
    throw new Error(`读取文章列表失败（${response.status}）`)
  }
  return parseArticles(await response.json())
}
