// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { getProductBySlug, getProducts } from '@/lib/cosmic'

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({ slug: product.slug }))
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const image = product.metadata?.featured_image
  const category = product.metadata?.category
  const price = product.metadata?.price ?? 0
  const inStock = product.metadata?.in_stock
  const description = product.metadata?.description || ''

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-gray-600 transition-colors">Products</Link>
        <span>/</span>
        <span className="text-gray-600">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Image */}
        <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
          {image?.imgix_url ? (
            <img
              src={`${image.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
              alt={product.title}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="text-sm font-medium text-brand-600 uppercase tracking-wider hover:text-brand-700 transition-colors w-fit"
            >
              {category.title}
            </Link>
          )}
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            {product.title}
          </h1>
          <p className="mt-4 text-3xl font-bold text-gray-900">${price.toFixed(2)}</p>

          <div className="mt-4 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${
                inStock
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  inStock ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              {inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-8">
            <div className="prose prose-gray prose-sm max-w-none">
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
          </div>

          <div className="mt-8">
            <button
              disabled={!inStock}
              className={`w-full sm:w-auto px-8 py-3.5 text-sm font-semibold rounded-full transition-colors ${
                inStock
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {inStock ? 'Add to Cart' : 'Sold Out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}