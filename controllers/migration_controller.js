var express = require('express'),
    router = express.Router(),
    migration = require('../models/Migration.js');

// Create version table
router.get('/version', function(req, res, next) {

    migration.createVersionTable(function(err, data, status) {
        res.status(status);
        res.json( err || data);

    });

});

// Create locations table
router.get('/locations', function(req, res, next) {

    migration.createLocationsTable(function(err, data, status) {
        res.status(status);
        res.json( err || data);

    });

});

module.exports = router;