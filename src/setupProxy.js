const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy('/news-api/**', { target: 'http://localhost:9090' }));
}