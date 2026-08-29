import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import { remarkColor } from './remarkColor'
import 'highlight.js/styles/github-dark.css'

type MarkdownViewProps = {
  content: string
  resolveSrc?: (src: string) => string
}

export function MarkdownView({ content, resolveSrc }: MarkdownViewProps) {
  return (
    <div className="markdown-body">
      <Markdown
        remarkPlugins={[remarkGfm, remarkColor]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          img({ src, alt }) {
            const resolved = src && resolveSrc ? resolveSrc(src) : src
            return <img src={resolved} alt={alt ?? ''} />
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  )
}
