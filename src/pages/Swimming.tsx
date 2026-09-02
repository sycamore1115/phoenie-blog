import { Link } from 'react-router-dom'
import { SwimLog } from '../components/swimming/SwimLog'
import { sessionCount } from '../components/swimming/sessions'
import { Starfield } from '../components/Starfield'

export function Swimming() {
  return (
    <main className="sky sky--scroll">
      <div className="sky__nebula" aria-hidden="true" />
      <Starfield />

      <div className="coding-page coding-page--list">
        <Link className="placeholder__back" to="/">
          ← 返回星空
        </Link>
        <header className="quotes-page__header">
          <p className="placeholder__kicker">身体与水</p>
          <h1 className="placeholder__title">游泳</h1>
          <p className="swim-summary">断断续续的坚持也未尝不可</p>
          <p className="quotes-page__count">{sessionCount} 次</p>
        </header>
        <SwimLog />
      </div>
    </main>
  )
}
