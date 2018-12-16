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

server.get('/vigicrue', asyncController(VigicrueController.indexHandler));

// router.get('/weather', asyncController(ServiceController.getWeather));
// router.get('/traffic', asyncController(ServiceController.getTraffic));
// router.get('/connected_devices', asyncController(ServiceController.getConnectedDevices));
// router.get('/water_level', asyncController(ServiceController.getWaterLevel));
// router.get('/indoor_metrics', asyncController(ServiceController.getIndoorMetrics));

server.listen(8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});
