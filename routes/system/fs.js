var express = require('express');
var router = express.Router();
const si = require('systeminformation');

router.get('/', function (req, res) {
    throw new Error('BROKEN') // Express will catch this on its own.
})

/**
 * @swagger
 * /fs/summary:
 *   get:
 *     description: Agent system filesystem summary
 *     tags: [Filesystem]
 *     responses:
 *       200:
 *         description: Returns the agent system's filesystem information summary.
 */
router.get('/summary', function (req, res, next) {
    Promise.all([si.fsSize(), si.fsStats()]).then((messages) => {
        res.status(200);
        res.json({ "summary": { "fsSize": messages[0], "fsStats": messages[1] } });
    })
});

/**
 * @swagger
 * /fs/size:
 *   get:
 *     description: Agent system filesystem summary
 *     tags: [Filesystem]
 *     responses:
 *       200:
 *         description: Returns the agent system's filesystem size.
 */
router.get('/size', function (req, res, next) {
    si.fsSize().then(data => {
        res.status(200);
        res.json({ "fsSize": data });
    }).catch(error => {

    })
})

/**
 * @swagger
 * /fs/open_files:
 *   get:
 *     description: Agent system filesystem open files
 *     tags: [Filesystem]
 *     responses:
 *       200:
 *         description: Returns the files opened in the agent system's filesystem.
 */
router.get('/open_files', function (req, res, next) {
    si.fsOpenFiles().then(data => {
        res.status(200);
        res.json({ "fsOpenFiles": data });
    }).catch(error => {

    })
})

/**
 * @swagger
 * /fs/stats:
 *   get:
 *     description: Agent system filesystem stats
 *     tags: [Filesystem]
 *     responses:
 *       200:
 *         description: Returns the agent system's filesystem stats information.
 */
router.get('/stats', function (req, res, next) {
    si.fsStats().then(data => {
        res.status(200);
        res.json({ "fsStats": data });
    }).catch(error => {

    })
})

module.exports = router;