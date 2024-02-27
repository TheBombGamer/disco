/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      // appDir: true,
      // serverActions:true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      domains: ['lh3.googleusercontent.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'utfs.io',
        }
      ] 
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
      return config
    }
  }
  
  module.exports = nextConfig