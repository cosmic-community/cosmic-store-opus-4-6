import Link from 'next/link'
import { getProducts, getCategories, getTestimonials } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import TestimonialCard from '@/components/TestimonialCard'

export default async function HomePage() {
  const [products, categories, testimonials] = await Promise.all([
    getProducts(),
    getCategories(),
    getTestimonials(),
  ])

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-brand-600 uppercase tracking-wider">
              Welcome to Cosmic Store
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Curated products,
              <br />
              <span className="text-brand-600">crafted with care.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-lg">
              Discover our hand-picked collection of quality products across apparel, electronics, and home essentials.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors"
              >
                Shop Now
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-100/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-brand-200/30 rounded-full blur-3xl" />
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-medium text-brand-600 uppercase tracking-wider">Browse</p>
              <h2 className="mt-1 text-3xl font-bold text-gray-900 tracking-tight">Categories</h2>
            </div>
            <Link
              href="/categories"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors hidden sm:block"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const catImage = cat.metadata?.image
              return (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
                >
                  {catImage?.imgix_url ? (
                    <img
                      src={`${catImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                      alt={cat.metadata?.name || cat.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-xl font-bold text-white">{cat.metadata?.name || cat.title}</h3>
                    {cat.metadata?.description && (
                      <p className="mt-1 text-sm text-white/75 line-clamp-2">{cat.metadata.description}</p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Featured Products */}
      {products.length > 0 && (
        <section className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-sm font-medium text-brand-600 uppercase tracking-wider">Shop</p>
                <h2 className="mt-1 text-3xl font-bold text-gray-900 tracking-tight">Featured Products</h2>
              </div>
              <Link
                href="/products"
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors hidden sm:block"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-brand-600 uppercase tracking-wider">Testimonials</p>
            <h2 className="mt-1 text-3xl font-bold text-gray-900 tracking-tight">What our customers say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}