var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// User Model
var User = require('../../models/user.server.model.js');
//possibly refactor to use userCtrl later - may need verifyUser method
//var userCtrl = require('../../controllers/user.server.controller');

module.exports = function () {

  passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password',
  },
  function(username, password, done) {
    User.findOne({ userName: username })
      .exec(function(err, user) {
        if (user===null) {
          console.log("User profile does not exist.");
          return done(null, false, { message: 'Incorrect username.' });
        } else if (err) {
          var errMsg = 'Sorry, there was an error locating your user profile ' + err;
              console.log(errMsg);
        } else if (user.password === password) {
          console.log("login success!");
          return done(null, {name: user.userName});
        }
      });
    }
  ));
};