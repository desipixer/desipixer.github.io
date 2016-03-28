
app.controller('homeCtrl', ['$scope', 'dp.service.http', 'dp.service.site', 'dp.service.util', function($scope, httpService, siteService, utilService) {
	$scope.title = "Home page";
	$scope.blog = {};

	$scope.sitesList = siteService.defaultSiteList;
	$scope.current = siteService.current;

	if(siteService.current.blog != null){
		$scope.blog = siteService.current.blog;
	}

	$scope.selSiteChange = function(){
		if($scope.selSite.length > 0) {
			httpService.getSelectedBlog($scope.selSite).then(function(data){
				var data = utilService.parseBlogFeed(data);
				$scope.blog = data.entryArr;
				siteService.current.blog = $scope.blog;
				siteService.current.id = $scope.selSite;
			})
		}
	}

	if($scope.selSite == null && siteService.current.id == null){
		$scope.selSite = siteService.defaultSiteList[0].blogId;
		$scope.selSiteChange();
		siteService.current.id = $scope.selSite;
	}

}]);

app.controller('postMainCtrl', function($scope, $http) {
	$scope.title = "Post Main page";
});

app.controller('postCtrl', [ '$scope','$http','$stateParams','dp.service.site', function($scope, $http, $stateParams, siteService) {
	$scope.title = "Post page";
	$scope.id = ($stateParams.id !== undefined) ? $stateParams.id : "default";
	var filtered = _.filter(siteService.current.blog, function(obj) {
		return (obj.id == $scope.id);
	});

	$scope.imgArray = _.uniq(filtered[0].imgArray);
	$scope.imgObj = filtered.length > 0 ? filtered[0] : [];
}]);