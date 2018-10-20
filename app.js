//env values
require('dotenv').config();

const express = require('express');
const platform = require('./routes/platform');
const app = express();

/*********** Routes ****************/
app.use('/', platform);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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


module.exports = app;
