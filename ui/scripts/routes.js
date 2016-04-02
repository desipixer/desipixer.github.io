
/* configure the app routes here */
var app = angular.module('dpApp');

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');
	$stateProvider
		.state('home', {
            url: '/home',
            templateUrl: 'partials/home.html',
            controller : 'homeCtrl',
            controllerAs : 'vm'
        })
		.state('posts', {
			url : '/posts',
			templateUrl : 'partials/post.html',
			controller : 'postMainCtrl'
		})
		.state('postID', {	
			url : '/post/:id',
			templateUrl : 'partials/post.id.html',
			controller : 'postCtrl'
		})
		.state('main', {
			url : '/',
			controller : function($state){
				$state.go('home')
			}
		})
		.state('404', {
			url : '/404',
			templateUrl : 'partials/404.html'
		})
})