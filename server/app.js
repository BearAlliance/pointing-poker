var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Only when using SSL
app.get('*', function(req, res, next) {
  if (req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production') {
    res.redirect(301, `https://${req.hostname}${req.url}`);
  } else {
    /* Continue to other routes if we're not redirecting */
    next();
  }
});

app.use('/', express.static(path.join(__dirname, '..', 'build')));
app.use('/static', express.static(path.join(__dirname, '..', 'build')));
app.use('/static/*', express.static(path.join(__dirname, '..', 'build')));

app.use('/api/', indexRouter);

module.exports = app;
