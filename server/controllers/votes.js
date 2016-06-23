var vote = mongoose.model('votes');

module.exports = {
	create: function(request, response){
		var newVote = new vote(request.body);
		newVote.save(function(err){
			if(err){
				response.json(err);
			}
			else{
				response.json({success: true});
			}
		})
	},
	voteup: function(request, response){
		vote.update({_id: request.params.id}, {$set: {voted: true, up: true, down: false}}, function(err){
			if(err){
				response.json(err)
			}
			else{
				response.json({})
			}
		})
	},
	votedown: function(request, response){
		vote.update({_id: request.params.id}, {$set: {voted: true, up: false, down: true}}, function(err){
			if(err){
				response.json(err)
			}
			else{
				response.json({})
			}
		})
	}
}

