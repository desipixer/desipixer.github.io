app.controller('postCtrl', [ '$scope','$http','$stateParams','dp.service.site', 'dp.service.post','dp.service.url', function($scope, $http, $stateParams, siteService, postService, urlService) {
	$scope.title = "Post page";
	$scope.id = ($stateParams.id !== undefined) ? $stateParams.id : "default";
	var filtered = _.filter(siteService.blog.entryArr, function(obj) {
		return (obj.id == $scope.id);
	});

	$scope.imgArray = _.uniq(filtered[0].imgArray) ;
	$scope.imgObj = filtered.length > 0 ? filtered[0] : [];

	$scope.publishPost = function(){
		if(filtered == undefined){
			return;
		}
		postService.login().then(function(data){
			postService.createPostRequest(filtered[0], data).then(function(data){
				$('#responseCode').show().css('color', 'green').text('POSTED').fadeOut(4000);
			}, function(err){
				console.log(err);
				$('#responseCode').show().css('color', 'red').text('ERROR').fadeOut(4000);
			});
		});
	}

	$scope.getToken = function(){
		$http.post(urlService.wordpress.createTokenUrl()).success(function(data){
			console.log(data);
		}).error(function(err){
			console.log(err);
		});
	}


	$scope.login = function() { 
		return postService.login();
	};

	$scope.loggedIn = ($scope.accessToken != null);

	$scope.accessToken = postService.accessToken ;
}]);