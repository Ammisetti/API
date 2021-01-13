var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require("cookie-session");
const url = 'mongodb://localhost:27017/todo';
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

connect.then((db)=> {
  console.log('Connected correctly to the server');
}, (err)=> {console.log(err)});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  // milliseconds of a day
  name: "todo-session",
  maxAge: 24*60*60*1000,
  keys:['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());
require('./authenticate');
var indexRouter = require('./routes/index');
app.use('/', indexRouter);
var user;
app.get('/signup', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/login', (req, res)=> {res.send("You failed to login!");})
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  user = req.user;
  //console.log('req.user.id : ', req.user);
  // Successful authentication, redirect home.
  res.redirect('/dashboard');
});
function auth(req, res, next) {
  //console.log('req.user.id : ', req);
  if(user) {
    next();
  } else {
    res.redirect('/');
  }
}
app.use(auth);
var addRouter = require('./routes/addtoDo');
var updateRouter = require('./routes/update');
var doneRouter = require('./routes/completedTasks');
var undoneRouter = require('./routes/uncompletedTasks');
var dashRouter = require('./routes/dahsboard');


app.use('/addtoDo', addRouter);
app.use('/update', updateRouter);
app.use('/done', doneRouter);
app.use('/undone', undoneRouter);
app.use('/dashboard',dashRouter);

app.get('/logout', (req, res)=> {
  req.session = null;
  req.logout();
  mongoose.disconnect();
  res.redirect('/');
});

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