var express = require('express'),
    router = express.Router(),
    migration = require('../models/migration.js'),
    bodyParser = require('body-parser'),
    cfg = require('../config');

// Get all locations
router.get('/', function(req, res, next) {
    
    res.json({ 
        message: migration.createLocationsTable()
    });

});

module.exports = router;