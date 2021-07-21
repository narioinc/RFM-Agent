var express = require('express');
var router = express.Router();
const si = require('systeminformation');

router.get('/', function (req, res) {
    throw new Error('BROKEN') // Express will catch this on its own.
})


/**
 * @swagger
 * /disks/summary:
 *   get:
 *     description: Agent system disks summary
 *     tags: [Disks]
 *     responses:
 *       200:
 *         description: Returns the agent system's disks information summary.
 */
router.get('/summary', function (req, res, next) {
    Promise.all([si.diskLayout(), si.disksIO()]).then((messages) => {
        res.status(200);
        res.json({ "summary": { "diskLayout": messages[0], "disksIO": messages[1] } });
    })
});

/**
 * @swagger
 * /disks/disk_layout:
 *   get:
 *     description: Agent system disks layout
 *     tags: [Disks]
 *     responses:
 *       200:
 *         description: Returns the agent system's disks layout information.
 */
router.get('/disk_layout', function (req, res, next) {
    si.diskLayout().then(data => {
        res.status(200);
        res.json({ "diskLayout": data });
    }).catch(error => {

    })
})

/**
 * @swagger
 * /disks/block_devices:
 *   get:
 *     description: Agent system block devices
 *     tags: [Disks]
 *     responses:
 *       200:
 *         description: Returns the agent system's block devcies information.
 */
router.get('/block_devices', function (req, res, next) {
    si.blockDevices().then(data => {
        res.status(200);
        res.json({ "blockDevices": data });
    }).catch(error => {

    })
})

/**
 * @swagger
 * /disks/disks_io:
 *   get:
 *     description: Agent system disks io
 *     tags: [Disks]
 *     responses:
 *       200:
 *         description: Returns the agent system's disks io stats.
 */
router.get('/disks_io', function (req, res, next) {
    si.disksIO().then(data => {
        res.status(200);
        res.json({ "disksIO": data });
    }).catch(error => {

    })
})

module.exports = router;