var express = require('express');
var router = express.Router();
const merge = require('deepmerge')
var mqttClient = require('../../mqtt/mqttClient');

process.env["NODE_CONFIG_DIR"] = "~/.rfm/";
const config = require('config');
var agentConfig = require('../../config/agentConfig')

router.get('/health', function(req, res, next) {
    mqttConnected = mqttClient.getConnectedStatus()
    console.log(mqttConnected);
    res.status(200);
    res.json({"health": {"agent": "up", "mqtt": mqttConnected?"up": "down"}});
})

router.get('/config', function(req, res, next) {
    res.status(200);
    res.json(agentConfig.getAgentConfig())
})

router.post('/config', function(req, res, next) {
    var mergedConfig = merge(agentConfig.getAgentConfig(), req.body);
    agentConfig.setAgentConfig(mergedConfig)
    res.status(200);
    res.json({"result": "config updated"});
})



module.exports = router;