/* contains initialize method */
var app=angular.module('myApp',['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');
	$stateProvider
		.state('home', {
            url: '/home',
            templateUrl: 'Partials/home.html',
            controller : 'postCtrl'
        })
		.state('post', {
			url : '/post',
			templateUrl : 'Partials/post.html'
		})
})