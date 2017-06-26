var app = angular.module('myApp', ['ngRoute']);



app.config(function ($routeProvider) {
    $routeProvider
        .when('/content/:messageId', {
            controller: 'messageCtrl',
            templateUrl: 'Pages/post.html'
        })
        .otherwise({
            template: '<div> Not Found </div>'
        })
});

google.load("gdata", "2.x");



app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});