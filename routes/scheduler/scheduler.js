var express = require('express');
const agentConfig = require('../../config/agentConfig');
const scheduler = require('../../scheduler/scheduler');
var router = express.Router();

router.get('/', function (req, res) {
  throw new Error('BROKEN') // Express will catch this on its own.
})

/**
 * @swagger
 * /scheduler/jobs:
 *   get:
 *     description: Agent system scheduler and job summary
 *     tags: [Scheduler]
 *     responses:
 *       200:
 *         description: Returns the list of scheduled jobs.
 */
router.get('/jobs', function (req, res, next) { });

/**
 * @swagger
 * /scheduler/jobs/{id}:
 *   get:
 *     description: Agent system scheduler job details
 *     tags: [Scheduler]
 *     responses:
 *       200:
 *         description: Returns the details of a partcular job given by id.
 */
router.get('/jobs/{id}', function (req, res, next) { });

/**
 * @swagger
 * /scheduler/jobs:
 *   post:
 *     description: create a scheduled job
 *     tags: [Scheduler]
 *     responses:
 *       200:
 *         description: Returns the scheduled job details if it was a success.
 */
router.post('/jobs', function (req, res, next) { });

/**
 * @swagger
 * /scheduler/jobs/{id}:
 *   delete:
 *     description: Delete a scehduled job
 *     tags: [Scheduler]
 *     responses:
 *       200:
 *         description: Returns success if the job was successfully removed.
 */
router.delete('/jobs/{id}', function (req, res, next) { });

/**
 * @swagger
 * /scheduler/jobs/{id}:
 *   put:
 *     description: Update a schedule job
 *     tags: [Scheduler]
 *     responses:
 *       200:
 *         description: Returns success if the job was updated and restarts the job.
 */
router.put('/jobs/{id}', function (req, res, next) { });

/**
 * @swagger
 * /scheduler/config:
 *   get:
 *     description: Agent system scheduler config
 *     tags: [Scheduler]
 *     responses:
 *       200:
 *         description: Returns the current config for the scheduler.
 */
router.get('/config', function (req, res, next) { });

/**
 * @swagger
 * /scheduler/config:
 *   put:
 *     description: Agent system scheduler config update
 *     tags: [Scheduler]
 *     responses:
 *       200:
 *         description: Returns success if the scheduler config was updated and restart the scheduler.
 */
router.put('/config', function (req, res, next) { });



module.exports = router;