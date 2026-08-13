export type StarKind = 'skill' | 'life' | 'collect'

export type SkyStar = {
  id: string
  label: string
  hint: string
  kind: StarKind
  x: number
  y: number
  size: 'sm' | 'md' | 'lg'
}

export const stars: SkyStar[] = [
  {
    id: 'english',
    label: '英语',
    hint: '语言学习',
    kind: 'skill',
    x: 18,
    y: 28,
    size: 'md',
  },
  {
    id: 'coding',
    label: '编程',
    hint: '代码与创造',
    kind: 'skill',
    x: 82,
    y: 26,
    size: 'lg',
  },
  {
    id: 'swimming',
    label: '游泳',
    hint: '身体与水',
    kind: 'skill',
    x: 14,
    y: 64,
    size: 'md',
  },
  {
    id: 'fitness',
    label: '减肥',
    hint: '身体记录',
    kind: 'life',
    x: 76,
    y: 72,
    size: 'md',
  },
  {
    id: 'quotes',
    label: '句子',
    hint: '喜欢的句子',
    kind: 'collect',
    x: 48,
    y: 16,
    size: 'sm',
  },
  {
    id: 'images',
    label: '图片',
    hint: '喜欢的图片',
    kind: 'collect',
    x: 88,
    y: 50,
    size: 'sm',
  },
]

export function getStar(id: string) {
  return stars.find((star) => star.id === id)
}
