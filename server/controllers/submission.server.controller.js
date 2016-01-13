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

			var images = {}

			for(var i = 0 ; i < challenge.submissions.length ; i++){
				images[i.toString()] = challenge.submissions[i]['submission'];
			}

			res.send(images);

		});
};

exports.getSubmissionInfo = function(req, res) {
	challengeName = req.params.challengeName;
	userName = req.params.userName;

	Challenge.findOne({ challengeName: challengeName })
		.exec(function(err, challenge) {
			User.findOne({ userName: userName })
				.exec(function(err, user) {
					Submission.findOne({ challenge: challenge._id, user: user._id })
						.exec(function(err, submission) {

							// res.writeHead(200, {'Content-Type': 'image/jpeg'});
							// res.write(new Buffer(submission['submission'],"base64"));
							// res.end();

							if (err) {
		                        return res.sendStatus(500);
		                    }
		                    if (!submission) {
		                    	var errMsg = 'Sorry, submission does not exist ' + err;
                                console.log(errMsg);
		                        return res.sendStatus(500);
		                    } else {
								if(challengeName === 'selfieChallenge') {
									res.set('Content-Type', 'image/jpeg');
									res.send(new Buffer(submission['submission'],"base64"));
								}

								if(challengeName === 'shakeChallenge') {
									res.set('Content-Type', 'text/plain');
									res.send(submission['submission']);
								}
							}

						});
				});
		});
};

exports.listUserSubmissions = function(req, res) {
	userName = req.body.userName;

	User.findOne({ userName: userName })
		.populate( 'submissions' )
		.sort({ createdOn: 'desc' })
		.exec(function(err, user) {
			console.log("user submissions "+JSON.stringify(user.submissions));
			res.send({ submissions: user.submissions });
		});
};
