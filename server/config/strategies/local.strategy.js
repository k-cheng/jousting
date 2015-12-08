var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb');

module.exports = function () {

  passport.use(new LocalStrategy({
    nameField: 'name',
    usernameField: 'userName',
    passwordField: 'password',
    emailField: 'email' 
  },
  function (name, username, password, email, done) {
    var url = 'mongodb://localhost:27017/joustingApp'; 
    mongodb.connect(url, function (err, db) {
      var collection = db.collection('users');
      collection.findOne({username: username}, function (err, results) {
        if (results.password === password) {
          var user = results;
          done(null, user);
        } else {
          done(null, false, {message: 'Bad Password'});
        }
      });
    });
  }));

};