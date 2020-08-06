var express         = require('express');
var router          = express.Router();
let indexController = require('../Controllers/indexController');

/* GET home page. */
router.get('/', indexController.index);

module.exports = router;
