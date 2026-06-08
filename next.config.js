/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  eslint: {
    dirs: ['.']
  },
  // Set tracing root to current directory to avoid parent lockfile warnings
  outputFileTracingRoot: path.resolve(__dirname)
};

module.exports = nextConfig;
