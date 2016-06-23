var users = require('../controllers/users.js');
var topics = require('../controllers/topics.js');
var answers = require('../controllers/answers.js');
var votes = require('../controllers/votes.js');
var comments = require('../controllers/comments.js');


module.exports = function(app){
	app.post('/users', function(request, response){
		users.login(request, response);
	});

	app.get('/topics', function(request, response){
		topics.getAll(request, response);
	});

	app.post('/topics', function(request, response){
		topics.create(request, response);
	});

	// app.delete('/topics/:id', function(request, response){
	// 	topics.delete(request, response);
	// });

	// app.get('/products', function(request, response){
	// 	products.index(request, response);
	// })

	// app.post('/products', function(request, response){
	// 	products.create(request, response);
	// });

	// app.delete('/products/:id', function(request, response){
	// 	products.delete(request, response);
	// });	

	// app.post('/products/:id/update', function(request, response){
	// 	console.log(request.body, request.params.id)
	// 	products.update(request, response);
	// })
}