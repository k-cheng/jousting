var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var submissionSchema = new Schema({
    submission: {
		type: String,
		trim: true
	},
	comment: {
		type: String,
		trim: true
	},
	user: {	
		type: Schema.Types.ObjectId,
		ref: 'User'
    },
	challenge: {	
		type: Schema.Types.ObjectId,
		ref: 'Challenge'
    },
    team: {	
		type: Schema.Types.ObjectId, 
		ref: 'Team'
	},
    createdOn: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model( 'Submission', submissionSchema );