var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var obj={};
	obj.success = true;
	obj.message="success";
  res.json(obj)
});

module.exports = router;
