// Packages
var express = require('express');
var rosterRouter = express.Router();

// Controllers
var teamCtrl = require('../controllers/team.server.controller');

var router = function() {

  rosterRouter.route('/roster')
  .get(function (req, res) {
  	teamCtrl.listUsers(req, res);
  });

  return rosterRouter;
};

module.exports = router;