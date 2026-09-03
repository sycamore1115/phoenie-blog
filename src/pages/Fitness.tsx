import { Link } from 'react-router-dom'
import { WeightChart } from '../components/fitness/WeightChart'
import { weights } from '../components/fitness/weights'
import { IslandPage } from '../components/IslandPage'

export function Fitness() {
  const start = weights[0]
  const latest = weights[weights.length - 1]
  const lost = start && latest ? start.jin - latest.jin : 0

  return (
    <IslandPage>
      <div className="coding-page">
        <Link className="placeholder__back" to="/">
          ← 返回星空
        </Link>
        <header className="quotes-page__header">
          <p className="placeholder__kicker">身体记录</p>
          <h1 className="placeholder__title">减肥</h1>
          {start && latest && (
            <p className="quotes-page__count">
              {start.year} 年 {start.jin} 斤 → {latest.year} 年 {latest.jin} 斤，共减 {lost} 斤
            </p>
          )}
        </header>
        <WeightChart />
      </div>
    </IslandPage>
  )
}
