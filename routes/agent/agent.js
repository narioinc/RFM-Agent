var express = require('express');
var router = express.Router();
const merge = require('deepmerge')
var pjson = require('../../package.json');
var mqttClient = require('../../mqtt/mqttClient');


process.env["NODE_CONFIG_DIR"] = "~/.rfm/";
const config = require('config');
var agentConfig = require('../../config/agentConfig');
const influxClient = require('../../influx/influxClient');

router.get('/', function (req, res) {
    throw new Error('BROKEN') // Express will catch this on its own.
})

router.get('/health', function (req, res, next) {
    mqttConnected = mqttClient.getConnectedStatus()
    influxConnected = influxClient.getConnectedStatus();
    influxConnected.then(data => {
        res.status(200);
        res.json({ "health": { "agent": "up", "mqtt": mqttConnected ? "up" : "down", "influx": data.status == 'pass' ? "up" : "down" } });
    })

})

router.get('/info', function (req, res, next) {
    var agentVersion = pjson.version;
    var nodeVersion = process.version;
    var processUid = process.pid;
    var processArch = process.arch;
    var processPlatfrom = process.platform;
    var processMem = process.memoryUsage();
    var processUptime = process.uptime();
    var agentInfo = {
        version: agentVersion,
        node: nodeVersion,
        pUid: processUid,
        arch: processArch,
        platform: processPlatfrom,
        mem: processMem,
        uptime: processUptime
    }
    res.status(200)
    res.json(agentInfo)
})

router.get('/config', function (req, res, next) {
    res.status(200);
    res.json(agentConfig.getAgentConfig())
})

router.post('/config', function (req, res, next) {
    var mergedConfig = merge(agentConfig.getAgentConfig(), req.body);
    agentConfig.setAgentConfig(mergedConfig)
    res.status(200);
    res.json({ "result": "config updated" });
})



module.exports = router;