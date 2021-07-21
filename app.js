var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var crypto = require('crypto');
var cors = require('cors')
agentConfig = require('./config/agentConfig')
agentConfig.initConfig();
mqttClient = require('./mqtt/mqttClient');
influxClient = require('./influx/influxClient')
agentDiscovery = require('./discovery/discovery')
swaggerSpecs = require('./utils/swaggerdocs');
const swaggerUi = require('swagger-ui-express');
scheduler = require('./scheduler/scheduler')
RFMLogger = require('./utils/logger');


mqttClient.initClient();
influxClient.initClient();
agentDiscovery.initDiscovery();
scheduler.initScheduler();

var metricsRouter = require('./routes/metrics/metrics');
var systemInfoRouter = require('./routes/system/systeminfo');
var wifiRouter = require('./routes/system/wifi');
var bluetoothRouter = require('./routes/system/bluetooth');
var diskRouter = require('./routes/system/disks');
var fsRouter = require('./routes/system/fs');
var agentRouter = require('./routes/agent/agent');
var deviceProvisionigRouter = require('./routes/device_provisioning/device_provisoning')
var schedulerRouter = require('./routes/scheduler/scheduler')

var app = express();
app.use(logger('combined', { "stream": RFMLogger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/systeminfo', systemInfoRouter);
app.use('/wifi', wifiRouter);
app.use('/disks', diskRouter);
app.use('/fs', fsRouter);
app.use('/agent', agentRouter)
app.use('/bluetooth', bluetoothRouter);
app.use('/metrics', metricsRouter);
app.use('/device_provisioning', deviceProvisionigRouter);
app.use('/scheduler', schedulerRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.get('/', function (req, res) {
  throw new Error('BROKEN') // Express will catch this on its own.
})

app.listen(agentConfig.getServerConfig().port, "0.0.0.0", () => {
  RFMLogger.info('Welcome to Raspberry-Pi F\leet manager');
  RFMLogger.info('RFM REST API listening on port:' + agentConfig.getServerConfig().port);
})
app.use(cors());

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    debug('HTTP server closed')
  })
})

process.on('SIGINT', function () {
  RFMLogger.info("Shutting down agent");
  if (true)
    process.exit();
});



module.exports = app;
