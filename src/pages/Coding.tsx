import { Link } from 'react-router-dom'
import { CategoryGrid } from '../components/coding/CategoryGrid'
import { useCodingCategories } from '../components/coding/useCodingCategories'
import { Starfield } from '../components/Starfield'

export function Coding() {
  const state = useCodingCategories()

  return (
    <main className="sky sky--scroll">
      <div className="sky__nebula" aria-hidden="true" />
      <Starfield />

      <div className="coding-page">
        <Link className="placeholder__back" to="/">
          ← 返回星空
        </Link>
        <header className="quotes-page__header">
          <p className="placeholder__kicker">代码与创造</p>
          <h1 className="placeholder__title">编程</h1>
          {state.status === 'ready' && (
            <p className="quotes-page__count">{state.categories.length} 个分类</p>
          )}
        </header>
        {state.status === 'loading' && <p className="quote-list__empty">正在读取分类…</p>}
        {state.status === 'error' && <p className="quote-list__empty">{state.message}</p>}
        {state.status === 'ready' && <CategoryGrid categories={state.categories} />}
      </div>
    </main>
  )
}
