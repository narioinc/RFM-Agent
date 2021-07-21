const mdns = require('mdns');
const os = require('os')
const agentConfig = require('../config/agentConfig');
RFMLogger = require('../utils/logger');

var ad;

var discovery = {
    isDiscoveryEnabled: agentConfig.getServerConfig().discovery,
    agentServerPort: agentConfig.getServerConfig().port,

    initDiscovery: function () {
        if (discovery) {
            try {
                ad = mdns.createAdvertisement(mdns.tcp('http'), this.agentServerPort, { "name": "rfmagent" });
                RFMLogger.info("Starting advertisement service for http server running on port: " + this.agentServerPort)
                ad.start();
            } catch (err) {
                RFMLogger.error(err);
            }
        }
    },

    stopDiscovery: function () {
        if (ad) {
            RFMLogger.info("Stopping the http server advertisement")
            ad.stop();
        }
    }

}

module.exports = discovery