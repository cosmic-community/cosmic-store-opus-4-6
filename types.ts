export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, unknown>
  type?: string
  created_at?: string
  modified_at?: string
  status?: string
  thumbnail?: string
}

export interface CosmicImage {
  url: string
  imgix_url: string
}

export interface Category extends CosmicObject {
  metadata: {
    name: string
    description?: string
    image?: CosmicImage
  }
}

export interface RatingOption {
  key: string
  value: string
}

export interface Testimonial extends CosmicObject {
  metadata: {
    customer_name: string
    rating: RatingOption
    quote: string
    customer_photo?: CosmicImage
  }
}

export interface Product extends CosmicObject {
  metadata: {
    description: string
    price: number
    featured_image?: CosmicImage
    category?: Category
    in_stock: boolean
  }
}