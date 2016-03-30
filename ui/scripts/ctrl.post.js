app.controller('postCtrl', [ '$scope','$http','$stateParams','dp.service.site', function($scope, $http, $stateParams, siteService) {
	$scope.title = "Post page";
	$scope.id = ($stateParams.id !== undefined) ? $stateParams.id : "default";
	var filtered = _.filter(siteService.blog.entryArr, function(obj) {
		return (obj.id == $scope.id);
	});

	$scope.imgArray = _.uniq(filtered[0].imgArray);
	$scope.imgObj = filtered.length > 0 ? filtered[0] : [];
}]);