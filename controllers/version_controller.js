var express = require('express'),
    router = express.Router(),
    version = require('../models/version.js'),
    bodyParser = require('body-parser'),
    cfg = require('../config'),
    moment =require('moment');

// Get all locations
router.get('/', function(req, res, next) {

    version.getVersion(function(data) {
        // this data needs to be formatted correctly
        if (!data) {
            res.json({
                error: 'something went bad'
            });   
        }
        else {
            res.json({
                data: data
            });
        }
    });

});

router.post('/', function(req, res, next) {

    // make this error a generic thing!
    if (!req.body.version) {
        res.json({ 
            error: "missing parameter: version"
        });
    }
    else {
        version.setVersion(req.body.version, function onComplete(data) {
            res.json({ 
                version: data.version,
                datetime: moment(data.datetime).format('L')
            });
        });
    }
    

    
   
});

module.exports = router;