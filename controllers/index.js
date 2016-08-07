var express = require('express'),
    router = express.Router();

router.use('/locations', require('./location_controller'));
router.use('/migrations', require('./migration_controller'));
router.use('/version', require('./version_controller'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
