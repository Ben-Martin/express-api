var express = require('express'),
    router = express.Router();

    router.get('/', function(req, res, next) {
    
    // make this error a generic thing!
    if (!req.query.startDate || !req.query.endDate) {
        console.log('hello');
        next();
    }

});