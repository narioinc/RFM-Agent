const fs = require('fs');
const path = require('path');
const homedir = require('os').homedir();
var configDirPath = require('path').join(homedir, '.rfm');
RFMLogger = require('../utils/logger');

var agentFullConfig;
var config;
const appRoot = path.resolve(__dirname);

var agentConfig = {

  initConfig: function () {

    if (!fs.existsSync(configDirPath)) {
      fs.mkdir(configDirPath,
        { recursive: true }, (err) => {
          if (err) {
            RFMLogger.error('Config directory already exists!');
          } else {
            RFMLogger.info('Config directory created successfully!');
            copyDefaultConfig();
          }
        });
    }
    RFMLogger.info("loading agent configuration from " + configDirPath);
    process.env["NODE_CONFIG_DIR"] = configDirPath
    config = require('config');
    agentFullConfig = config.get('agent');

  },

  getServerConfig: function () {
    return agentFullConfig['server']
  },

  getMqttConfig: function () {
    return agentFullConfig['mqtt'];
  },

  getInfluxConfig: function () {
    return agentFullConfig['influxdb'];
  },

  getAgentConfig: function () {
    return agentFullConfig
  },

  setAgentConfig: function (config) {
    agentFullConfig = config;
    writeConfigFile(config)
  },

  getSchedulerConfig: function () {
    return agentFullConfig['scheduler'];
  }

}

function writeConfigFile(config) {
  try {
    fs.writeFile(configDirPath + '/default.json', JSON.stringify({ "agent": config }), {
      // flag: 'a' // 'a' flag for append
    }, (err) => {
      RFMLogger.error("ERROR: ", err)
    })
  } catch (err) {
    RFMLogger.error(err);
  }

}

function copyDefaultConfig() {
  fs.copyFileSync(appRoot + "/default.json", require('path').join(homedir, '.rfm') + "/default.json", (err) => {
    if (err) {
      RFMLogger.error("Error while copying agent config file", err);
    }
    else {
      RFMLogger.info("agent config copied successfully")
    }
  });
}


module.exports = agentConfig;