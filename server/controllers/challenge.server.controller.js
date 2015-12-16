var User = require('../models/user.server.model.js');
var Team = require('../models/team.server.model.js');
var Challenge = require('../models/challenge.server.model.js');

exports.createChallenge = function(req, res) {
    var points 			= req.body.points;
    var teamName 		= req.body.teamName;
    var challengeName 	= req.body.challengeName;
    var picture			= req.body.picture;

    Team.findOne({ teamName: teamName })
        .exec(function(err, team) {
            var challenge = new Challenge({
                challengeName:  challengeName,
                team:           team._id,
                points: 		points,
                picture:        picture
            });

            team.challenges.addToSet(challenge._id);

            challenge.save(function(err) {
                if (err) {
                    var errMsg = 'Sorry, there was an error creating your challenge ' + err;
                    console.log(errMsg);
                    res.sendStatus(500);
                } else {
                    team.save(function(err) {
                        if (err) {
                            var errMsg = 'Sorry, there was an error creating your challenge ' + err;
                            console.log(errMsg);
                            res.sendStatus(500);
                        } else {
                            console.log('Challenge created');
                            res.sendStatus(200);
                        }
                    });
                }
            });
        })
};

exports.completeChallenge = function(req, res) {
	var userName 		= req.body.userName;
	var challengeName 	= req.body.challengeName;

	User.findOne({ userName: userName })
		.exec(function(err, user) {
			Challenge.findOne({ challengeName: challengeName })
				.exec(function(err, challenge){
					user.completedChallenges.addToSet(challenge._id);
					user.points += challenge.points;
					challenge.usersCompleted.addToSet(user._id);

					challenge.save(function(err) {
                        if (err) {
                            var errMsg = 'Sorry, there was an error completing the challenge ' + err;
                            console.log(errMsg);
                            res.sendStatus(500);
                        } else {
                            user.save(function(err) {
                                if (err) {
                                    var errMsg = 'Sorry, there was an error completing the challenge ' + err;
                                    console.log(errMsg);
                                    res.sendStatus(500);
                                } else {
                                    console.log('Challenge completed!');
                                    res.sendStatus(200);
                                }
                            });
                        }
                    });

				});
		});
};

exports.listTeamChallenges = function(req, res) {
	var teamName = req.body.teamName;

	Team.findOne({ teamName: teamName })
		.populate( 'challenges' )
		.sort({ createdOn: 'desc' })
		.exec(function(err, team) {
			console.log(teamName+" challenges "+JSON.stringify(team.challenges));
			res.send({ challenges: team.challenges });
		});
};

exports.listAllChallenges = function(req, res) {
    Challenge.find()
        .sort({ createdOn: 'desc'})
        .exec(function(err, challenges){
           console.log("challenges "+JSON.stringify(challenges));
           res.send({ challenges: challenges });
        });
};

exports.getChallengeInfo = function(req, res) {
	var challengeName = req.body.challengeName;

	Challenge.findOne({ challengeName: challengeName })
		.populate( 'team usersCompleted' )
		.exec(function(err, challenge) {
			console.log("challenge "+JSON.stringify(challenge));
			console.log("points challenge is worth "+JSON.stringify(challenge.points));
			console.log("team associated with challenge "+JSON.stringify(challenge.team));
			console.log("users who completed challenge "+JSON.stringify(challenge.usersCompleted));
			res.send({ challenge: challenge });
		});
};

exports.listUsersCompleted = function(req, res) {
	var challengeName = req.body.challengeName;

	Challenge.findOne({ challengeName: challengeName })
		.populate( 'usersCompleted' )
		.sort({ createdOn: 'desc' })
		.exec(function(err, challenge) {
			console.log("users who completed challenge "+JSON.stringify(challenge.usersCompleted));
            res.send({ usersCompleted: challenge.usersCompleted });
		});	
};

exports.removeChallenge = function(req, res) {
	
};
