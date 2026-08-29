import type { CodingCategory } from './categories'
import { CategoryCard } from './CategoryCard'

type CategoryGridProps = {
  categories: CodingCategory[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  if (categories.length === 0) {
    return <p className="quote-list__empty">还没有分类。</p>
  }

  return (
    <div className="coding-grid">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  )
}
