/** @type {import('next').NextConfig} */
// En aperçu (v0 / next dev), servir le site à la racine /.
// En production (GitHub Pages), servir le site à /lab/.
const basePath = process.env.NODE_ENV === 'production' ? '/lab' : ''

const nextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
