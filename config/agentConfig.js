const fs = require('fs');
const path = require('path');
const homedir = require('os').homedir();
var configDirPath = require('path').join(homedir, '.rfm');
var agentFullConfig;

var config;
const appRoot = path.resolve(__dirname);

var agentConfig = {

  initConfig: function () {

    if (!fs.existsSync(configDirPath)) {
      fs.mkdir(configDirPath,
        { recursive: true }, (err) => {
          if (err) {
            console.log('Config directory already exists!');
          } else {
            console.log('Config directory created successfully!');
            copyDefaultConfig();
          }
        });
    }
    console.log("loading agent configuration from " + configDirPath);
    process.env["NODE_CONFIG_DIR"] = configDirPath
    config = require('config');
    agentFullConfig = config.get('agent');

  },

  setConfig: function () {

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

}

function writeConfigFile(config) {
  try {
    fs.writeFile(configDirPath + '/default.json', JSON.stringify({ "agent": config }), {
      // flag: 'a' // 'a' flag for append
    }, (err) => {
      console.log("ERROR: ", err)
    })
  } catch (err) {
    console.log(err);
  }

}

function copyDefaultConfig() {
  fs.copyFileSync(appRoot + "/default.json", require('path').join(homedir, '.rfm') + "/default.json", (err) => {
    if (err) {
      console.log("Error while copying agent config file", err);
    }
    else {
      console.log("agent config copied successfully")
    }
  });
}


module.exports = agentConfig;