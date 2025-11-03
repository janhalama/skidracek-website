/**
 * Next.js configuration.
 * - Allowlisted external image domains for potential usage in components.
 */

/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'ski-dracek.click2stream.com' },
      { protocol: 'https', hostname: 'live.staticflickr.com' },
    ],
  },
};

module.exports = config;


