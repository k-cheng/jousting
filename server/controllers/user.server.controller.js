var User = require('../models/user.server.model.js');
var Team = require('../models/team.server.model.js');

exports.createUser = function(req, res) {
    var user = new User({
        fullName:   req.body.fullName,
        userName:   req.body.userName,
        password:   req.body.password,
        email:      req.body.email,
        picture:    req.body.picture
    });

    user.save(function(err, results) {
        if (err) {
            var errMsg = 'Sorry, there was an error creating your user profile ' + err;
            //needs to render the index with register view
            //res.render('index', { message: errMsg });
            console.log(errMsg);
            res.end();
        } else {
            // needs to redirect to the home view
            // res.redirect(301, '/');
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
           //res.render('index', { users: results });
           console.log("users "+JSON.stringify(users));
           res.end();
        });
};

exports.getUserInfo = function(req, res) {
    var userName = req.body.userName;

    User.findOne({ userName: userName })
        .populate( 'teams' )
        .sort({ createdOn: 'desc'})
        .exec(function(err, user) {
            //needs to render home view?
            //res.render('index', { teams: user.teams });
            console.log("user "+JSON.stringify(user));
            console.log("teams "+JSON.stringify(user.teams));
            res.end();
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
                                    console.log('Team joined!');
                                    //needs to redirect to the home view
                                    res.redirect(301, '/');
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
                            //needs to render the joinATeam view
                            //res.render('index', { message: errMsg });
                            console.log(errMsg);
                            res.end();
                        } else {
                            user.save(function(err) {
                                if (err) {
                                    var errMsg = 'Sorry, there was an error leaving the team ' + err;
                                    //needs to render the joinATeam view
                                    //res.render('index', { message: errMsg });
                                    console.log(errMsg);
                                    res.end();
                                } else {
                                    console.log('Team left!');
                                    //needs to redirect to the home view
                                    res.redirect(301, '/');
                                }
                            });    
                        }
                    });
                });
        });
};

//not really necessary, functionality covered by getUserInfo
exports.listTeams = function(req, res) {
    var userName = req.body.userName;

    User.findOne({ userName: userName })
        .populate( 'teams' )
        .sort({ createdOn: 'desc'})
        .exec(function(err, user) {
            //needs to render home view?
            //res.render('index', { teams: user.teams });
            console.log("teams "+user.teams);
            res.end();
        });
};
