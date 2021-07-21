var express = require('express');
var router = express.Router();
const si = require('systeminformation');

const SYSTEM_SUMMARY = 0;
const CPU_SUMMARY = 1
const CPU_INFO = 0;
const CPU_FLAGS = 1;
const CPU_CURRENT_SPEED = 2;
const CPU_TEMP = 3;

router.get('/', function (req, res) {
    throw new Error('BROKEN') // Express will catch this on its own.
})

/**
 * @swagger
 * /systeminfo/summary:
 *   get:
 *     description: System Info Summary
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Returns the agent system's summary and CPU.
 */
router.get('/summary', function (req, res, next) {
    getSystemSummaryInfo().then(data => {
        var systemSummaryInfo = { "summary": {} }
        systemSummaryInfo["summary"]["system"] = data[SYSTEM_SUMMARY];
        systemSummaryInfo["summary"]["cpu"] = data[CPU_SUMMARY];
        res.status(200)
        res.send(systemSummaryInfo);
    })
});

/**
 * @swagger
 * /systeminfo/system:
 *   get:
 *     description: Agent system information
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Returns the agent system's information.
 */
router.get('/system', function (req, res, next) {
    si.system().then(data => {
        res.status(200);
        res.json({ "system": data });
    }).catch(error => {

    });
});

/**
 * @swagger
 * /systeminfo/cpu:
 *   get:
 *     description: Agent system CPU information
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Returns the agent systems CPU information.
 */
router.get('/cpu', function (req, res, next) {
    Promise.all([si.cpu(), si.cpuFlags(), si.cpuCurrentSpeed(), si.cpuTemperature()]).then(messages => {
        res.status(200);
        res.json({ "cpu": { "cpuInfo": messages[CPU_INFO], "cpuFlags": messages[CPU_FLAGS], "cpuCurrentSpeed": messages[CPU_CURRENT_SPEED], "cpuTemperature": messages[CPU_TEMP] } });
    }).catch(error => {

    });
});

/**
 * @swagger
 * /systeminfo/bios:
 *   get:
 *     description: Agent system BIOS information
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Returns the agent systems BIOS information.
 */
router.get('/bios', function (req, res, next) {
    si.bios().then(data => {
        res.status(200);
        res.json({ "bios": data });
    }).catch(error => {

    })
})

/**
 * @swagger
 * /systeminfo/baseboard:
 *   get:
 *     description: Agent system baseboard information
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Returns the agent systems baseboard information.
 */
router.get('/baseboard', function (req, res, next) {
    si.baseboard().then(data => {
        res.status(200);
        res.json({ "baseboard": data });
    }).catch(error => {

    })
})

/**
 * @swagger
 * /systeminfo/mem:
 *   get:
 *     description: Agent system memory information
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Returns the agent system's memory information.
 */
router.get('/mem', function (req, res, next) {
    si.mem().then(data => {
        res.status(200);
        res.json({ "mem": data });
    }).catch(error => {

    })
})

/**
 * @swagger
 * /systeminfo/osinfo:
 *   get:
 *     description: Agent system OS information
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Returns the agent system's OS information.
 */
 router.get('/osinfo', function (req, res, next) {
    si.osInfo().then(data => {
        res.status(200);
        res.json({ "osinfo": data });
    }).catch(error => {

    })
})


/**
 * @swagger
 * /systeminfo/processes:
 *   get:
 *     description: Agent system process information
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Returns the agent system's running process's information.
 */
router.get('/processes', function (req, res, next) {
    si.processes().then(data => {
        res.status(200);
        res.json({ "processes": data });
    }).catch(error => {

    })
});


/**
 * @swagger
 * /systeminfo/current_load:
 *   get:
 *     description: Agent system process CPU load
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Returns the agent system's CPU load information.
 */
router.get('/current_load', function (req, res, next) {
    si.currentLoad().then(data => {
        res.status(200);
        res.json({ "currentLoad": data });
    }).catch(error => {

    })
});


/**
 * @swagger
 * /systeminfo/network:
 *   get:
 *     description: Agent system process network information
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Returns the agent system's network information.
 */
router.get('/network', function (req, res, next) {
    Promise.all([si.networkInterfaces(), si.networkStats()]).then((messages) => {
        res.status(200);
        res.json({ "network": { "interfaces": messages[0], "networkstats": messages[1] } });
    })
});

/**
 * @swagger
 * /systeminfo/network_connections:
 *   get:
 *     description: Agent system process network connections information
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Returns the agent system's network connections information.
 */
router.get('/network_connections', function (req, res, next) {
    si.networkConnections().then(data => {
        res.status(200);
        res.json({ "networkConnections": data });
    }).catch(error => {

    })
});


/**
 * @swagger
 * /systeminfo/usb:
 *   get:
 *     description: Agent system USB devices information
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Returns the agent system's USB and connected devices information.
 */
router.get('/usb', function (req, res, next) {
    si.usb().then(data => {
        res.status(200);
        res.json({ "usb": data });
    }).catch(error => {

    })
})


function getSystemSummaryInfo() {
    return Promise.all([si.system(), si.cpu()])
}

module.exports = router;
