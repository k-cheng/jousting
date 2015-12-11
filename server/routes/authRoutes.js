// Packages
var express = require('express');
var authRouter = express.Router();
var passport = require('passport');

// Controllers
var userCtrl = require('../controllers/user.server.controller');
var teamCtrl = require('../controllers/team.server.controller');

var router = function() {

  authRouter.route('/register')
  .post(function (req, res) {
    console.log(req.body);
    userCtrl.createUser(req, res);
  });

  authRouter.route('/login')
  .post(passport.authenticate('local', {
    failureRedirect: '/'
  }), 
  function (req, res) {
    res.send(req.user);
  });

  authRouter.route('/loggedin')
  .get(function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  authRouter.route('/logout')
  .post(function (req, res){
    req.logOut();
    res.send(200);
  });
  
  return authRouter;
};

module.exports = router;