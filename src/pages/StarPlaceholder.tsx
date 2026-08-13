import { Link, Navigate, useParams } from 'react-router-dom'
import { getStar } from '../data/stars'
import { Starfield } from '../components/Starfield'

export function StarPlaceholder() {
  const { id } = useParams()
  const star = id ? getStar(id) : undefined

  if (!star) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="sky sky--placeholder">
      <div className="sky__nebula" aria-hidden="true" />
      <Starfield />
      <div className="placeholder">
        <Link className="placeholder__back" to="/">
          ← 返回星空
        </Link>
        <p className="placeholder__kicker">{star.hint}</p>
        <h1 className="placeholder__title">{star.label}</h1>
        <p className="placeholder__note">这颗星星还在点亮中，详情稍后再来。</p>
      </div>
    </main>
  )
}
