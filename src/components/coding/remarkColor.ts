import { visit } from 'unist-util-visit'

type TextNode = {
  type: 'text'
  value: string
}

type ParentNode = {
  children: unknown[]
}

const COLOR_RE = /\{color:([^}]+)\}([\s\S]*?)\{\/color\}/g

function isSafeColor(value: string) {
  const color = value.trim()
  return (
    /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color) ||
    /^(?:rgb|rgba|hsl|hsla)\([^)]+\)$/i.test(color) ||
    /^var\(--[a-z0-9-]+\)$/i.test(color) ||
    /^[a-z]{1,32}$/i.test(color)
  )
}

function colorSpan(color: string, text: string) {
  return {
    type: 'colorSpan',
    data: {
      hName: 'span',
      hProperties: {
        className: ['md-color'],
        style: `color:${color}`,
      },
    },
    children: [{ type: 'text', value: text }],
  }
}

export function remarkColor() {
  return (tree: unknown) => {
    visit(tree as never, 'text', (node: TextNode, index, parent: ParentNode | undefined) => {
      if (index == null || !parent || !node.value.includes('{color:')) return

      const parts: unknown[] = []
      let lastIndex = 0
      const pattern = new RegExp(COLOR_RE.source, 'g')

      for (const match of node.value.matchAll(pattern)) {
        const full = match[0]
        const color = match[1]?.trim() ?? ''
        const text = match[2] ?? ''
        const start = match.index ?? 0

        if (start > lastIndex) {
          parts.push({ type: 'text', value: node.value.slice(lastIndex, start) })
        }

        parts.push(isSafeColor(color) ? colorSpan(color, text) : { type: 'text', value: full })
        lastIndex = start + full.length
      }

      if (parts.length === 0) return
      if (lastIndex < node.value.length) {
        parts.push({ type: 'text', value: node.value.slice(lastIndex) })
      }

      parent.children.splice(index, 1, ...parts)
      return index + parts.length
    })
  }
}
