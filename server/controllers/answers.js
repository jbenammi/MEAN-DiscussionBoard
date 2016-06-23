var answer = mongoose.model('answers');

module.exports = {
	create: function(request, response){
		var newAnswer = new answer(request.body);
		newAnswer.save(function(err){
			if(err){
				response.json(err);
			}
			else{
				response.json({success: true});
			}
		})
	}
}

