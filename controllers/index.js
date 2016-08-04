var express = require('express');
var router = express.Router();

router.use('/users', require('./users'));
router.use('/healthcheck', require('./healthcheck'));
router.use('/locations', require('./location_controller'));
router.use('/migrations', require('./migration_controller'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
