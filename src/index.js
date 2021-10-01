const os = require('os');
const cluster = require('cluster');

const app = require('./server');
const config = require('./config');
const { mongoClient } = require('./database');
const { setConsoleMessage } = require('./lib');

if (cluster.isMaster) {
  let numCPUs = os.cpus().length;

  console.log(setConsoleMessage(`MODE = ${config.env}`, 'INFO'));

  if (config.env.toLowerCase() === 'development') numCPUs = 0;

  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('death', (worker) => {
    console.log(setConsoleMessage(`Worker ${worker.pricess.pid} died!`, 'WARNING'));
    cluster.fork();
    console.log(setConsoleMessage(`Worker ${worker.pricess.pid} reforked!`, 'INFO'));
  });

  (async () => {
    mongoClient.connect()
      .then(() => console.log(setConsoleMessage('Connection to service', 'OK')))
      .catch((err) => {
        console.log(setConsoleMessage(`Connection to service. ERROR: ${err}`, 'ERROR'));
        mongoClient.close();
        process.exit(1);
      });
  })();
}

process.on('uncaughtException', (err) => {
  console.log(err);
  console.log(setConsoleMessage('Uncaught Exception happened: ', 'ERROR'), err.message);
  app.log.error(err);
});

process.on('unhandledRejection', (reason, p) => {
  console.log(setConsoleMessage('Unhandled Rejection happened: ', 'ERROR'), reason, p);
  app.log.error(reason);
});

process.on('exit', () => {
  console.log(setConsoleMessage('Service stopped.', 'INFO'));
  app.log.info('Service stopped.');
});

if (app.start) app.start();
