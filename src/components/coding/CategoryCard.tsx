import { Link } from 'react-router-dom'
import type { CodingCategory } from './categories'

type CategoryCardProps = {
  category: CodingCategory
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link to={`/stars/coding/${category.id}`} className="category-card">
      <span className="category-card__label">{category.label}</span>
      {category.hint && <span className="category-card__hint">{category.hint}</span>}
    </Link>
  )
}
