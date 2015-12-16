var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var challengeSchema = new Schema({
    challengeName: {	
		type: String,
		trim: true,
    	required: 'Please enter a challenge name',
        index: {
            unique: true
        }
    },
    team: {	
		type: Schema.Types.ObjectId, 
		ref: 'Team'
	},
    points: {
        type: Number,
        min: 0,
        required: 'Please enter the number of points this challenge is worth'
    },
    usersCompleted: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    picture: {
		type: String,
		trim: true
	},
    createdOn: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model( 'Challenge', challengeSchema );
