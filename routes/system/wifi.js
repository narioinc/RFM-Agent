var express = require('express');
var router = express.Router();
const si = require('systeminformation');

router.get('/', function (req, res) {
    throw new Error('BROKEN') // Express will catch this on its own.
});

/**
 * @swagger
 * /wifi/summary:
 *   get:
 *     description: Agent system Wifi summary
 *     tags: [Wifi]
 *     responses:
 *       200:
 *         description: Returns the agent system's wifi summary.
 */
router.get('/summary', function (req, res, next) {
    Promise.all([si.wifiInterfaces(), si.wifiConnections()]).then((messages) => {
        console.log(messages);
        res.status(200);
        res.json({ "summary": { "wifiInterfaces": messages[0], "wifiConnections": messages[1] } });
    })
});

/**
 * @swagger
 * /wifi/networks:
 *   get:
 *     description: Agent system wifi networks information
 *     tags: [Wifi]
 *     responses:
 *       200:
 *         description: Returns the agent system's wifi networks returned from a scan.
 */
router.get('/networks', function (req, res, next) {
    si.wifiNetworks().then(data => {
        res.status(200);
        res.json({ "wifiNetworks": data });
    }).catch(error => {

    })
})

/**
 * @swagger
 * /wifi/interfaces:
 *   get:
 *     description: Agent system wifi interfaces information
 *     tags: [Wifi]
 *     responses:
 *       200:
 *         description: Returns the agent system's wifi interfaces.
 */
router.get('/interfaces', function (req, res, next) {
    si.wifiInterfaces().then(data => {
        res.status(200);
        res.json({ "wifiInterfaces": data });
    }).catch(error => {

    })
})

/**
 * @swagger
 * /wifi/connections:
 *   get:
 *     description: Agent system wifi connections information
 *     tags: [Wifi]
 *     responses:
 *       200:
 *         description: Returns the agent system's wifi active connections.
 */
router.get('/connections', function (req, res, next) {
    si.wifiConnections().then(data => {
        res.status(200);
        res.json({ "wifiConnections": data });
    }).catch(error => {

    })
})

module.exports = router;