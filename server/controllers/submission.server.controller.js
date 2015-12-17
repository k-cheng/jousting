var User = require('../models/user.server.model.js');
var Team = require('../models/team.server.model.js');
var Challenge = require('../models/challenge.server.model.js');
var Submission = require('../models/submission.server.model.js');

exports.listChallengeSubmissions = function(req, res) {
	challengeName = req.body.challengeName;

	Challenge.findOne({ challengeName: challengeName })
		.populate( 'submissions' )
		.sort({ createdOn: 'desc' })
		.exec(function(err, challenge) {
			console.log("challenge submissions "+JSON.stringify(challenge.submissions));
			res.send({ submissions: challenge.submissions });
		});
};

exports.getSubmissionInfo = function(req, res) {
	challengeName = req.body.challengeName;
	userName = req.body.userName;

	Challenge.findOne({ challengeName: challengeName })
		.exec(function(err, challenge) {
			User.findOne({ userName: userName })
				.exec(function(err, user) {
					Submission.findOne({ challenge: challenge._id, user: user._id })
						.exec(function(err, submission) {
							console.log("submission "+JSON.stringify(submission));
							res.send({ submission: submission });
						});
				});
		});
};
