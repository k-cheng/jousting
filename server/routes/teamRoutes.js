// Packages
var express = require('express');
var teamRouter = express.Router();
var jwt = require('jwt-simple');

// Controllers
var userCtrl = require('../controllers/user.server.controller');
var teamCtrl = require('../controllers/team.server.controller');

var router = function() {

  teamRouter.route('/gauntlet')
  .get(function(req, res) {
    authenticate(req, res);
  });

  teamRouter.route('/createTeam')
  .post(function (req, res) {
  	console.log(req.body);
  	teamCtrl.createTeam(req, res);
  });

  teamRouter.route('/joinTeam')
  .post(function (req, res) {
  	console.log(req.body);
  	userCtrl.joinTeam(req, res);
  });

  teamRouter.route('/listAllTeams')
  .get(function (req, res) {
    console.log(req.body);
    teamCtrl.listAllTeams(req, res);
  });

  return teamRouter;
};

function authenticate(req, res) {
  if (!req.headers.authorization) {
    return res.status(401).send({
      message: 'You are not authorized'
    });
  }
  var token = req.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, "shhh..");
  
  if (!payload.sub) {
    res.status(401).send({
      message: 'Authentication failed'
    });
  }
}

module.exports = router;