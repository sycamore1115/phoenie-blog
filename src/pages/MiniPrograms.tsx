import { Link } from 'react-router-dom'
import { MiniProgramList } from '../components/miniprogram/MiniProgramList'
import { miniPrograms } from '../components/miniprogram/apps'
import { Starfield } from '../components/Starfield'

export function MiniPrograms() {
  return (
    <main className="sky sky--scroll">
      <div className="sky__nebula" aria-hidden="true" />
      <Starfield />

      <div className="coding-page coding-page--list">
        <Link className="placeholder__back" to="/">
          ← 返回星空
        </Link>
        <header className="quotes-page__header">
          <p className="placeholder__kicker">自己做的项目</p>
          <h1 className="placeholder__title">小程序</h1>
          <p className="quotes-page__count">{miniPrograms.length} 款</p>
        </header>
        <MiniProgramList />
      </div>
    </main>
  )
}
