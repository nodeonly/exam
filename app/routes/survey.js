var express = require('express');
var router = express.Router();
var Handlebars = require('handlebars');
var uuid = require('node-uuid');
var BufferHelper = require('bufferhelper');

/* GET users listing. */
router.get('/', function(req, res) {
	res.render('survey/index', { title: '创建试卷' });
});

/* GET home page. */
router.get('/generate', function(req, res) { 
 
    var o = req.query.data
    var i = JSON.parse(o);
	console.log( i );
	
	 var fs = require('fs');
 	 
	 var ws = fs.createWriteStream('public/dataStream.json', { encoding: "utf8" })

	 ws.write(o); 
	 ws.end(); // 目前和destroy()和destroySoon()一样 
	 
	  
	 // Generate a v1 (time-based) id
	var pid = uuid.v1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'
	
	var rs = fs.createReadStream('public/template.html', {encoding: 'utf-8', bufferSize: 11});
	var bufferHelper = new BufferHelper();

	rs.on("data", function (trunk){
		bufferHelper.concat(trunk);
	});

	rs.on("end", function () {
		var source = bufferHelper.toBuffer().toString();
		var template = Handlebars.compile(source);

		console.log(source + i);

		var template = Handlebars.compile(source);
		var dddd = template(i);
				
		console.log('complied source = ' + pid);
	   var ws1 = fs.createWriteStream('public/html/'+pid+'.html', { encoding: "utf8" })

	   	ws1.write(dddd); 
	   	ws1.end(); 
		
		var open = require("open");
		open("http://127.0.0.1:4100/html/"+pid+".html");
	});
	//
	res.render('index', { title: 'Express' ,uuid:pid});
});

router.post('/', function(req, res) {
	var Survey = req.models.Survey;
	
	//   name: { type: String, required: true, index: { unique: true } },
	//   desc: { type: String, required: true },
	//   questions: { type: Number, required: true, default: 0 },
	//   all: { type: String },
	// create_at  :  { type: Date, default: Date.now }
	//
	var name = req.body.name;
	var desc = req.body.desc;
	var questions = req.body.questions;
	var all = req.body.all;
	
	var survey = Survey({ 
		name: name ,
		desc: desc,
		questions: questions,
		all: all
	});
	
	survey.save(function (err, sur) {
	  if (err) {
	  	 console.error(err);
			 return res.status(200).json({
			 	 data:{},
				 status:{
				 	 code : err.code,
					 msg  : err.name + ' : ' + err.err
				 }
			 }); 
	  }

		 res.status(200).json({
		 	 data:sur,
			 status:{
				 code: 0,
				 msg : 'success'
			 }
		 });
	});
	
});
 
module.exports = router;
