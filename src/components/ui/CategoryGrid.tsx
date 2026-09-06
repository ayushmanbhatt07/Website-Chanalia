import { categories } from '@/content/categories';
import { CategoryCard } from './CategoryCard';
import { Reveal } from './Reveal';

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((cat, i) => (
        <Reveal key={cat.slug} delay={i * 0.07}>
          <CategoryCard category={cat} />
        </Reveal>
      ))}
    </div>
  );
}
