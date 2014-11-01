var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource2');
});

router.get('/register', function(req, res) {
  res.render('user/register', { title: '用户注册' });
});

/**
  * Return request param value from req.body
  *
  * if given key not in req.body hash
  * default_val is returned:
  *
  *     var user_name = get_value_from_body(req,'name','no user name',1);
  *     var user_name = get_value_from_body(req,'name','no user name');
  *     var user_name = get_value_from_body(req,'name');
  *
  * @param {String} req
  * @param {String} key
  * @param {String} default_val
  * @param {String} debug
	*
  * @return {String}
  * @api public
  */
function get_value_from_body(req,key,default_val,debug){
	var is_debug_able = arguments[3] ? true :false;
	function log(str){
		if(is_debug_able){
			console.log('[INFO get_value_from_body]'+str);
		}
	}
	
	log('---------------------------------------------');
	log(key);
	
	var _default_val = arguments[2] ? default_val+'' : '';
	
	var display_name = ''
	if(req.body[key] !== undefined){
		log('req.body[' +key+'] '+' exist!');
		display_name = req.body[key] == undefined ? _default_val : req.body[key]
			log(req.body[key]);
	}else{
		log('req.body[' +key+''+'] not exist ');
		display_name = _default_val
	}
	
	log('display_name='+display_name);
	log('---------------------------------------------');
	return display_name;
}

router.post('/new', function(req, res) {
  // res.render('user/register', { title: '用户注册' });
	var db = req.db;
	var model = req.model
	
	var display_name = get_value_from_body(req,'display_name','no display name',1);
	console.log('display_name='+display_name);
	var user_name = get_value_from_body(req,'name','no user name',1);
	var password = get_value_from_body(req,'password','no password name',1);
	var desc = get_value_from_body(req,'password','no desc',1);
	
	var _user = new model.UserModel({ 
		display_name: display_name ,
		user_name		: user_name,
		password		: password,
		desc				: desc
	});
	
	// console.log(_user);
	
	_user.findByName(function (err, users) {
				console.log('users='+users) 
		console.log(err +'-'+users) 
		console.log(err==null)

		if (err==null && users.length == 0) {
			
			_user.save(function (err, user) {
			  if (err) {
					console.error(err);
		 		 res.status(200).json({
					 data:err,
		 			 status:{
		 				 code: 10000,
		 				 msg : '保存错误'
		 			 }
		 		 });
			  	return 
			  }

				 res.status(200).json({
				 	 data:user,
					 status:{
						 code: 0,
						 msg : 'success'
					 }
				 });
			});
		}else{
		  if (users) {
				console.error(users);
			
				res.status(200).json({
				 data:{},
				 status:{
					 code: 10001,
					 msg : '用户名已存在'
				 }
				});
		  	return 
		  }
		}
		
	
	});
	
	
	
	
	// res.json({
// 		data:req.body
// 	})
	
	// res.redirect('/index');
});


module.exports = router;
