// Packages
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jousting_db');

// Create Express instance
var app = express();

var port = process.env.port || 8000;

// Middlewares
app.use(express.static(__dirname + '/public/mobile/www'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'devHouse'}));

// Run Passport
require('./server/config/passport')(app);

// Routers
var authRouter = require('./server/routes/authRoutes')();
var teamRouter = require('./server/routes/teamRoutes')();

// Routes
app.use('/', authRouter, teamRouter);

app.listen(port, function (err) {
  console.log('running server on port over ' + port + "!!!!");
});