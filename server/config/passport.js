var passport = require('passport');

module.exports = function (app) {
  
  app.use(passport.initialize());
  app.use(passport.session());

  // Serialized and deserialized methods when got from session
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  // Strategies 
  require('./strategies/local.strategy')();

};