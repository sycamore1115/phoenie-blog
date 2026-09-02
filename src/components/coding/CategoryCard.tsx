import { Link } from 'react-router-dom'
import type { CodingCategory } from './categories'
import { useArticleLibrary } from './library'

type CategoryCardProps = {
  category: CodingCategory
}

export function CategoryCard({ category }: CategoryCardProps) {
  const library = useArticleLibrary()

  return (
    <Link to={`${library.route}/${category.id}`} className="category-card">
      <span className="category-card__label">{category.label}</span>
      {category.hint && <span className="category-card__hint">{category.hint}</span>}
    </Link>
  )
}
