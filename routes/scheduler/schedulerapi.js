var express = require('express');
const scheduler = require('./scheduler');
var router = express.Router();

router.get('/', function (req, res) {
    throw new Error('BROKEN') // Express will catch this on its own.
  })

router.get('/jobs', function (req, res, next){});
router.get('/jobs/{id}', function (req, res, next){});
router.post('/jobs', function (req, res, next){});
router.delete('/jobs/{id}', function (req, res, next){});
router.update('/jobs/{id}', function (req, res, next){});

module.exports = router;