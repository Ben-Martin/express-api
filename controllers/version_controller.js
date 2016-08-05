var express = require('express'),
    router = express.Router(),
    version = require('../models/version.js'),
    bodyParser = require('body-parser'),
    cfg = require('../config'),
    moment =require('moment');

// Get all locations
router.get('/', function(req, res, next) {
    
    res.json({ 
        api_version: version.version,
        build: 'test'
    });

});

router.post('/', function(req, res, next) {

    version.setVersion(req.body.version, onComplete);

    function onComplete(data) {
        res.json({ 
            version: data.version,
            date: moment(data.date).format('L')
        });
    } 
   
});

module.exports = router;