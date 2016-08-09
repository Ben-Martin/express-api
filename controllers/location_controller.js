var express = require('express'),
    router = express.Router(),
    location = require('../models/Location.js'),
    userModel = require('../models/User');

// Get locations based on date range
router.get('/', function(req, res, next) {

    var user = userModel.user('abc123'); // temp setting of user_guid for now until auth is implemented

    location.getLocations(user, req.query.startDate, req.query.endDate, function(err, data, status) {
        res.status(status);
        res.json(err || data);

    });

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