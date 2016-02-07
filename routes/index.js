var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Track Your Heartrate', mood: "sad", message: "Your overall emotion was: SAD. Check out this recommendation." });
});

module.exports = router;
