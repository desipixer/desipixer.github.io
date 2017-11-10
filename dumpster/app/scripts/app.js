var app = angular.module('dpApp',['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function(stateProvider, urlProvider){
	urlProvider.otherwise('/home');

	stateProvider
		.state('home', {
			url : '/home',
			templateUrl : 'pages/wp.html',
			controller : 'dpWpCtrl'
		})
		.state('404', {
			url : '/404',
			templateUrl : 'pages/404.html'
		})
		.state('images', {
			url : '/images/:id',
			templateUrl : 'pages/images.html',
			controller : 'dpImageCtrl'
		})
		.state('wp', {
			url : '/wp',
			templateUrl : 'pages/wp.html',
			controller : 'dpWpCtrl'
		})
		.state('new', {
			url : '/new',
			templateUrl : 'pages/new.html',
			controller : 'dpNewCtrl'
		})
		
}]);