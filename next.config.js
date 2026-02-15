/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
  // Configure Turbopack at the top-level (Next.js 16)
  turbopack: {
    // Explicitly set workspace root to this project directory
    root: path.resolve(__dirname),
  },
};
