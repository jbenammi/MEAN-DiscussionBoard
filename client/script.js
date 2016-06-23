var myApp = angular.module('myApp', ['ngRoute', 'ngMessages']);

myApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			console.log('in routeProvider')
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
	var logged_in = false;
	var user_session = {};
	factory.login = function(user){
		$http.post('/users', user).success(function(data){
			if(data.success){
				logged_in = true;

			}
		})
	}
};
myApp.controller('usersController', function(userFactory){
	var self = this;
	self.user_session = {}
	self.logged_in = false;
	self.chkuser = {};
	
	self.login = function(){
		userFactory.login(self.chkuser, function(data){
			self.user_session = data
		});
	}
});