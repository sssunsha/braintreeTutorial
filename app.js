var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var formRouter = require('./routes/form');
var usersRouter = require('./routes/users');
var e2eTestRouter = require('./routes/e2e_test');
var clientTokenRouter = require('./routes/client_token');
var checkout = require('./routes/checkout');
var app = express();

// global controller
app.get('/form',function(req,res,next){
  res.header('X-Frame-Options' , 'SAMEORIGIN' );
  next(); // http://expressjs.com/guide.html#passing-route control
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/form', formRouter);
app.use('/users', usersRouter);
app.use('/e2e', e2eTestRouter);
app.use('/client-token', clientTokenRouter);
// The checkout route
app.use('/submit', checkout);

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
