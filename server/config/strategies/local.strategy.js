var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

module.exports = function () {
  passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password'
  },
  function (username, password, done) {
  // To Jeffy: Implement Moongose Below:
  //======================================================================
    // var url;
    // mongoose.connect(url, function(err, db) {
    //   var collection = db.collection('users');
    //   collection.findOne({username: username}, function(err, results) {
        if (username === "admin" && password === "admin") {
          return done(null, {name: "admin"});
        }

        return done(null, false, { message: 'Incorrect username.' });
      }));
  //   });
  // }));
  //======================================================================

};