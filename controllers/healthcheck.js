var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    cfg = require('../config');

/* GET ok message */
router.get('/', function(req, res, next) {
    
    res.json({ 
        message: 'ok'
    });

});

module.exports = router;