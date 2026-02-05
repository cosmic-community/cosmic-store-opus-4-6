import Link from 'next/link'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.metadata?.featured_image
  const category = product.metadata?.category
  const price = product.metadata?.price ?? 0
  const inStock = product.metadata?.in_stock

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
        {image?.imgix_url ? (
          <img
            src={`${image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
            alt={product.title}
            width={400}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {!inStock && (
          <div className="absolute top-3 left-3 bg-gray-900/80 text-white text-xs font-medium px-3 py-1 rounded-full">
            Out of Stock
          </div>
        )}
      </div>
      <div className="mt-4 space-y-1">
        {category && (
          <p className="text-xs font-medium text-brand-600 uppercase tracking-wider">
            {category.title}
          </p>
        )}
        <h3 className="text-base font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
          {product.title}
        </h3>
        <p className="text-lg font-bold text-gray-900">${price.toFixed(2)}</p>
      </div>
    </Link>
  )
}