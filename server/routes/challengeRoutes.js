// Packages
var express = require('express');
var challengeRouter = express.Router();

// Controllers
var challengeCtrl = require('../controllers/challenge.server.controller');
var submissionCtrl = require('../controllers/submission.server.controller');

var router = function() {

  challengeRouter.route('/createChallenge')
  .post(function (req, res) {
  	challengeCtrl.createChallenge(req, res);
  });

  challengeRouter.route('/completeChallenge')
  .post(function (req, res) {
    challengeCtrl.completeChallenge(req, res);
  });

  challengeRouter.route('listChallengeSubmissions')
  .post(function (req,res) {
  	submissionCtrl.listChallengeSubmissions(req, res);
  });

  challengeRouter.route('listUserSubmissions')
  .post(function (req,res) {
  	submissionCtrl.listUserSubmissions(req, res);
  });

  return challengeRouter;
};

module.exports = router;