// Packages
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var busboyBodyParser = require('busboy-body-parser');
var User = require('./server/models/user.server.model.js');
var jwt = require('jwt-simple');
var moment = require('moment');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jousting_db');

// Create Express instance
var app = express();

var port = process.env.port || 8000;

// Middlewares
app.use(express.static(__dirname + '/public/mobile/www'));
app.use(bodyParser.json());
app.use(busboyBodyParser());

// Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

app.post('/auth/register', function(req, res) {

  var user = req.body;

  var newUser = new User({
    fullName: user.fullName,
    userName: user.userName,
    email: user.email,
    password: user.password
  });

  newUser.save(function(err) {
    createSendToken(newUser, res);
  });
});

app.post('/auth/login', function(req, res) {
  req.user = req.body;
  console.log('login', req.body);

  var searchUser = {
    email: req.user.email
  };

  User.findOne(searchUser, function(err, user) {
    if(err) {
      throw err;
    }

    if(!user) {
      //return is used to stop the rest from executing
      return res.status(401).send({message: 'Wrong email/password'}); //401 is unauthorized
    }

    user.comparePasswords(req.user.password, function(err, isMatch) {
      if(err) {
        throw err;
      }
      console.log(isMatch);
      if(!isMatch) {
        return res.status(401).send({message: 'Wrong email/password'});
      }
      createSendToken(user, res);
    });
  });
});

app.get('/gauntlet', function(req, res) {

  var token = req.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, "shhh..");

  if (!payload.sub) {
    res.status(401).send({
      message: 'Authentication failed'
    });
  }
  if (!req.headers.authorization) {
    return res.status(401).send({
      message: 'You are not authorized'
    });
  }
   console.log('cory', payload);
  res.redirect('http://www.google.com');

});


function createSendToken(user, res) {
//create a new JWT system to create a payload with our user and send it instead of the JSON user. So let's create the payload
  var payload = { 
    //supply subject, which is the user
    sub: user.id,
    exp: moment().add(10, 'days').unix()
  };

  var token = jwt.encode(payload, 'shhh..');

  res.status(200).send({
    user: user.toJSON(),
    token: token
  });
}

// Routers
var teamRouter = require('./server/routes/teamRoutes')();
var rosterRouter = require('./server/routes/rosterRoutes')();
var challengeRouter = require('./server/routes/challengeRoutes')();
app.use('/', teamRouter, rosterRouter, challengeRouter);

app.listen(port, function (err) {
  console.log('running server on port over ' + port + "!!!!");
});