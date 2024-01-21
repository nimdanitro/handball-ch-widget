const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/rest',
    createProxyMiddleware({
      target: 'https://clubapi-test.handball.ch',
      logLevel: 'info',
      changeOrigin: true,
      on: {
        proxyReq: (proxyReq, req, res) => proxyReq.setHeader('Authorization', `Basic ${process.env.REACT_APP_API_AUTH_TOKEN}`),
      }
    })
  );
};