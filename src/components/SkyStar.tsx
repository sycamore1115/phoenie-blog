import { Link } from 'react-router-dom'
import type { SkyStar as SkyStarData } from '../data/stars'

type SkyStarProps = {
  star: SkyStarData
}

export function SkyStar({ star }: SkyStarProps) {
  const className = `sky-star sky-star--${star.size} sky-star--${star.kind}`
  const style = { left: `${star.x}%`, top: `${star.y}%` }
  const label = `${star.label}，${star.hint}`
  const content = (
    <>
      <span className="sky-star__rays" aria-hidden="true" />
      <span className="sky-star__glow" aria-hidden="true" />
      <span className="sky-star__core" aria-hidden="true" />
      <span className="sky-star__caption">
        <span className="sky-star__label">{star.label}</span>
        <span className="sky-star__hint">{star.hint}</span>
      </span>
    </>
  )

  if (star.href) {
    return (
      <a
        href={star.href}
        className={className}
        style={style}
        aria-label={label}
        target="_blank"
        rel="noreferrer"
      >
        {content}
      </a>
    )
  }

  return (
    <Link to={`/stars/${star.id}`} className={className} style={style} aria-label={label}>
      {content}
    </Link>
  )
}
