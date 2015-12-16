var User = require('../models/user.server.model.js');
var Team = require('../models/team.server.model.js');

exports.createUser = function(req, res) {
    var user = new User({
        fullName:   req.body.fullName,
        userName:   req.body.userName,
        password:   req.body.password,
        email:      req.body.email,
        points:     0,
        picture:    req.body.picture
    });

    user.save(function(err, results) {
        if (err) {
            var errMsg = 'Sorry, there was an error creating your user profile ' + err;
            console.log(errMsg);
            res.sendStatus(500);
        } else {
            req.login(results, function() {
                res.send(req.user);
            });
        }
    });
};

exports.listAllUsers = function(req, res) {
    User.find()
        .sort({ createdOn: 'desc'})
        .exec(function(err, users){
           console.log("users "+JSON.stringify(users));
           res.send({ users: users });
        });
};

exports.getUserInfo = function(req, res) {
    var userName = req.body.userName;

    User.findOne({ userName: userName })
        .populate( 'teams completedChallenges' )
        .sort({ createdOn: 'desc'})
        .exec(function(err, user) {
            console.log("user "+JSON.stringify(user));
            console.log("teams "+JSON.stringify(user.teams));
            console.log("completed challenges "+JSON.stringify(user.completedChallenges));
            res.send({ user: user });
        });
};

exports.joinTeam = function(req, res) {
    var userName = req.body.userName;
    var teamName = req.body.teamName;

    User.findOne({ userName: userName })
        .exec(function(err, user){
            Team.findOne({ teamName: teamName })
                .exec(function(err, team){
                    team.users.addToSet(user._id);
                    user.teams.addToSet(team._id);

                    team.save(function(err) {
                        if (err) {
                            var errMsg = 'Sorry, there was an error adding user to team ' + err;
                            console.log(errMsg);
                            res.sendStatus(500);
                        } else {
                            user.save(function(err) {
                                if (err) {
                                    var errMsg = 'Sorry, there was an error adding team to users teams ' + err;
                                    console.log(errMsg);
                                    res.sendStatus(500);
                                } else {
                                    console.log('Team joined!');
                                    res.sendStatus(200);
                                }
                            });
                        }
                    });
                });
        });
};

exports.leaveTeam = function(req, res) {
    var userName = req.body.userName;
    var teamName = req.body.teamName;

    User.findOne({ userName: userName })
        .exec(function(err, user) {
            Team.findOne({ teamName: teamName })
                .exec(function(err, team) {
                    user.teams.pull( team._id );
                    team.users.pull( user._id );

                    team.save(function(err) {
                        if (err) {
                            var errMsg = 'Sorry, there was an error leaving the team ' + err;
                            console.log(errMsg);
                            res.sendStatus(500);
                        } else {
                            user.save(function(err) {
                                if (err) {
                                    var errMsg = 'Sorry, there was an error leaving the team ' + err;
                                    console.log(errMsg);
                                    res.sendStatus(500);
                                } else {
                                    console.log('Team left!');
                                    res.sendStatus(200);
                                }
                            });    
                        }
                    });
                });
        });
};

exports.listCompletedChallenges = function(req, res) {
    var userName = req.body.userName;

    User.findOne({ userName: userName })
        .populate( 'completedChallenges' )
        .sort({ createdOn: 'desc'})
        .exec(function(err, user) {
            console.log('completed challenges'+user.completedChallenges);
            res.send({ completedChallenges: user.completedChallenges });
        })
};

//not really necessary, functionality covered by getUserInfo
exports.listTeams = function(req, res) {
    var userName = req.body.userName;

    User.findOne({ userName: userName })
        .populate( 'teams' )
        .sort({ createdOn: 'desc'})
        .exec(function(err, user) {
            console.log("teams "+user.teams);
            res.send({ teams: user.teams });
        });
};
