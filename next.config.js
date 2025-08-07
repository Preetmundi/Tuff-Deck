/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['www.tuffdeck.com.au', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ]
  },
  
  // SEO-friendly redirects for WordPress to Next.js migration
  async redirects() {
    return [
      // WordPress to Next.js redirects
      {
        source: '/products/:slug*',
        destination: '/products/:slug*',
        permanent: true,
      },
      {
        source: '/gallery/:slug*',
        destination: '/gallery/:slug*',
        permanent: true,
      },
      // Handle WordPress category URLs
      {
        source: '/product-category/:category/:slug*',
        destination: '/products/:category/:slug*',
        permanent: true,
      },
      // Handle old product URLs
      {
        source: '/product/:slug*',
        destination: '/products/:slug*',
        permanent: true,
      },
      // Handle WordPress pagination
      {
        source: '/page/:page',
        destination: '/gallery?page=:page',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
