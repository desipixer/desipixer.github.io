/* controller.js */

app.controller('postCtrl', function($scope,$http,PostService,URLService,UtilManager){
	$scope.blog = {
		entry : [],
		default : {
			id : "7833828309523986982"
		}
	}
	var postObj = {
		entry : []
	}
	console.log("postCtrl loaded successfully");

	/* Get Complete Blog */
	$http.jsonp(URLService.getFeedURLByID($scope.blog.default.id)).success(function(data){
		/* data loaded successfully */
		data.feed.entry.forEach(function(value){
			var post = PostService.generatePost(value);
			postObj.entry.push(post);
		});
		$scope.blog.entry = UtilManager.getArrayByIndex(postObj.entry, 0, $scope.blog.entry.length + 50);
	});

	/* Search blog using SearchText */
	$scope.searchText = function(){
		postObj.entry = [];
		$scope.blog.entry = [];
		$http.jsonp(URLService.getSearchQueryURL($scope.blog.default.id), $scope.searchQuery).success(function(data){
			/* data loaded successfully */
			data.feed.entry.forEach(function(value){
				var post = PostService.generatePost(value);
				postObj.entry.push(post);
			});
			$scope.blog.entry = UtilManager.getArrayByIndex(postObj.entry, 0, $scope.blog.entry.length + 50);
		});
	}

	window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
           $scope.blog.entry = UtilManager.getArrayByIndex(postObj.entry, 0, $scope.blog.entry.length + 50);
            console.log("bottom");
            $scope.$apply();
        }
    };

})