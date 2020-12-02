const Koa = require('koa'),
  app = new Koa(),
  koa = require('koa-router')(),
  json = require('koa-json'),
  logger = require('koa-logger'),
  static = require('koa-static'),
  path = require('path'),
  api = require('./server/routes/api')
  // , auth = require('./server/routes/auth'); 
;

const config = require('./config/index')

app.use(require('koa-bodyparser')());
app.use(json());
app.use(static(path.join(__dirname,'./upload')))
app.use(logger());
app.use(function*(next) {
  let start = new Date;
  yield next;
  let ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});
app.on('error', function(err, ctx) {
  console.log('server error', err);
});

koa.use('/api', api.routes());
// koa.use('/auth',auth.routes());
app.use(koa.routes());

app.listen(8887, () => {
  console.log('Koa is listening in 8887');
});
module.exports = app;