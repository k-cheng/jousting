// Packages
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var busboyBodyParser = require('busboy-body-parser');

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
app.use(busboyBodyParser());
app.use(session({secret: 'devHouse'}));

// Run Passport
require('./server/config/passport')(app);

// Routers
var authRouter = require('./server/routes/authRoutes')();
var teamRouter = require('./server/routes/teamRoutes')();
var rosterRouter = require('./server/routes/rosterRoutes')();
var challengeRouter = require('./server/routes/challengeRoutes')();
// Routes
app.use('/', authRouter, teamRouter, rosterRouter, challengeRouter);

app.listen(port, function (err) {
  console.log('running server on port over ' + port + "!!!!");
});