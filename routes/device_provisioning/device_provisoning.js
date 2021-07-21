var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    throw new Error('BROKEN') // Express will catch this on its own.
})

/**
 * @swagger
 * /device_provisioning:
 *   get:
 *     description: Agent system device provisoning
 *     tags: [Device Provisioning]
 *     responses:
 *       200:
 *         description: Returns the provisioned status if it was a success.
 */
router.post('/',  function (req, res, next) {
    RFMLogger.info("Got a request to provision this device with deviceId : " + req.body.deviceId);
    var deviceId = req.body.deviceId;
    var deviceName = req.body.deviceName;
    var requestTime =  req.body.requestTime;
    //TODO
    //update these details in sqlite   
    res.status(200);
    res.json({"status": "device provisioned successfully"});
});

/**
 * @swagger
 * /device_provisioning/reset:
 *   get:
 *     description: Agent system device provisoning reset
 *     tags: [Device Provisioning]
 *     responses:
 *       200:
 *         description: Returns the provisioning reset status if it was a success.
 */
router.post('/reset', function(req, res, next){
    //TODO
    //need to reset the provisionign data in sqlite and set as a fresh device
})

module.exports = router;