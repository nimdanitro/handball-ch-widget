const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/rest',
    createProxyMiddleware({
      target: 'https://clubapi-test.handball.ch/rest ',
      changeOrigin: true,
      auth: atob(process.env.REACT_APP_API_AUTH_TOKEN),
      logger: console,
    })
  );
};