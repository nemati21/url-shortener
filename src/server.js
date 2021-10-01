const cluster = require('cluster');
const fastify = require('fastify');
const fastifySwagger = require('fastify-swagger');

const config = require('./config');

// Routes
const userRoutes = require('./routes/auth/v1');
const urlRoutes = require('./routes/url/v1');

const { setConsoleMessage, setErrorResponse } = require('./lib');

const app = fastify({
  logger: {
    level: config.logger.level,
    file: config.logger.file,
    serializers: {
      res(res) {
        return {
          statusCode: res.statusCode,
          request: res.input,
          payload: res.raw.payload,
        };
      },
    },
  },
  pluginTimeout: 3000,
  ignoreTrailingSlash: true,
  bodyLimit: 10 * 1024 * 1024,
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.register(fastifySwagger, config.documentation);

if (cluster.isWorker || config.env.toLowerCase() === 'development') {
  app.addHook('onSend', (request, reply, payload, next) => {
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin, Cache-Control');
    reply.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');

    let data;
    try {
      if (payload && payload.length && (payload.startsWith('{') || payload.startsWith('['))) data = JSON.parse(payload);
      if (Array.isArray(data) && data.length > 3) data = 'bulk-data';
    } catch {
      data = null;
    }

    Object.assign(reply.raw, {
      payload: data || undefined,
      input: {
        method: request.raw.method,
        url: request.raw.url,
        query: request.query,
        body: request.body || undefined,
        headers: request.headers,
      },
    });

    next();
  });

  app.setErrorHandler((err, req, res) => {
    console.log(setConsoleMessage(`Error occured on ${req.raw.method} ${req.raw.url}`, 'ERROR'), err);
    app.log.error({
      request: {
        url: req.raw.url,
        method: req.raw.method,
        headers: req.raw.headers,
        body: req.body,
        query: req.query,
      },
      err,
    });

    setErrorResponse(err, res);
  });

  app.setNotFoundHandler({}, (req, res) => setErrorResponse(404, res));

  app.start = () => {
    app.register(userRoutes, { prefix: '/api/v1/auth' });
    app.register(urlRoutes, { prefix: '/api/v1/url' });

    app.ready((err) => {
      app.swagger();
      if (err) return console.log(setConsoleMessage('Cannot start fastify because of an error', 'ERROR'), err);
      (async () => {
        try {
          app.listen(config.server.port, '0.0.0.0', (listenErr, address) => {
            if (listenErr) {
              console.log(setConsoleMessage('Cannot start server because of error:', 'ERROR'), listenErr.message);
              throw new Error(listenErr);
            } else {
              console.log(setConsoleMessage(`Service is ready, listening on ${address}`, 'OK'));
            }
          });
        } catch (e) {
          process.exit(1);
        }
      })();
      return true;
    });
  };
}

module.exports = app;
