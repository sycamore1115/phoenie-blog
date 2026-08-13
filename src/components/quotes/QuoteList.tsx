import { quotes } from './quotes'
import { QuoteCard } from './QuoteCard'

export function QuoteList() {
  if (quotes.length === 0) {
    return <p className="quote-list__empty">还没有句子，去 quotes.ts 里记下第一句吧。</p>
  }

  return (
    <div className="quote-list">
      {quotes.map((quote) => (
        <QuoteCard key={quote.id} quote={quote} />
      ))}
    </div>
  )
}
