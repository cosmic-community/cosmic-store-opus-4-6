'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'

  function handleFilter(slug: string) {
    if (slug === 'all') {
      router.push('/products')
    } else {
      router.push(`/products?category=${slug}`)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleFilter('all')}
        className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
          activeCategory === 'all'
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleFilter(cat.slug)}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
            activeCategory === cat.slug
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {cat.metadata?.name || cat.title}
        </button>
      ))}
    </div>
  )
}