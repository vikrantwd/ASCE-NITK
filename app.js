require('./db/db');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var less = require('less-middleware');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/admin');
var gallery = require('./routes/gallery');
var members = require('./routes/members');
var events = require('./routes/events');
var collaborate = require('./routes/collaborate');
var opportunities = require('./routes/opportunities');
var api_gal = require('./routes/api.gallery');
var api_events = require('./routes/api.events');
var api_mem = require('./routes/api.members');
var api_main = require('./routes/api.mainpage');
var api_rec = require('./routes/api.recentposts');
var api_cal = require('./routes/api.calender');
var api_auth = require('./routes/api.auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(less('/less', {
  once: true,
  pathRoot: path.join(__dirname, 'public')
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use('/', routes);
app.use('/admin-login', users);
app.use('/gallery', gallery);
app.use('/members',members);
app.use('/events',events);
app.use('/opportunities',opportunities);
app.use('/collaborate',collaborate);
app.use('/api/gallery',api_gal);
app.use('/api/members',api_mem);
app.use('/api/events',api_events);
app.use('/api/mainpage',api_main);
app.use('/api/recentposts',api_rec);
app.use('/api/calender',api_cal);
app.use('/api/auth',api_auth);

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
