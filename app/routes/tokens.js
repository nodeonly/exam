var express = require('express');
var router = express.Router();

/* GET token create. */
router.get('/create', function(req, res) {
	var model = req.model
	
	
	var app = req.params.app;
	var version = req.params.version;
	var os = req.params.os;
	var token = req.params.token;
	
	
	var fluffy = new model.TokenModel({ 
		app: app ,
		version: version,
		os: os,
		token: token
	});
	
	fluffy.save(function (err, fluffy) {
	  if (err) return console.error(err);

		 res.status(200).json({
		 	 data:fluffy,
			 status:{
				 code: 0,
				 msg : 'success'
			 }
		 });
	});
});

router.get('/', function(req, res) {
	var model = req.model
	
	// Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec(callback);
	model.TokenModel.find().exec(function(err,docs){
		if (err) return console.error(err);
		
		res.status(200).json({
		  count:docs.length,
		  data:docs,
		  status:{
			  code: 0,
			  msg : 'success'
		  }
		});	
	});  
});

module.exports = router;
