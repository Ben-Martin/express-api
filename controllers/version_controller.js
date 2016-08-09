var express = require('express'),
    router = express.Router(),
    version = require('../models/Version'),
    moment =require('moment');

// Get all locations
router.get('/', function(req, res, next) {

    version.getVersion(function(err, data, status) {

        res.status(status);
        res.json(err || data);

    });

});

router.post('/', function(req, res, next) {

    version.setVersion(req.body.version, function(err, data, status) {

        res.status(status);
        res.json(err || data);

    });

    // make this error a generic thing!
    // if (!req.body.version) {
    //     res.json({ 
    //         error: "missing parameter: version"
    //     });
    // }
    // else {
    //     version.setVersion(req.body.version, function onComplete(data) {
    //         res.json({ 
    //             version: data.version,
    //             datetime: moment(data.datetime).format('L')
    //         });
    //     });
    // }
   
});

module.exports = router;