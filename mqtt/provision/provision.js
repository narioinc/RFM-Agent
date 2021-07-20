mqttClient = require('../mqttClient');
mqttUtils = require('../mqttUtils')

const deviceProvisionTopic = mqttUtils.getSubscriptionTopic("device_provision");

var provision = {
    listen: function(){
        mqttClient.subscribeToTopic(deviceProvisionTopic, (err)=>{});
        mqttClient.getClient().on('message', function (topic, message, packet) {
            handleProvision(topic, message, packet)
        })
    }
}

function handleProvision(topic, message, packet){
    //TODO handle provisoning packets here
    //console.log(topic + " " + message)
}

module.exports = provision;