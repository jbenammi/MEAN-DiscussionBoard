var topic = mongoose.model('topics');
var user = mongoose.model('users');

module.exports = {
	getAll: function(request, response){
		topic.find({}, function(err, topic){
			if(err){
				response.json(err);
			}
			else{
				response.json(topic);
			}
		})
	},
	getOne: function(request, response){
		topic.findOne({_id: request.params.id}).deepPopulate(['_user', '_answers', '_votes', '_comments']).exec(function(err, topic){
			if(err){
				response.json(err);
			}
			else{
				response.json(topic);
			}
		})
	},
	create: function(request, response){
		var newTopic = new topic(request.body);
		newTopic.save(function(err){
			if(err){
				response.json(err);
			}
			else{
				user.findOne({_id: newTopic._user}, function(err, found){
					if(err){
						response.json(err);
					}
					else{
						found._topics.push({_id: newTopic._id});
						found.save(function(err){
							if(err){
								response.json(err);
							}
							else{
								response.json({success: true});
							}
						})
					}
				})
			}
		})
	}
}

