/* contains initialize method */
var app=angular.module('dpApp',['ui.router','ui.bootstrap.tabs']);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');
	$stateProvider
		.state('dp', {
			abstract : true,
			tempateUrl : 'partials/dp.html'
		})
		.state('home', {
            url: '/home',
            templateUrl: 'partials/home.html',
            controller : 'homeCtrl'
           
        })
		.state('post', {
			url : '/post',
			templateUrl : 'partials/post.html',
			controller : 'postCtrl'
			
		})
		.state('others',{
			url : '/others',
			templateUrl : 'partials/others.html',
			controller : 'othersCtrl'
			
		})
});

app.controller('dpCtrl', function($scope,$state){
	//$state.go('dp');
});