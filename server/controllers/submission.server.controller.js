var User = require('../models/user.server.model.js');
var Team = require('../models/team.server.model.js');
var Challenge = require('../models/challenge.server.model.js');
var Submission = require('../models/submission.server.model.js');

var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

exports.listChallengeSubmissions = function(req, res) {
	challengeName = req.body.challengeName;

	var gfs = new Grid(mongoose.connection.db);

	Challenge.findOne({ challengeName: challengeName })
		.populate( 'submissions' )
		.sort({ createdOn: 'desc' })
		.exec(function(err, challenge) {

			gfs.files.find({ filename: challenge.submissions[0]['submission'] }).toArray(function (err,files){
				res.writeHead(200, { 'Content-Type': files[0].contentType })
				var readstream = gfs.createReadStream({
					filename: files[0].filename
				});
				readstream.on('data', function(data){
					res.write(data);
				});
				readstream.on('end', function(){
					res.end();
				});
			});

		});
};

exports.getSubmissionInfo = function(req, res) {
	challengeName = req.body.challengeName;
	userName = req.body.userName;

	var gfs = new Grid(mongoose.connection.db);

	Challenge.findOne({ challengeName: challengeName })
		.exec(function(err, challenge) {
			User.findOne({ userName: userName })
				.exec(function(err, user) {
					Submission.findOne({ challenge: challenge._id, user: user._id })
						.exec(function(err, submission) {

							gfs.files.find({ filename: submission['submission'] }).toArray(function (err,files){
								res.writeHead(200, { 'Content-Type': files[0].contentType })
								var readstream = gfs.createReadStream({
									filename: files[0].filename
								});
								readstream.on('data', function(data){
									res.write(data);
								});
								readstream.on('end', function(){
									res.end();
								});
							});							
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
