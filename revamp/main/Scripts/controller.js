/* controller.js */

app.controller('postCtrl', function($scope,$http,PostService,URLService,UtilManager,SessionService,pinService){
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

	if(SessionService.postObj.entry.length == 0){
		/* Get Complete Blog */
		$http.jsonp(URLService.getFeedURLByID($scope.blog.default.id)).success(function(data){
			/* data loaded successfully */
			data.feed.entry.forEach(function(value){
				var post = PostService.generatePost(value);
				postObj.entry.push(post);
			});
			$scope.blog.entry = UtilManager.getArrayByIndex(postObj.entry, 0, $scope.blog.entry.length + 50);
			SessionService.postObj = postObj;

		});
	} else {
		postObj = SessionService.postObj;
		$scope.blog.entry = UtilManager.getArrayByIndex(postObj.entry, 0, $scope.blog.entry.length + 50);
	}

	

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

    $scope.pinLogin = function(){
    	console.log("Trying to login into Pinterest");
    	pinService.Pinterest.login(showStatus);
    }

    function showStatus(data){
    	console.log(data);
    }

})