import { visibleQuotes } from './quotes'
import { QuoteCard } from './QuoteCard'

export function QuoteList() {
  if (visibleQuotes.length === 0) {
    return <p className="quote-list__empty">还没有句子，去 quotes.ts 里记下第一句吧。</p>
  }

  return (
    <div className="quote-list">
      {visibleQuotes.map((quote, index) => (
        <QuoteCard key={`${quote.source ?? quote.text}-${index}`} quote={quote} />
      ))}
    </div>
  )
}
