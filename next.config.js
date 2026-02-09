/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    turbopackUseSystemTlsCerts: true,
    turbopack: {
      root: process.cwd(),
    },
  },
};
