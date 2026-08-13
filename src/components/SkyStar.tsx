import { Link } from 'react-router-dom'
import type { SkyStar as SkyStarData } from '../data/stars'

type SkyStarProps = {
  star: SkyStarData
}

export function SkyStar({ star }: SkyStarProps) {
  return (
    <Link
      to={`/stars/${star.id}`}
      className={`sky-star sky-star--${star.size} sky-star--${star.kind}`}
      style={{ left: `${star.x}%`, top: `${star.y}%` }}
      aria-label={`${star.label}，${star.hint}`}
    >
      <span className="sky-star__rays" aria-hidden="true" />
      <span className="sky-star__glow" aria-hidden="true" />
      <span className="sky-star__core" aria-hidden="true" />
      <span className="sky-star__caption">
        <span className="sky-star__label">{star.label}</span>
        <span className="sky-star__hint">{star.hint}</span>
      </span>
    </Link>
  )
}
