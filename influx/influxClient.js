//const agentConfig = require('../config/agentConfig')
const {InfluxDB, Point, HttpError} = require('@influxdata/influxdb-client')
const {HealthAPI} = require('@influxdata/influxdb-client-apis')
const agentConfig = require('../config/agentConfig');
var client

var influxClient = {
    initClient: function(){
        var url = "http://" + agentConfig.getInfluxConfig().host + ":" + agentConfig.getInfluxConfig().port;
        var token = agentConfig.getInfluxConfig().token
        client = new InfluxDB({url, token})
    },

    closeClient: function(){
        if(client){
            client.close().then(() => {
                console.log("closing influxdb connection")
            }).catch(err => {
                console.log("unable to close influxdb connection")
            })
        }
    },

    writePoint: function(point){

    },

    getConnectedStatus: function(){
        if(client){
            const healthAPI = new HealthAPI(client)
            return healthAPI.getHealth();
        }else{
            return Promise.resolve({"status":false});
        }
    }
}

module.exports = influxClient;