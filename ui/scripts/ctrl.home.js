
app.controller('homeCtrl', ['$scope', 'dp.service.http', 'dp.service.site', 'dp.service.util', 'settings', function($scope, httpService, siteService, utilService, settings) {
	$scope.title = "Home page";
	$scope.blog = {};

	$scope.sitesList = siteService.defaultSiteList;

	$scope.selSiteChange = function(){
		if($scope.selSite.length > 0) {
			httpService.getBlogById($scope.selSite, settings.startIndex, settings.maxResults , null).then(function(data){
				var data = utilService.parseBlogFeed(data);
				$scope.blog = data;
				siteService.blog = $scope.blog;
			})
		}
	}

	$scope.searchCategory = function(){
		httpService.getBlogById($scope.selSite, settings.startIndex, settings.maxResults , $scope.vmCategory).then(function(data){
			var data = utilService.parseBlogFeed(data);
			$scope.blog = data;
			siteService.blog = data;
		})
	}

	$scope.searchTextChanged = function() {
		if($scope.searchItems.length > 3){
			httpService.getBlogById($scope.selSite, settings.startIndex, settings.maxResults , $scope.searchItems).then(function(data){
				var data = utilService.parseBlogFeed(data);
				$scope.blog = data;
				siteService.blog = data;
			});
		}
	}

	// window.onscroll = function(ev) {
	// 	if($scope.searchItems != undefined){
	// 		if($scope.searchItems.length > 0)
	// 			return;
	// 	}
		
    //     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    //        settings.startIndex += settings.maxResults;
    //        httpService.getBlogById($scope.selSite, settings.startIndex , settings.maxResults , null).then(function(data){
	// 			var data = utilService.parseBlogFeed(data);
	// 			$scope.blog.entryArr = $scope.blog.entryArr.concat(data.entryArr);
	// 			siteService.blog = $scope.blog;
	// 		})
    //     }
    // };


	if(siteService.blog != null){
		$scope.blog = siteService.blog;
		$scope.selSite = siteService.blog.id;
	}

	if($scope.selSite == null && siteService.blog.id == null){
		$scope.selSite = siteService.defaultSiteList[0].blogId;
		$scope.selSiteChange();
		siteService.blog.id = $scope.selSite;
	}

}]);



