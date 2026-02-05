// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, getProducts, getCategories } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

interface CategoryDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((cat) => ({ slug: cat.slug }))
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const { slug } = await params
  const [category, allProducts] = await Promise.all([
    getCategoryBySlug(slug),
    getProducts(),
  ])

  if (!category) {
    notFound()
  }

  const categoryProducts = allProducts.filter(
    (p) => p.metadata?.category?.slug === slug
  )

  const catImage = category.metadata?.image

  return (
    <div>
      {/* Category hero */}
      <div className="relative h-64 md:h-80 overflow-hidden bg-gray-100">
        {catImage?.imgix_url ? (
          <img
            src={`${catImage.imgix_url}?w=1600&h=640&fit=crop&auto=format,compress`}
            alt={category.metadata?.name || category.title}
            width={1600}
            height={640}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-3">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
              <span>/</span>
              <span className="text-white">{category.metadata?.name || category.title}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {category.metadata?.name || category.title}
            </h1>
            {category.metadata?.description && (
              <p className="mt-2 text-white/75 max-w-lg">
                {category.metadata.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Products in category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {categoryProducts.length > 0 ? (
          <>
            <p className="text-sm text-gray-500 mb-8">
              {categoryProducts.length} product{categoryProducts.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No products in this category yet.</p>
            <Link
              href="/products"
              className="mt-4 inline-block text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              Browse all products →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}