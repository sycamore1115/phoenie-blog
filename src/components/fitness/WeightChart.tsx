import { weights } from './weights'

const WIDTH = 640
const HEIGHT = 320
const PAD = { top: 28, right: 36, bottom: 44, left: 52 }

export function WeightChart() {
  const minKg = 100
  const maxKg = 130
  const innerWidth = WIDTH - PAD.left - PAD.right
  const innerHeight = HEIGHT - PAD.top - PAD.bottom

  const xAt = (index: number) =>
    PAD.left + (weights.length === 1 ? innerWidth / 2 : (index / (weights.length - 1)) * innerWidth)

  const yAt = (jin: number) =>
    PAD.top + ((maxKg - jin) / (maxKg - minKg)) * innerHeight

  const points = weights.map((item, index) => ({
    ...item,
    x: xAt(index),
    y: yAt(item.jin),
  }))

  const line = points.map((point) => `${point.x},${point.y}`).join(' ')
  const area = `${PAD.left},${PAD.top + innerHeight} ${line} ${points[points.length - 1]?.x},${PAD.top + innerHeight}`
  const ticks = [maxKg, Math.round((minKg + maxKg) / 2), minKg]

  return (
    <figure className="weight-chart">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="体重变化折线图，单位斤">
        {ticks.map((tick) => {
          const y = yAt(tick)
          return (
            <g key={tick}>
              <line className="weight-chart__grid" x1={PAD.left} x2={WIDTH - PAD.right} y1={y} y2={y} />
              <text className="weight-chart__axis" x={PAD.left - 10} y={y + 4} textAnchor="end">
                {tick}
              </text>
            </g>
          )
        })}
        <polygon className="weight-chart__area" points={area} />
        <polyline className="weight-chart__line" points={line} />
        {points.map((point) => (
          <g key={point.year}>
            <circle className="weight-chart__dot" cx={point.x} cy={point.y} r="6" />
            <text className="weight-chart__value" x={point.x} y={point.y - 14} textAnchor="middle">
              {point.jin} 斤
            </text>
            <text className="weight-chart__year" x={point.x} y={HEIGHT - 16} textAnchor="middle">
              {point.year}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  )
}
