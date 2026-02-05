import { Suspense } from 'react'
import { getProducts, getCategories } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import CategoryFilter from '@/components/CategoryFilter'
import type { Product } from '@/types'

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ])

  let filteredProducts: Product[] = products
  if (category && category !== 'all') {
    filteredProducts = products.filter(
      (p) => p.metadata?.category?.slug === category
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-10">
        <p className="text-sm font-medium text-brand-600 uppercase tracking-wider">Browse</p>
        <h1 className="mt-1 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          All Products
        </h1>
        <p className="mt-3 text-gray-500 max-w-lg">
          Discover our full range of curated products across every category.
        </p>
      </div>

      {categories.length > 0 && (
        <div className="mb-8">
          <Suspense fallback={<div className="h-10" />}>
            <CategoryFilter categories={categories} />
          </Suspense>
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  )
}