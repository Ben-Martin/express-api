var express = require('express'),
    router = express.Router(),
    user_model = require('../models/user_model'),
    bodyParser = require('body-parser'),
    cfg = require('../config');


/* GET users */
router.get('/', function(req, res, next) {
    
    res.json({ 
        message: 'a get request',
        endpoint: cfg.endpoint
    });

});

/* POST users */
router.post('/', function(req, res, next) {

    res.send('Post request');

});

/* PUT users */
router.put('/', function(req, res, next) {

    res.send('Put request');

});

/**
 * Get a specified user based on an id
 */
router.route('/:user_id')
    .get(function(req, res) {

        res.json({ 
            message: 'you request user : ' + req.params.user_id
        });

    })
    .post(function (req, res) {
        res.json({
            // call function here
            message: 'this is where I would add the following user into the db : ' + req.params.user_id
        });
    });




module.exports = router;
