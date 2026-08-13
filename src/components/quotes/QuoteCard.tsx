import type { Quote } from './quotes'

type QuoteCardProps = {
  quote: Quote
}

export function QuoteCard({ quote }: QuoteCardProps) {
  const hasMeta = Boolean(quote.author || quote.source || quote.recordedAt)

  return (
    <article className="quote-card">
      <p className="quote-card__text">{quote.text}</p>
      {hasMeta && (
        <footer className="quote-card__meta">
          {quote.author && <span>{quote.author}</span>}
          {quote.source && <span>{quote.source}</span>}
          {quote.recordedAt && <time dateTime={quote.recordedAt}>{quote.recordedAt}</time>}
        </footer>
      )}
      {quote.note && <p className="quote-card__note">{quote.note}</p>}
    </article>
  )
}
