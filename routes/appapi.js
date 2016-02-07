var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'app api' });
	var obj={};
	obj.success = true;
	obj.message="success";
 	return  res.json(200, {data:obj});
});

module.exports = router;