
/* home controller */
app.controller('homeCtrl', function($scope,$http, URLManager, settings){
	$scope.title = "Home page";
	settings.blog = {
		id : '7833828309523986982'
	};
	settings.category = ['Samantha', 'Rakul Preet','Regina'];

	$http.jsonp(URLManager.getFeedURLByID(settings.blog.id)).success(function(data){
		$scope.data = _.filter(data.feed.entry, function(obj){
			if(new RegExp(settings.category.join("|")).test(obj.title.$t)){
				return obj;
			}
		});
		
	})

});

/* post controller */
app.controller('postCtrl', function($scope,$state){
	$scope.title = "Post page";

	$scope.viewModel = {};	
  $scope.viewModel.types = ['home','others','post'];

  $scope.typeState = function(state){
  	$state.go(state);
  }

});

/* others controller */
app.controller('othersCtrl', function($scope){
	$scope.title = "Others page";
});