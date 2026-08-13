export type Quote = {
  id: string
  text: string
  author?: string
  source?: string
  note?: string
  recordedAt?: string
}

export const quotes: Quote[] = [
  {
    id: 'night-1',
    text: '星垂平野阔，月涌大江流。',
    author: '杜甫',
    source: '旅夜书怀',
    recordedAt: '2026-08-13',
  },
  {
    id: 'en-1',
    text: 'We are all in the gutter, but some of us are looking at the stars.',
    author: 'Oscar Wilde',
    source: "Lady Windermere's Fan",
    recordedAt: '2026-08-13',
  },
  {
    id: 'life-1',
    text: '慢慢来，比较快。',
    note: '想起来就记一笔。',
    recordedAt: '2026-08-13',
  },
]
