var comment = mongoose.model('comments');

module.exports = {
	create: function(request, response){
		var newComment = new comment(request.body);
		newComment.save(function(err){
			if(err){
				response.json(err);
			}
			else{
				response.json({success: true});
			}
		})
	}
}

