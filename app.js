// Packages
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

// Create Express instance
var app = express();

var port = process.env.port || 8000;

// Middlewares
app.use(express.static(__dirname + '/public/mobile/www'));
// app.use(express.static(__dirname + '/public/mobile/scss'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'devHouse'}));
app.use(passport.initialize());
app.use(passport.session());

// Run Passport
require('./server/config/passport')(app);

// Routers
var authRouter = require('./server/routes/authRoutes')();

// Routes
app.use('/', authRouter);

app.listen(port, function (err) {
  console.log('running server on port over ' + port + "!!!!");
});