import { useState } from 'react'
import { phases, type SwimSession } from './sessions'

function formatDate(date: string) {
  const parsed = new Date(`${date}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function timestamp(date: string) {
  return new Date(`${date}T00:00:00`).getTime()
}

const WIDTH = 800
const HEIGHT = 220
const PAD = { top: 36, right: 36, bottom: 36, left: 36 }

function axisLabels(sessions: SwimSession[]) {
  const years = [...new Set(sessions.map((session) => session.date.slice(0, 4)))]
  if (years.length > 1) {
    return years.map((year) => ({
      key: year,
      label: year,
      date: sessions.find((session) => session.date.startsWith(year))?.date ?? '',
    }))
  }

  const months = [...new Set(sessions.map((session) => session.date.slice(0, 7)))]
  return months.map((month) => ({
    key: month,
    label: `${Number(month.slice(5))} 月`,
    date: sessions.find((session) => session.date.startsWith(month))?.date ?? '',
  }))
}

type SwimPhaseChartProps = {
  title: string
  sessions: SwimSession[]
}

function SwimPhaseChart({ title, sessions }: SwimPhaseChartProps) {
  const [active, setActive] = useState(Math.max(sessions.length - 1, 0))

  const times = sessions.map((session) => timestamp(session.date))
  const minT = times[0] ?? 0
  const maxT = times[times.length - 1] ?? 1
  const span = Math.max(maxT - minT, 1)
  const innerWidth = WIDTH - PAD.left - PAD.right
  const midY = (PAD.top + HEIGHT - PAD.bottom) / 2

  const points = sessions.map((session, index) => {
    const ratio = sessions.length === 1 ? 0.5 : (timestamp(session.date) - minT) / span
    const x = PAD.left + ratio * innerWidth
    const y = midY + Math.sin(index * 0.9) * 36
    return { ...session, x, y }
  })

  const line = points.map((point) => `${point.x},${point.y}`).join(' ')
  const labels = axisLabels(sessions)
  const current = points[active]

  return (
    <section className="swim-phase">
      <h2 className="swim-phase__title">{title}</h2>
      <figure className="swim-map__figure">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={`${title}时间图`}>
          {points.length > 1 && <polyline className="swim-map__line" points={line} />}
          {labels.map((item) => {
            const first = points.find((point) => point.date.startsWith(item.key))
            if (!first) return null
            return (
              <text
                key={item.key}
                className="swim-map__year"
                x={first.x}
                y={HEIGHT - 10}
                textAnchor="middle"
              >
                {item.label}
              </text>
            )
          })}
          {points.map((point, index) => (
            <g key={`${point.date}-${index}`}>
              {point.milestone && (
                <circle
                  className="swim-map__glow"
                  cx={point.x}
                  cy={point.y}
                  r={index === active ? 16 : 13}
                />
              )}
              <circle
                className={`swim-map__dot${point.milestone ? ' swim-map__dot--milestone' : ''}${
                  index === active ? ' swim-map__dot--active' : ''
                }`}
                cx={point.x}
                cy={point.y}
                r={point.milestone ? 7 : 4.5}
              />
            </g>
          ))}
        </svg>
        {points.map((point, index) => (
          <button
            key={`hit-${point.date}-${index}`}
            type="button"
            className="swim-map__hit"
            style={{ left: `${(point.x / WIDTH) * 100}%`, top: `${(point.y / HEIGHT) * 100}%` }}
            aria-label={`${formatDate(point.date)}，${point.note}`}
            aria-pressed={index === active}
            onClick={() => setActive(index)}
          />
        ))}
      </figure>

      {current && (
        <article
          className={`swim-map__card${current.milestone ? ' swim-map__card--milestone' : ''}`}
        >
          <p className="swim-map__meta">
            {current.milestone && (
              <span className="swim-log__mark" aria-hidden="true">
                ✦
              </span>
            )}
            <time dateTime={current.date}>{formatDate(current.date)}</time>
            {current.milestone && <span className="swim-log__tag">节点</span>}
          </p>
          <p className="swim-map__note">{current.note}</p>
        </article>
      )}
    </section>
  )
}

export function SwimLog() {
  if (phases.length === 0) {
    return <p className="quote-list__empty">还没有记录，去 sessions.json 里加上第一条吧。</p>
  }

  return (
    <div className="swim-map">
      {phases.map((phase) => (
        <SwimPhaseChart key={phase.title} title={phase.title} sessions={phase.sessions} />
      ))}
    </div>
  )
}
