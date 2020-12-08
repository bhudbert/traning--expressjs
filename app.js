// Require des modules natifs
var express = require('express');
var logger = require('morgan');
var path = require('path');

// Require spécifique
var cookieParser = require('cookie-parser');
var createError = require('http-errors');

// Require des Routers
var indexRouter = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middleware pour tous les path

app.use(logger('short'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//middleware pour  les path specifiques


app.use(indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  res.render('error');
});

module.exports = app;

