var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var challengeSchema = new Schema({
    challengeName: 	{	
    				type: 		String,
    				trim: 		true,
			    	required: 	'Please enter a challenge name',
                    index:      {
                                    unique: true
                                }
			    },
    team: 		{	
    				type: 		Schema.Types.ObjectId, 
    				ref: 		'Team'
    			},
    picture: 	{
    				type: 		String,
    				trim: 		true
    			},
    createdOn: 	{
    				type: 		Date,
    				default: 	Date.now
    			}
});

module.exports = mongoose.model( 'Challenge', challengeSchema );
