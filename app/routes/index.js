var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
 
	if (req.session.user) {
      res.render('index', { title: 'Express' });
  } else {
      res.redirect('/login.html');
  }
	
});

router.post('/login.do',function(req,res){
			
	if(req.body.name == 'sang' && '000000' == req.body.password){
		console.log(1111)
		var _user = {
			'name':req.body.name,
			password:req.body.password
		}
    req.session.user = _user;  
    res.status(200).json({
    	data:_user,
			status:{
				code : 0,
				msg  : 'success!'
			}
    });
	}
})  


router.get('/logout.do',function(req,res){
	req.session.user = undefined;	
	res.redirect('/')
})  


module.exports = router;
