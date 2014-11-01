var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var session = require('express-session');
var RedisStore = require('connect-redis')(session);


// mongoose config
var mongoose = require('mongoose')  
  , connectionString = 'mongodb://localhost:27017/exam_weixin'
  , options = {};
	
options = {  
  server: {
    auto_reconnect: true,
    poolSize: 10
  }
};
	
mongoose.connect(connectionString, options, function(err, res) {  
  if(err) {
    console.log('[mongoose log] Error connecting to: ' + connectionString + '. ' + err);
  } else {
    console.log('[mongoose log] Successfully connected to: ' + connectionString);
  }
});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose connection error:'));
db.once('open', function callback () {
  // yay!
	console.log('mongoose open success');
});


var app = express();

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = mongoose;
		req.model = require('./db/models');
		req.tools = require('./utils');
    next();
});


app.use(session({
  store: new RedisStore({
    host: "127.0.0.1",
    port: 6379
  }),
  resave:false,
  saveUninitialized:false,
  secret: 'exam node only'
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var tokens = require('./routes/tokens');

app.use('/', routes);
app.use('/users', users);
app.use('/tokens', tokens);

app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('oh no sesssion')) // handle error
  }
  next() // otherwise continue
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
