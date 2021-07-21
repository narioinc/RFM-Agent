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
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
scheduler = require('./scheduler/scheduler')

const jsDocOptions = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: 'RFM API',
      version: '1.0.0',
      description: 'API documentation for the Raspberry-Pi Fleet Manager agent',
    },
    "tags": [
      {
        "name": "System",
        "description": "Everything about your RFM Agent's system"
      },
      {
        "name": "Agent",
        "description": "Information about the agent including health and other extended info"
      },
      {
        "name": "Device Provisioning",
        "description": "Device provisionign workflows including add, delete, modify and others"
      },
      {
        "name": "Scheduler",
        "description": "RFM agent job scheduler"
      },
      {
        "name": "Metrics",
        "description": "RFM agent's metrics like CPU usage, mem usage etc"
      },
      {
        "name": "Wifi",
        "description": "RFM agent's wifi information"
      },
      {
        "name": "Filesystem",
        "description": "RFM agent's Filesystem information"
      },
      {
        "name": "Disks",
        "description": "RFM agent's physical disks information"
      },
      {
        "name": "Bluetooth",
        "description": "RFM agent's bluetooth information"
      }
    ],
  },
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: ['./routes/system/*.js', './routes/scheduler/*.js', './routes/metrics/*.js', './routes/device_provisioning/*.js', './routes/agent/*.js'],
};
const specs = swaggerJsdoc(jsDocOptions);

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
app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', swaggerUi.serve, swaggerUi.setup(specs));
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
