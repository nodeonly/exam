var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource2');
});

router.get('/register', function(req, res) {
  res.render('user/register', { title: '用户注册' });
});

router.get('/login', function(req, res) {
  res.render('user/login', { title: '用户登陆' });
});

router.post('/login', function(req, res) {
	var db = req.db;
	var model = req.model
	
	var user_name = req.tools.req.get_value_from_body(req,'name','no user name',1);
	var password = req.tools.req.get_value_from_body(req,'password','no password name',1);

	
	var _user = new model.UserModel({ 
		user_name		: user_name,
		password		: password,
	});
	
	
	_user.is_exist(function (err, user) {
	 
		console.log(err==null)
		if(err==null && user){
			console.log('ok');
			req.session.user = user;  
			
			res.status(200).json({
			  data:user,
			  status:{
				 code: 0,
				 msg : 'success'
			 }
		  });
		}else{
			res.status(200).json({
			  data:err,
			  status:{
				 code: 10000,
				 msg : '登陆失败错误，请确认用户名或密码'
			 }
		  });
			console.log('bu ok');
		}
	});
});


router.post('/new', function(req, res) {
  // res.render('user/register', { title: '用户注册' });
	var db = req.db;
	var model = req.model
	
	a=req.tools.req.get_value_from_body(req, 'display_name');
	console.log(a);
	
	var display_name = req.tools.req.get_value_from_body(req,'display_name','no display name',1);
	console.log('display_name='+display_name);
	var user_name = req.tools.req.get_value_from_body(req,'name','no user name',1);
	var password = req.tools.req.get_value_from_body(req,'password','no password name',1);
	var desc = req.tools.req.get_value_from_body(req,'password','no desc',1);
	
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
