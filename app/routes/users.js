var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource2');
});

router.get('/register', function(req, res) {
  res.render('user/register', { title: '用户注册' });
});


router.post('/new', function(req, res) {
  // res.render('user/register', { title: '用户注册' });
	res.json({
		data:req.body
	})
	
	res.redirect('/index');
});


module.exports = router;
