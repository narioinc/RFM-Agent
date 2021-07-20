var mqtt = require('mqtt');
const provision = require('./provision/provision');
var client;

var mqttClient = {
    isMqttLogsEnabled: agentConfig.getMqttConfig().logger.enabled,
    initClient: function () {
        if(this.isMqttLogsEnabled){
            process.env["DEBUG"] = process.env["DEBUG"] + ' mqttjs* '
        }
        if (!client) {
            var mqttConfig = agentConfig.getMqttConfig();
            var mqttUrl = 'mqtt://' + mqttConfig.broker_url + ":" + mqttConfig.broker_port
            console.log("connecting to " + mqttUrl)
            client = mqtt.connect(mqttUrl)
        }
        this.startListener();
    },

    getClient: function(){
        return client;
    },

    restartClient: function () {
        if (client) {
            client.reconnect();
        }
    },

    disconnectClient: function () {
        if (client) {
            client.close();
        }
    },

    getConnectedStatus: function () {
        if (client) {
            return client.connected;
        } else {
            return false;
        }
    },

    subscribeToTopic: function(topic, cb){
        if(client){
            if(topic){
                client.subscribe(topic, (err) => {cb(err)})
            }else{
                console.log("please provide a topic")
            }
        }else{
            console.log("mqtt client is not initialized")
        }
    },

    unsubscribeFromTopic: function(topic, cb){
        if(client){
            if(topic){
                client.unsubscribe(topic, cb(err))
            }else{
                console.log("please provide a topic")
            }
        }else{
            console.log("mqtt client is not initialized")
        }
    },

    startListener: function(){
        provision.listen();
    }

}

module.exports = mqttClient;