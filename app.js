var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var crypto = require('crypto');
var cors = require('cors')
agentConfig = require('./config/agentConfig')
mqttClient = require('./mqtt/mqttClient');
influxClient = require('./influx/influxClient')
agentDiscovery = require ('./discovery/discovery')

agentConfig.initConfig();
mqttClient.initClient();
influxClient.initClient();
agentDiscovery.initDiscovery();

var metricsRouter = require('./routes/metrics/metrics');
var systemInfoRouter = require('./routes/system/systeminfo');
var wifiRouter = require('./routes/system/wifi');
var bluetoothRouter = require('./routes/system/bluetooth');
var diskRouter = require('./routes/system/disks');
var fsRouter = require('./routes/system/fs');
var agentRouter = require('./routes/agent/agent');

var app = express();


app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/systeminfo', systemInfoRouter);
app.use('/wifi', wifiRouter);
app.use('/disk', diskRouter);
app.use('/fs', fsRouter);
app.use('/agent', agentRouter)
app.use('/bluetooth', bluetoothRouter);
app.use('/metrics', metricsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.get('/', function (req, res) {
  throw new Error('BROKEN') // Express will catch this on its own.
})

app.listen(agentConfig.getServerConfig().port, "0.0.0.0", () => {
  console.log('Welcome to Raspberry-Pi F\leet manager');
  console.log('RFM REST API listening on port:' + agentConfig.getServerConfig().port);
})
app.use(cors());

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    debug('HTTP server closed')
  })
})

process.on('SIGINT', function () {
  console.log("Shutting down agent");
  if (true)
    process.exit();
});



module.exports = app;
