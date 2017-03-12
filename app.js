//env values
require('dotenv').config();

var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');

// var index = require('./routes/index');
var platform = require('./routes/platform');
// var reminder = require('./routes/reminder');

// var scheduler = require('./scheduler');

var app = express();

//setting up static path for public folder
// app.use('/static', express.static(__dirname + "/public"));

// view engine setup
// app.set('views', path.join(__dirname, '/views'));
// app.set('view engine', 'json');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(exp ress.static(path.join(__dirname, 'public')));


/*********** Routes ****************/
//home route
// app.use('/', index);
// match route
app.use('/', platform);
// reminder route
// app.use('/', reminder);



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
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.status('error')
       .json({
        message: err.message,
        error: err,
      });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.status('error')
     .json({
      message: err.message,
      error: err,
    });
});

// scheduler.start();

module.exports = app;
