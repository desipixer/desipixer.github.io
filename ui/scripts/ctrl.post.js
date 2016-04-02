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
		/*$.ajax({
		    url: urlService.wordpress.createTokenUrl(),
		    type: "POST",
		    crossDomain: true,
		    dataType: "json",
		    success:function(result){
		        //alert(JSON.stringify(result));
		        console.log(result);
		    },
		    error:function(xhr,status,error){
		        alert(status);
		    }
		});*/

		var wpcom = WPCOM();
		wpcom
		.site('desipixer.wordpress.com')
		.postsList({
			number : 4,
		}, function(err,data){
			if(err)
				console.log(err);
			data.posts.forEach(function(value,index){
				console.log(value);
			})
		});
	}


	$scope.login = function() { 
		return postService.login();
	};

	$scope.loggedIn = ($scope.accessToken != null);

	$scope.accessToken = postService.accessToken ;
}]);