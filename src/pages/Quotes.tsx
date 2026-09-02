import { Link } from 'react-router-dom'
import { Starfield } from '../components/Starfield'
import { QuoteList } from '../components/quotes/QuoteList'
import { visibleQuotes } from '../components/quotes/quotes'

export function Quotes() {
  return (
    <main className="sky sky--scroll">
      <div className="sky__nebula" aria-hidden="true" />
      <Starfield />

      <div className="quotes-page">
        <Link className="placeholder__back" to="/">
          ← 返回星空
        </Link>
        <header className="quotes-page__header">
          <p className="placeholder__kicker">喜欢的句子</p>
          <h1 className="placeholder__title">句子</h1>
          <p className="quotes-page__count">{visibleQuotes.length} 则</p>
        </header>
        <QuoteList />
      </div>
    </main>
  )
}
