var express = require('express'),
    router = express.Router(),
    migration = require('../models/Migration.js'),
    bodyParser = require('body-parser'),
    cfg = require('../config');

// Create version table
router.get('/version', function(req, res, next) {

    migration.createVersionTable(function(data) {
        res.json({
            versiontable: data
        });
    });

});

// Create locations table
router.get('/locations', function(req, res, next) {

    migration.createLocationsTable(function(data) {
        res.json({
            versiontable: data
        });
    });

});

module.exports = router;