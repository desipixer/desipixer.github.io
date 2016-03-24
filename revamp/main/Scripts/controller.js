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

    $scope.pinImage = function(post){
    	console.log(post);
    	var data = {
    		image_url : post.imgArray[0],
    		note : post.title,
    		link : post.url,
    		board : "566046315604518961"
    	}
    	pinService.Pinterest.createPin(data,fndataPost);
    }

    function fndataPost(data){
    	console.log(data);
    }

    function showStatus(data){
    	console.log(data);
    }

});



app.controller('imgController', function($scope,$http,imageService,URLService, UtilManager, pinService){

	$scope.blog = {
		default : {
			id : "7833828309523986982"
		},
		imgArray : [],
		scroll : {
			disabled : false
		}
	};

	if(imageService.imgArray.length == 0){
		$http.jsonp(URLService.getFeedURLByID($scope.blog.default.id)).success(function(data){
			/* data loaded successfully */
			data.feed.entry.forEach(function(value){
				var imgArray = imageService.createImageArray(value);
				imageService.imgArray = imageService.imgArray.concat(imgArray);
			});
			$scope.blog.imgArray = UtilManager.getArrayByIndex(imageService.imgArray, 0, $scope.blog.imgArray.length + 50);
		});
	} else {
		$scope.blog.imgArray = UtilManager.getArrayByIndex(imageService.imgArray, 0, $scope.blog.imgArray.length + 50);
	}

	window.onscroll = function(ev) {
		if(!$scope.blog.scroll.disabled){
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			   $scope.blog.imgArray = UtilManager.getArrayByIndex(imageService.imgArray, 0, $scope.blog.imgArray.length + 50);
			    console.log("bottom");
			    $scope.$apply();
			}
		}
    };

    $scope.pinImage = function(entry){
    	var data = {
    		image_url : entry.src,
    		note : entry.title,
    		link : entry.url,
    		board : "566046315604518961"
    	}
    	pinService.Pinterest.createPin(data,function(){
    		console.log("Successfully posted : "+ entry.url.split('/').pop());
    	});
    }

    /* Search blog using SearchText */
	$scope.searchText = function(){
		$scope.blog.scroll.disabled = false;
		$scope.blog.imgArray = [];
		imageService.imgArray = [];
		$http.jsonp(URLService.getSearchQueryURL($scope.blog.default.id, $scope.searchTxt)).success(function(data){
			/* data loaded successfully */
			data.feed.entry.forEach(function(value){
				var imgArray = imageService.createImageArray(value);
				imageService.imgArray = imageService.imgArray.concat(imgArray);
			});
			$scope.blog.imgArray = UtilManager.getArrayByIndex(imageService.imgArray, 0, $scope.blog.imgArray.length + 50);
		});
	}

    

    $scope.pinLogin = function(){    	
    	pinService.Pinterest.login(function(data){
    		console.log("Logged In");
    		console.log(data);
    	});
    }

    $scope.filterArray = function(){
    	if($scope.filterTxt.length > 0) {
    		$scope.blog.imgArray = imageService.filterArray(imageService.imgArray,"title",$scope.filterTxt);
    		$scope.blog.scroll.disabled = true;
    	} else {
    		$scope.blog.imgArray = UtilManager.getArrayByIndex(imageService.imgArray, 0, $scope.blog.imgArray.length + 50);
    		$scope.blog.scroll.disabled = false;
    	}
    	
    }

    $scope.shuffle = function(){
    	UtilManager.shuffle($scope.blog.imgArray);
    }

})