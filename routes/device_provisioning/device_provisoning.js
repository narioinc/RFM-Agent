var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    throw new Error('BROKEN') // Express will catch this on its own.
})

router.post('/',  function (req, res, next) {
    console.log("got a request to provision");
    var deviceId = req.body.deviceId;
    var deviceName = req.body.deviceName;
    var requestTime =  req.body.requestTime;
    //TODO
    //update these details in sqlite   
    res.status(200);
    res.json({"status": "device provisioned successfully"});
});

router.post('/reset', function(req, res, next){
    //TODO
    //need to reset the provisionign data in sqlite and set as a fresh device
})

module.exports = router;