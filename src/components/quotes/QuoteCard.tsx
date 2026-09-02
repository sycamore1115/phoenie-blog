import type { Quote } from './quotes'

type QuoteCardProps = {
  quote: Quote
}

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <article className="quote-card">
      <p className="quote-card__text">{quote.text}</p>
      {quote.translation && <p className="quote-card__note">{quote.translation}</p>}
      {quote.source && (
        <footer className="quote-card__meta">
          <span>{quote.source}</span>
        </footer>
      )}
    </article>
  )
}
