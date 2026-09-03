import { Link } from 'react-router-dom'
import { IslandPage } from '../components/IslandPage'
import { QuoteList } from '../components/quotes/QuoteList'
import { visibleQuotes } from '../components/quotes/quotes'

export function Quotes() {
  return (
    <IslandPage>
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
    </IslandPage>
  )
}
