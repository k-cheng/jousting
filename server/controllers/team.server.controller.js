var User = require('../models/user.server.model.js');
var Team = require('../models/team.server.model.js');

exports.createTeam = function(req, res) {
    var teamName = req.body.teamName;
    var userName = req.body.userName;
    var picture  = req.body.picture;

    User.findOne({ userName: userName })
        .exec(function(err, user) {
            var team = new Team({
                teamName:   teamName,
                createdBy:  user._id,
                users:      [ user._id ],
                picture :   picture
            });

            user.teams.addToSet(team._id);

            team.save(function(err) {
                if (err) {
                    var errMsg = 'Sorry, there was an error creating your team ' + err;
                    //needs to render the index with createATeam view
                    //res.render('index', { message: errMsg });
                    console.log(errMsg);
                    res.end();
                } else {
                    user.save(function(err) {
                        if (err) {
                            var errMsg = 'Sorry, there was an error creating your team ' + err;
                            //needs to render the joinATeam view
                            //res.render('index', { message: errMsg });
                            console.log(errMsg);
                            res.end();
                        } else {
                            console.log('Team created!');
                            //needs to redirect to the home view
                            res.redirect(301, '/');
                        }
                    });
                }
            });
    });
};

exports.listAllTeams = function(req, res) {
    Team.find()
        .sort({ createdOn: 'desc'})
        .exec(function(err, teams){
            //needs to render to some view
            //res.render('index', { teams: teams });
            console.log("all teams "+JSON.stringify(teams));
            res.end();
        });
};

exports.getTeamInfo = function(req, res) {
    var teamName = req.body.teamName;

    Team.findOne({ teamName: teamName })
        .populate( 'users createdBy' )
        .sort({ createdOn: 'desc'})
        .exec(function(err, team) {
            //needs to render home view?
            //res.render('index', { users: team.users });
            console.log("team "+JSON.stringify(team));
            console.log("team leader "+JSON.stringify(team.createdBy));
            console.log("users "+JSON.stringify(team.users));
            res.end();
        });
};


exports.removeUser = function(req, res) {
    var teamName = req.body.teamName;
    var userName = req.body.userName;
    
    Team.findOne({ teamName: teamName })
        .exec(function(err, team) {
            User.findOne({ userName: userName })
                .exec(function(err, user) {
                    team.users.pull( user._id );
                    user.teams.pull( team._id );

                    user.save(function(err) {
                        if (err) {
                            var errMsg = 'Sorry, there was an error removing the user ' + err;
                            //needs to render the roster view
                            //res.render('index', { message: errMsg });
                            console.log(errMsg);
                            res.end();
                        } else {
                            team.save(function(err) {
                                if (err) {
                                    var errMsg = 'Sorry, there was an error removing the user ' + err;
                                    //needs to render the roster view
                                    //res.render('index', { message: errMsg });
                                    console.log(errMsg);
                                    res.end();
                                } else {
                                    console.log('User removed!');
                                    //needs to redirect to the home view
                                    res.redirect(301, '/');
                                }
                            });    
                        }
                    });
                });
        });
};

//not really necessary, functionality covered by getTeamInfo
exports.listUsers = function(req, res) {
    var teamName = req.body.teamName;

    Team.findOne({ teamName: teamName })
        .populate( 'users' )
        .sort({ createdOn: 'desc' })
        .exec(function(err, team) {
            //needs to render roster view
            // res.render('index', { users: team.users });
            console.log("team members "+JSON.stringify(team.users));
            res.end();
        });
};

//not really necessary, same as joinTeam in user.server.controller
exports.addUser = function(req, res) {
    var teamName = req.body.teamName;
    var userName = req.body.userName;

    User.findOne({ userName: userName })
        .exec(function(err, user){
            Team.findOne({ teamName: teamName })
                .exec(function(err, team){
                    team.users.addToSet(user._id);
                    user.teams.addToSet(team._id);

                    team.save(function(err) {
                        if (err) {
                            var errMsg = 'Sorry, there was an error adding user to team ' + err;
                            //needs to render the joinATeam view
                            //res.render('index', { message: errMsg });
                            console.log(errMsg);
                            res.end();
                        } else {
                            user.save(function(err) {
                                if (err) {
                                    var errMsg = 'Sorry, there was an error adding team to users teams ' + err;
                                    //needs to render the joinATeam view
                                    //res.render('index', { message: errMsg });
                                    console.log(errMsg);
                                    res.end();
                                } else {
                                    console.log('User added!');
                                    //needs to redirect to the home view
                                    res.redirect(301, '/');
                                }
                            });
                        }
                    });
                });
        });
};
