const agentConfig = require('../config/agentConfig')
var mqtt = require('mqtt')

var client;
agentConfig.initConfig();

var mqttClient = {
   
    initClient: function(){
        if(!client){
            var mqttConfig = agentConfig.getMqttConfig();
            var mqttUrl = 'mqtt://' + mqttConfig.broker_url + ":" + mqttConfig.broker_port
            console.log("connecting to " + mqttUrl)
            client  = mqtt.connect(mqttUrl)
        }
    },

    restartClient: function(){
        if(client){
            client.reconnect
        }
    },

    disconnectClient: function(){
        if(client){
            client.close();
        }
    },

    getConnectedStatus: function(){
        if(client){
            return client.connected;
        }else{
            return false;
        }
    }

}

module.exports = mqttClient;