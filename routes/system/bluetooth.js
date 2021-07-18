var express = require('express');
var router = express.Router();
const si = require('systeminformation');

router.get('/', function (req, res) {
    throw new Error('BROKEN') // Express will catch this on its own.
  })

router.get('/summary', function(req, res, next) {
    si.bluetoothDevices().then(data => {
        res.status(200);
        res.json({"bluetoothDevices": data});
    }).catch(error =>{

    })
});

module.exports = router;
