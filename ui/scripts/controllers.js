
app.controller('homeCtrl', ['$scope', 'dp.service.http', 'dp.service.site', 'dp.service.util', function($scope, httpService, siteService, utilService) {
	$scope.title = "Home page";
	$scope.blog = {};

	$scope.sitesList = siteService.defaultSiteList;



	$scope.selSiteChange = function(){
		if($scope.selSite.length > 0) {
			httpService.getSelectedBlog($scope.selSite).then(function(data){
			var entry = data.feed.entry;
			$scope.blog.thumbnails = _.filter(entry, function(obj) {
				if(obj.hasOwnProperty("media$thumbnail") != undefined){
					obj["media$thumbnail"].url = obj["media$thumbnail"].url.replace('s72-c','s320');
					obj.imgArray = utilService.parseImageFromHTML(obj.content.$t);
					obj.thumb = (obj.imgArray.length > 0) ? obj.imgArray[0].replace('s1600','s320') : null;
					obj.url = ( obj.link.length > 0 ) ? obj.link[obj.link.length - 1].href : '#';
					var id = obj.id.$t.match(/\d+/g);
					obj.id = id[1].concat(id[2]);
					return true;
				}
			})
			siteService.activeSite.blog = $scope.blog.thumbnails;
			})
		}
	}

	if($scope.selSite == null){
		$scope.selSite = siteService.defaultSiteList[0].blogId;
		$scope.selSiteChange();
	}

}]);

app.controller('postMainCtrl', function($scope, $http) {
	$scope.title = "Post Main page";
});

app.controller('postCtrl', [ '$scope','$http','$stateParams','dp.service.site', function($scope, $http, $stateParams, siteService) {
	$scope.title = "Post page";
	$scope.id = ($stateParams.id !== undefined) ? $stateParams.id : "default";
	var filtered = _.filter(siteService.activeSite.blog, function(obj) {
		return (obj.id == $scope.id);
	});
	$scope.imgArray = _.uniq(filtered[0].imgArray);

}]);