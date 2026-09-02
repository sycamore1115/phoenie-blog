import { createContext, useContext, type ReactNode } from 'react'

export type ArticleLibraryId = 'coding' | 'english'

export type ArticleLibrary = {
  id: ArticleLibraryId
  title: string
  kicker: string
  route: string
  ossBase: string
}

export const articleLibraries: Record<ArticleLibraryId, ArticleLibrary> = {
  coding: {
    id: 'coding',
    title: '编程',
    kicker: '代码与创造',
    route: '/stars/coding',
    ossBase: import.meta.env.DEV
      ? '/oss-coding'
      : 'https://phoenie-coding.oss-cn-hangzhou.aliyuncs.com',
  },
  english: {
    id: 'english',
    title: '英语',
    kicker: '语言学习',
    route: '/stars/english',
    ossBase: import.meta.env.DEV
      ? '/oss-english'
      : 'https://phoenie-english.oss-cn-hangzhou.aliyuncs.com',
  },
}

const ArticleLibraryContext = createContext<ArticleLibrary>(articleLibraries.coding)

export function ArticleLibraryProvider({
  library,
  children,
}: {
  library: ArticleLibrary
  children: ReactNode
}) {
  return (
    <ArticleLibraryContext.Provider value={library}>{children}</ArticleLibraryContext.Provider>
  )
}

export function useArticleLibrary() {
  return useContext(ArticleLibraryContext)
}
