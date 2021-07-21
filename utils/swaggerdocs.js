const swaggerJsdoc = require('swagger-jsdoc');

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

  module.exports = specs