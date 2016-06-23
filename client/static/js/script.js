var myApp = angular.module('myApp', ['ngRoute', 'ngMessages']);

myApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'static/partials/logreg.html'
		})
		.when('/dashboard', {
			templateUrl: 'static/partials/dashboard.html'
		})
		.when('/topic/:id', {
			templateUrl: 'static/partials/topic.html'
		})
		.when('/user/:id', {
			templateUrl: 'static/partials/user.html'
		})
		.otherwise({
			redirectTo: '/'
		})
})

myApp.factory('userFactory', function($http){
	var factory = {};
	var user_session = {};

	factory.chk_session = function(callback){
		callback(user_session);
	}

	factory.login = function(user, callback){
		$http.post('/users', user).success(function(data){
			if(data.success){
				user_session = data
				callback(user_session)
			}
		})
	}

	factory.logout = function(callback){
		user_session = {}
		callback(user_session);
	}
	return factory;
});

myApp.factory('topicFactory', function($http){
	var factory = {}

	factory.gettopics = function(callback){
		$http.get('/topics').success(function(results){
			if(results.err){
				console.log(results.err)
			}
			else{
				console.log(results);
				callback(results);
			}
		})
	}

	factory.create = function(topic, callback){
		$http.post('/topics', topic).success(function(results){
			if(!results.success){
				console.log(results)
			}
			else{
				callback();
			}
		})
	}

	return factory
});

myApp.controller('usersController', function(userFactory, $location){
	var self = this;
	self.user_session = {}
	self.chkuser = {};
	
	userFactory.chk_session(function(data){
		self.user_session = data;
		if(!self.user_session.success){
			$location.url('/');
		}
	});

	self.login = function(){
		userFactory.login(self.chkuser, function(data){
			self.user_session = data
			$location.url('/dashboard');
		});
	}

	self.logout = function(){
		userFactory.logout(function(data){
			self.user_session = data;
			$location.url('/');
		});
	}
});

myApp.controller('topicsController', function(userFactory, topicFactory, $location){
	var self = this;
	self.user_session = {};
	self.topics = [];
	self.newTopic = {};
	userFactory.chk_session(function(data){
		self.user_session = data;
		if(!self.user_session.success){
			$location.url('/');
		}
	})

	topicFactory.gettopics(function(data){
		self.topics = data;
	})

	self.create = function(){
		self.newTopic._user = self.user_session._id;
		self.newTopic._answers = [];
		topicFactory.create(self.newTopic, function(){
			topicFactory.gettopics(function(data){
				self.topics = data;
			})
		})
		console.log(self.topics)
		self.newTopic = {};		
	}
});