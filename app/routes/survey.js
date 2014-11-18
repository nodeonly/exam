var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
	res.render('survey/index', { title: '创建试卷' });
});

router.get('/register', function(req, res) {
  res.render('user/register', { title: '用户注册' });
});

router.get('/login', function(req, res) {
  res.render('user/login', { title: '用户登陆' });
});
 
module.exports = router;
