var express = require('express'),
    router = express.Router(),
    location = require('../models/location.js'),
    bodyParser = require('body-parser'),
    cfg = require('../config');

// Get locations based on date range
router.get('/', function(req, res, next) {
    
    // make this error a generic thing!
    if (!req.query.startDate || !req.query.endDate) {
        res.json({ 
            error: "missing parameter: startDate and endDate must be provided."
        });
    }
    else {
        location.getLocations(req.query.user_guid, req.query.startDate, req.query.endDate, onComplete);
    }

    function onComplete(data) { // When the code completes, do this
       res.json({ 
            message: data
        });
    }

});



// Post a new location
router.post('/', function(req, res, next) {

    var locationObj = new location.location (
        req.body.longitude,
        req.body.latitude,
        req.body.speed,
        req.body.course,
        req.body.altitude,
        req.body.timestamp,
        req.body.true_heading,
        req.body.magnetic_heading,
        req.body.heading_accuracy
    );

    var user = new location.user ( 
        req.query.user_guid
    );

    location.saveLocations(user, locationObj);

    res.json({ 
        user: user,
        myloc: locationObj
    });

});

module.exports = router;