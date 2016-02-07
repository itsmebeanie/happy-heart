var express = require('express');
var router = express.Router();

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://happyheart:brown2016@ds058548.mongolab.com:58548/happyheart";

/* GET data. */
router.get('/', function(req, res, next) {
	//Select the data based on the request
	var emotionType = req.emotionType;

	//Send data file down
	var obj={};

	switch(emotionType){
		case "1":
			obj.tsvData = "file 1!";
			break;
		case "2":
			obj.tsvData = "file 2!";
			break;
		case "3":
			obj.tsvData = "file 3!";
			break;
		case "4":
			obj.tsvData = "file 4!";
			break;
		case "5":
			obj.tsvData = "file 5!";
			break;
	}

	obj.tsvData = emotionType + " ";
	obj.success = true;
	obj.message = "success (get)";
 	return  res.json(200, {data:obj});
});



router.post('/', function(req, res, next) {
	//Select the data based on the request
	var emotionType = req.body.emotionType;

	//Send data file down
	var obj={};
	obj.tsvData = "nothing to see here!";
	obj.success = true;
	obj.message = "Post Successful!";

	//Poll the database
	console.log("querying database..................................................");

	MongoClient.connect(url, function(err, db) {
		console.log(err);
		// console.log(db);
		var collection = db.collection('demodata');

		collection.findOne({"emotionType":emotionType},function(err,result){
			db.close();
			console.log(result);
			obj.tsvData = result.tsvData;
			console.log(obj);
			
			console.log("Query Complete..................................................");
		 	return  res.json(200, {data:obj});
		});
		
	});

});




router.post('/:user', function(req, res, next) {
	//Select the data based on the request
	var emotionType = req.body.emotionType;

	//Send data file down
	var obj={};
	obj.tsvData = "nothing to see here!";
	obj.success = true;
	obj.message = "Post Successful!";

	//Poll the database
	console.log("Posting to database..................................................");

	MongoClient.connect(url, function(err, db) {
		console.log(err);
		// console.log(db);
		var collection = db.collection('users');
		collection.

		db.collection.update(
		   { user:"Jessica" },
		   	$push: {"heartrates":[("date":"24-Apr-07-08-00", "heartrate":"70"),
		   						("date":"24-Apr-07-08-00", "heartrate":"70"),
		   						("date":"24-Apr-07-08-00", "heartrate":"70"),
		   						("date":"24-Apr-07-08-00", "heartrate":"70"),
		   						("date":"24-Apr-07-08-00", "heartrate":"70")]},
		   { upsert: true }
		);
			
		console.log("Query Complete..................................................");
		return  res.json(200, {data:obj});
	});
		
});

});


module.exports = router;