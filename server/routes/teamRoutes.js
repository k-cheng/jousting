// Packages
var express = require('express');
var teamRouter = express.Router();
var passport = require('passport');

// Controllers
var teamCtrl = require('../controllers/team.server.controller');

var router = function() {

  teamRouter.route('/createTeam')
  .post(function (req, res) {

    //To Jeff: implement query
  
  });

  return teamRouter;
};

module.exports = router;