// Packages
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

// Create Express instance
var app = express();

var port = 8000;

// Routers
var authRouter = require('./server/routes/authRoutes')();

// Middlewares
app.use(express.static(__dirname + '/public/mobile/www'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'devHouse'}));

// Run Passport
require('./server/config/passport')(app);

// Routes
app.use('/Auth', authRouter);

app.listen(port, function(err) {
  console.log('running server on port over ' + port + "!!!!");
});