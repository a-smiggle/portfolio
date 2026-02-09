module.exports = {
  experimental: {
    turbopackUseSystemTlsCerts: true,
    turbopack: {
      // Set root to this app directory to avoid incorrect workspace root inference
      root: process.cwd(),
    },
  },
};
