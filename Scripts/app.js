var app = angular.module('myApp', ['ngRoute']);



app.config(function ($routeProvider) {
    $routeProvider.when('/content/:messageId', {
        controller: 'messageCtrl',
        templateUrl: 'Pages/post.html'
    }).
    otherwise({
        template: '<div> Not Found </div>'
    })
});

google.load("gdata", "2.x");