// Packages
var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function() {

  authRouter.route('/register')
    .post(function (req, res) {
      console.log(req.body);
      var url = 'mongodb://localhost:27017/joustingApp'; 
      mongodb.connect(url, function (err, db) {
        var collection = db.collection('users');
        var user = {
          name: req.body.name,
          username: req.body.userName,
          password: req.body.password,
          email: req.body.email
        };

        collection.insert(user, function(err, results) {
          req.login(results.ops[0], function() {
            res.redirect('/auth/home');
          });
        });
      });
  });

  authRouter.route('/login')
    .post(passport.authenticate('local', {
      failureRedirect: '/'
    }), 
    function (req, res) {
      res.redirect('/auth/home');
    });

  authRouter.route('/home')
    .all(function (req, res, next) {
      if(!req.user) {
        res.redirect('/');
      }
      next();
    })
    .get(function (req, res) {
      res.json(req.user);
    });

    return authRouter;
};

module.exports = router;