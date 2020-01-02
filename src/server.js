const restify = require('restify');

const server = restify.createServer({
  name: 'home-sweet-home',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
// server.use(restify.plugins.queryParser());
// server.use(restify.plugins.bodyParser());

const asyncController = require('./libs/async-controller');

const VigicrueController = require('./controllers/vigicrue');
const WeatherController = require('./controllers/weather');
const NetatmoController = require('./controllers/netatmo');
const TrafficController = require('./controllers/traffic');
const NetworkController = require('./controllers/network');
const TrainsController = require('./controllers/trains');
const TuyaController = require('./controllers/tuya');

server.get('/vigicrue', asyncController(VigicrueController.indexHandler));
server.get('/weather', asyncController(WeatherController.indexHandler));
server.get('/netatmo', asyncController(NetatmoController.indexHandler));
server.get('/traffic', asyncController(TrafficController.indexHandler));
server.get('/network', asyncController(NetworkController.indexHandler));
server.get('/trains', asyncController(TrainsController.indexHandler));
server.get('/tuya', asyncController(TuyaController.indexHandler));

server.listen(8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});
