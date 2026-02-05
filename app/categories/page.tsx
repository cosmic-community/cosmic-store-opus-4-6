import Link from 'next/link'
import { getCategories } from '@/lib/cosmic'

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-10">
        <p className="text-sm font-medium text-brand-600 uppercase tracking-wider">Browse</p>
        <h1 className="mt-1 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          All Categories
        </h1>
        <p className="mt-3 text-gray-500 max-w-lg">
          Explore our product categories and find exactly what you&apos;re looking for.
        </p>
      </div>

      {categories.length > 0 ? (
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
                  <h2 className="text-xl font-bold text-white">
                    {cat.metadata?.name || cat.title}
                  </h2>
                  {cat.metadata?.description && (
                    <p className="mt-1 text-sm text-white/75 line-clamp-2">
                      {cat.metadata.description}
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No categories found.</p>
        </div>
      )}
    </div>
  )
}