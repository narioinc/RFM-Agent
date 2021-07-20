//const agentConfig = require('../config/agentConfig')
const { InfluxDB, Point, HttpError } = require('@influxdata/influxdb-client')
const { HealthAPI } = require('@influxdata/influxdb-client-apis')
const agentConfig = require('../config/agentConfig');
var client

var influxClient = {
    isInfluxMetricEnabled: agentConfig.getInfluxConfig().enabled,
    initClient: function () {
        if (this.isInfluxMetricEnabled) {
            var url = "http://" + agentConfig.getInfluxConfig().host + ":" + agentConfig.getInfluxConfig().port;
            var token = agentConfig.getInfluxConfig().token
            client = new InfluxDB({ url, token })
        }
    },

    closeClient: function () {
        if (client) {
            client.close().then(() => {
                console.log("closing influxdb connection")
            }).catch(err => {
                console.log("unable to close influxdb connection")
            })
        }
    },

    writePoint: function (point) {

    },

    getConnectedStatus: function () {

        if (client) {
            try {
                const healthAPI = new HealthAPI(client)
                return healthAPI.getHealth();
            } catch (err) {
                return Promise.resolve({ "status": "fail" });
            }
        } else {
            return Promise.resolve({ "status": "fail" });
        }
    }
}


module.exports = influxClient;