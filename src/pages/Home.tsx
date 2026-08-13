import { Starfield } from '../components/Starfield'
import { SkyStar } from '../components/SkyStar'
import { stars } from '../data/stars'

export function Home() {
  return (
    <main className="sky">
      <div className="sky__nebula" aria-hidden="true" />
      <Starfield />

      <h1 className="sky__title">
        <span className="sky__name">phoenie</span>
        <span className="sky__blog">的博客</span>
      </h1>

      {stars.map((star) => (
        <SkyStar key={star.id} star={star} />
      ))}
    </main>
  )
}
