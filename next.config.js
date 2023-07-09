/** @type {import('next').NextConfig} */

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_SERVER,
  PHASE_PRODUCTION_BUILD
} = require('next/constants');
const axios = require('axios').default;

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: process.env.NEXT_PUBLIC_STRAPI_APOLLO_SERVER_HOST,
        port: '1337',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/users/:path*',
        destination: `${process.env.NEXT_PUBLIC_AUTH_URL}/api/users/:path*`,
      },
    ]
  },
  
  output: 'standalone',
}

const bootServices = async () => {
  console.log('boot service', `${process.env.NEXT_PUBLIC_URL}/api/_boot`);
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/_boot`, {
      timeout: 3000
    });
    return JSON.stringify(res.data.bootedServices);
  } catch (error) {
    console.log('Error', error.message);
    return false;
  }
}

module.exports = async (phase, { defaultConfig }) => {
  if (process.argv.includes('dev') && phase === PHASE_DEVELOPMENT_SERVER) {
    console.log('[ next.config.js (dev) ]');
    const bootedServices = await bootServices();
    console.log(`[ next.config.js (dev) ] => bootedServices: ${bootedServices}`);

  } else if (process.argv.includes('start') && phase === PHASE_PRODUCTION_SERVER) {
    console.log('[ next.config.js (start) ]');
    setTimeout(async () => {
      const bootedServices = await bootServices();
      console.log(`[ next.config.js (start) ] => bootedServices: ${bootedServices}`);
    }, 2000);

  } else if (process.argv.includes('build') && phase === PHASE_PRODUCTION_BUILD) {
    console.log('[ next.config.js (build) ]');

  }

  return nextConfig;
};