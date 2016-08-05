var express = require('express'),
    router = express.Router(),
    migration = require('../models/migration.js'),
    bodyParser = require('body-parser'),
    cfg = require('../config');

// Get all locations
router.get('/', function(req, res, next) {

    migration.createVersionTable(onComplete);
    
    function onComplete(data) {
        res.json({
            versiontable: data
        });
    }

});

module.exports = router;