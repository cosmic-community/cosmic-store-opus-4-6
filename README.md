# Cosmic Store

![Cosmic Store](https://imgix.cosmicjs.com/990984e0-02da-11f1-8ff7-d371bf318bd0-photo-1505740420928-5e560c06d30e-1770327331800.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, minimal ecommerce storefront built with Next.js 16, Tailwind CSS, and Cosmic. Features a product catalog with category filtering, individual product pages, category browsing, and customer testimonials — all powered by your Cosmic content.

## Features

- 🛍️ **Product Catalog** — Browse and filter products by category
- 📄 **Product Detail Pages** — Rich markdown descriptions with pricing and stock info
- 🏷️ **Category Pages** — Dedicated pages for each product category with filtered products
- ⭐ **Customer Testimonials** — Social proof with star ratings and customer photos
- 📱 **Responsive Design** — Mobile-first with animated slide-out navigation
- ⚡ **Server-Side Rendering** — Fast page loads with Next.js App Router
- 🎨 **Minimal UI** — Clean design with Inter font and warm accents

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69850cd355f17531f420f335&clone_repository=69850eba55f17531f420f5c6)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a complete content model for: An ecommerce store with products, categories, and testimonials
>
> Use the install_content_model action to create ALL object types AND demo content in one step. Include:
> 1. All necessary object types with appropriate metafields
> 2. 2-3 demo objects for each type with realistic content
> 3. Unsplash image URLs for thumbnails and file metafields (use real URLs like https://images.unsplash.com/photo-...)
>
> Remember to create types that are referenced by others FIRST (e.g., categories and authors before blog posts)."

### Code Generation Prompt

> "Next.js, modern, minimal, tailwind css, inter font, responsive, mobile nav"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first CSS
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS
- [TypeScript 5](https://www.typescriptlang.org/) — Type safety
- [Inter Font](https://fonts.google.com/specimen/Inter) — Clean sans-serif typeface

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime installed
- A [Cosmic](https://www.cosmicjs.com) account with your ecommerce bucket

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd cosmic-store

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Start the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the store.

### Environment Variables

| Variable | Description |
|----------|-------------|
| `COSMIC_BUCKET_SLUG` | Your Cosmic bucket slug |
| `COSMIC_READ_KEY` | Your Cosmic read key |
| `COSMIC_WRITE_KEY` | Your Cosmic write key |

## Cosmic SDK Examples

### Fetching Products

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Product by Slug

```typescript
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'classic-denim-jacket' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

### Fetching Categories

```typescript
const { objects: categories } = await cosmic.objects
  .find({ type: 'categories' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This project uses three Cosmic object types:

| Object Type | Fields |
|-------------|--------|
| **Categories** | Name, Description, Image |
| **Testimonials** | Customer Name, Rating (select), Quote, Customer Photo |
| **Products** | Description (markdown), Price, Featured Image, Category (relation), In Stock (switch) |

Products reference Categories via an object relationship metafield. Use `depth(1)` when fetching products to include the full category data inline.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the repository in [Netlify](https://netlify.com)
3. Set build command to `bun run build` and publish directory to `.next`
4. Add environment variables in site settings
5. Deploy

<!-- README_END -->