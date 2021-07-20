const mdns = require('mdns');
const agentConfig = require('../config/agentConfig');
const ad;

var discovery = {
    isDiscoveryEnabled = agentConfig.getServerConfig().discovery,
    agentServerPort = agentConfig.getServerConfig().port,

    initDiscovery: function () {
        if (discovery) {
            try {
                ad = mdns.createAdvertisement(mdns.tcp('http'), this.agentServerPort);
                ad.start();
            } catch (err) {
                console.log(err);
            }
        }
    },

    stopDiscovery: function () {
        if (ad) {
            ad.stop();
        }
    }

}

module.exports = discovery