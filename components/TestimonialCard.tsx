import type { Testimonial } from '@/types'

interface TestimonialCardProps {
  testimonial: Testimonial
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-brand-400' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const photo = testimonial.metadata?.customer_photo
  const ratingKey = testimonial.metadata?.rating?.key
  const numericRating = ratingKey ? parseInt(ratingKey, 10) : 5

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <StarRating rating={numericRating} />
      <blockquote className="mt-4 text-sm text-gray-600 leading-relaxed">
        &ldquo;{testimonial.metadata?.quote}&rdquo;
      </blockquote>
      <div className="mt-5 flex items-center gap-3">
        {photo?.imgix_url ? (
          <img
            src={`${photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
            alt={testimonial.metadata?.customer_name || 'Customer'}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-bold text-gray-400">
              {testimonial.metadata?.customer_name?.charAt(0) || '?'}
            </span>
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {testimonial.metadata?.customer_name}
          </p>
          <p className="text-xs text-gray-400">Verified Customer</p>
        </div>
      </div>
    </div>
  )
}