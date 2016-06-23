var user = mongoose.model('users');

module.exports = {
	login: function(request, response){
		user.findOne({name: request.body.name}, function(err, result){
			if(err){
				response.json(err);
			}
			else if(!result){
				var user_info = request.body
				user_info._topics = [];
				user_info._answers = [];
				user_info._votes = [];
				user_info._comments = [];
				var newUser = new user(user_info)
				newUser.save(function(err){
					if (err) {
						response.json(err);
					}
					else{
						var logged_user = {};
						logged_user.name = newUser.name
						logged_user._id = newUser._id
						logged_user.success = true;
						console.log('made user', logged_user)
						response.json(logged_user)
					}
				})
			}
			else{
				console.log('logging in', result)
				var logged_user = {};
				logged_user.name = result.name;
				logged_user._id = result._id;
				logged_user.success = true;
				response.json(logged_user);
			}		
		})
	},
	create: function(request, response){
		var newUser = new user(request.body);
		newUser.save(function(err){
			console.log(newUser);
			if(err){
				response.json(err);
			}
			else{
				response.json({success: true});
			}
		})
	},

}