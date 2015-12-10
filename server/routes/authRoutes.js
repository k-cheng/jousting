// Packages
var express = require('express');
var authRouter = express.Router();
var moogoose = require('mongoose');
var passport = require('passport');

var router = function() {

  authRouter.route('/register')
  .post(function (req, res) {
    console.log(req.body);
    // To Jeffy: Implement Moongose Below:
    //=================================================
    var url = 'mongodb://localhost:27017/joustingApp'; 
    mongodb.connect(url, function (err, db) {
      var collection = db.collection('users');
      var user = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      };

      collection.insert(user, function(err, results) {
        req.login(results.ops[0], function() {
    //=================================================
          res.redirect('/home');
        });
      });
    });
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