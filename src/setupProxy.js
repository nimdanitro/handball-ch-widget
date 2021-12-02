const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/rest',
    createProxyMiddleware({
      target: 'https://api.handball.ch',
      auth: process.env.REACT_APP_API_AUTH_TOKEN,
      logLevel: 'debug',
      changeOrigin: true,
    })
  );
};
