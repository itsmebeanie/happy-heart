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

	switch(emotionType){
		case "calm":
			obj.tsvData = "date	close	comment	color\n24-Apr-07-08-00	20	'HIII'	#f00\n24-Apr-07-09-00	40	'this is data'	blue\n24-Apr-07-09-30	88.84	'i hate d3'	green";
			break;
		case "angry":
			obj.tsvData = "file angry!";
			break;
		case "happy":
			obj.tsvData = "file happy!";
			break;
		case "sad":
			obj.tsvData = "file sad!";
			break;
		case "anxious":
			obj.tsvData = "file anxious!";
			break;
	}

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





router.post('/postDemoData', function(req, res, next) {
	//Select the data based on the request
	var emotionType = req.body.emotionType;

	//Send data file down
	var obj={};

	switch(emotionType){
		case "calm":
			obj.tsvData = "date	close	comment	color\n24-Apr-07-08-00	20	'hello'	#f00\n24-Apr-07-09-00	40	'this is data'	blue\n24-Apr-07-09-30	88.84	'i hate d3'	green";
			break;
		case "angry":
			obj.tsvData = "file angry!";
			break;
		case "happy":
			obj.tsvData = "file happy!";
			break;
		case "sad":
			obj.tsvData = "file sad!";
			break;
		case "anxious":
			obj.tsvData = "file anxious!";
			break;
	}

	obj.success = true;
	obj.message = "Post Successful!";


	MongoClient.connect(url, function(err, db) {
		console.log(err);
		console.log(db);
		var collection = db.collection('users');
		var useremail = "test";

		collection.insert({useremail:useremail});
			// ,function(err,result){
		// 	db.close();
		// 	res.render('index', { title: 'Unsubscribe Successful'});
		// })
	});

 	return  res.json(200, {data:obj});
});


module.exports = router;